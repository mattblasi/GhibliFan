const express = require('express');
const router = express.Router();
const axios = require("axios");

// Studio Ghibili fan API info at http://ghibliapi.herokuapp.com/
const STUDIOGHIBLI_API_URL = "http://ghibliapi.herokuapp.com/";

// The Movie Database API info at https://api.themoviedb.org/3/getting-started/introduction
const TMDB_API_VER = 3;
const TMDB_API_URL = "https://api.themoviedb.org/" + TMDB_API_VER + "/";
const TMDB_API_KEY = "467297e33bea551770037bb71ff0e00a";
const TMDB_API_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NjcyOTdlMzNiZWE1NTE3NzAwMzdiYjcxZmYwZTAwYSIsInN1YiI6IjVjZDZlZWM0OTI1MTQxMDZmNmNlYzI1YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8N3EzEwI5ZTatPXwK-Ey1nq2ex-2f3fpgrpOxdkSpto";

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

router.get("/images", (req, res, next) => {
    axios.get( TMDB_API_URL + "configuration?api_key=" + TMDB_API_KEY )
    .then((response) => {
        res.send(response.data.images);
    });
});

module.exports = router;
