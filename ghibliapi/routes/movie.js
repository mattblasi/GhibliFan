/*
API calls to get movie lists and details
.../api/movie            returns list of all movies
.../api/movie/{ID}       returns details for specific movie if ID exists

Api calls to these endpoints will fire calls to additional third part APIs to
collect all of the data then join it together as a single object to return it
to the Ghibli app.
*/

const express = require('express');
const router = express.Router();
const axios = require("axios");

// Studio Ghibili fan API info at http://ghibliapi.herokuapp.com/
const STUDIOGHIBLI_API_URL = "http://ghibliapi.herokuapp.com/";

// The Movie Database API info at https://api.themoviedb.org/3/getting-started/introduction
const TMDB_API_VER = 3;
const TMDB_API_URL = "https://api.themoviedb.org/";
const TMDB_API_KEY = "467297e33bea551770037bb71ff0e00a";
const TMDB_API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjcyOTdlMzNiZWE1NTE3NzAwMzdiYjcxZmYwZTAwYSIsInN1YiI6IjVjZDZlZWM0OTI1MTQxMDZmNmNlYzI1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8N3EzEwI5ZTatPXwK-Ey1nq2ex-2f3fpgrpOxdkSpto";
const TMDB_LIST_ID = 112920;

// Trakt.tv API info at https://trakt.docs.apiary.io/
const TRAKT_API_VER = 2;
const TRAKT_API_URL = "https://api.trakt.tv/";
const TRAKT_API_KEY = "924bec9ecae8ff27964e8d3fbf5849c86ad292c0591ec5a7fd6f6e46c03e1513";
const TRAKT_API_SECRET = "3a2baf8e90c19d1618a9e0e04c6de9c3c29250ff4c51daf9254ec6fcb33cee08";
const traktAxios = axios.create({
    headers: {
        'trakt-api-version': TRAKT_API_VER,
        'trakt-api-key': TRAKT_API_KEY
    }
});

// list of movies from studio ghibli api and tmdb
router.get("/", (req, res, next) => {
    let sg_api = axios.get( STUDIOGHIBLI_API_URL + "films" );
    let tmdb_api_pg1 = axios.get( TMDB_API_URL + '4/list/' + TMDB_LIST_ID + '?page=1&api_key=' + TMDB_API_KEY );
    let tmdb_api_pg2 = axios.get( TMDB_API_URL + '4/list/' + TMDB_LIST_ID + '?page=2&api_key=' + TMDB_API_KEY );

    Promise.all([sg_api, tmdb_api_pg1, tmdb_api_pg2])
    .then((responses) => {
        let concatMovies = [];
        let movies = {};
        responses.map((response) => {
            let data = [];
            if(response.config.url.includes(STUDIOGHIBLI_API_URL)) data = response.data;
            if(response.config.url.includes(TMDB_API_URL)) data = response.data.results;
            data.forEach((item) => { concatMovies.push(item); });
        });
        concatMovies.forEach((movie) => {
            if (movie.title === "Arrietty") movie.title = "The Secret World of Arrietty";
            movies[movie.title] = {...movies[movie.title], ...movie};
        });
        res.send(Object.keys(movies).map(function (key) { return movies[key]; }));
    });
});

// builds movie details from trakt and the movie db apis and returns a single object
router.get("/detail/:name/:year", (req, res, next) => {
    let movieDetails = {};
    let name = (req.params.name.includes('Arrietty')) ? 'The Secret World of Arrietty' : req.params.name;
        name = convertSpaces(convertCharacter(name));
    let trakt = traktAxios.get( TRAKT_API_URL + 'movies/' + name + "-" + req.params.year + "?extended=full"); //trakt.tv details
    let trakt_credits = traktAxios.get( TRAKT_API_URL + "movies/" + name + "-" + req.params.year + "/people"); //trakt.tv cast and crew
    let tmdb = axios.get( TMDB_API_URL +  TMDB_API_VER + "/search/movie?api_key=" + TMDB_API_KEY + "&query=" + convertCharacter(req.params.name) + "&year=" + req.params.year); //themoviedb details

    Promise.all([trakt, trakt_credits, tmdb])
    .then((responses) => {
        let tmdbId = 0;
        responses.map((response) => {
            if(response.config.url.includes(TRAKT_API_URL)) movieDetails = {...movieDetails, ...response.data};
            if(response.config.url.includes(TMDB_API_URL)) tmdbId = response.data.results[0].id;
        });
        return axios.get( TMDB_API_URL + TMDB_API_VER + "/movie/" + tmdbId+ "?api_key=" + TMDB_API_KEY);
    })
    .then((response) => {
        movieDetails = {...movieDetails, ...response.data};

        let result = (({
                title,
                certification,
                year,
                tagline,
                overview,
                released,
                runtime,
                trailer,
                ids: {imdb, tmdb},
            }) => ({
                title,
                certification,
                year,
                tagline,
                overview,
                released,
                runtime,
                trailer,
                imdb,
                tmdb,
            }))(movieDetails);
        result.genres = movieDetails.genres.map((m) => {return m.name });
        result.cast = movieDetails.cast.map((m) => { return (({character, person}) => ({character, person}))(m) });

        //console.log(result);
        res.send(movieDetails);
        //res.send(result);
    });
});

// get movie cast and crew

// get movie by id
router.get("/:id", (req, res, next) => {
    axios.get( STUDIOGHIBLI_API_URL + "films/" + req.params.id )
    .then((response) => {
        let movieDetails = {...response.data, ...tmdbMovieDetails(response.data)};
        res.send(movieDetails);
    });
});

const tmdbMovieDetails = (movie) => {
    axios.get( TMDB_API_URL + TMDB_API_VER + "/search/movie?api_key=" + TMDB_API_KEY + "&query=" + movie.title + "&year=" + movie.release_date)
    .then((res) => {
        return res.results[0];
    });
}

const convertCharacter = (phrase) => {
    let returnString = phrase.toLowerCase();
    returnString = returnString.replace(/ä/g, 'a');
    returnString = returnString.replace(/ö/g, 'o');
    returnString = returnString.replace(/ç/g, 'c');
    returnString = returnString.replace(/ş/g, 's');
    returnString = returnString.replace(/ı/g, 'i');
    returnString = returnString.replace(/ğ/g, 'g');
    returnString = returnString.replace(/ü/g, 'u');
    return returnString;
}

const convertSpaces = (phrase) => {
    let returnString = phrase.toLowerCase();
    returnString = returnString.replace(/[\s-]+/g, " ");
    returnString = returnString.replace(/^\s+|\s+$/g,"");
    returnString = returnString.replace(/[\ \']/g, "-");
    return returnString;
}

module.exports = router;
