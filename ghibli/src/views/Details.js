
import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovieDetails, clearMovieDetails } from "../api/ghibliapi";
import { convertToSlug } from '../api/strings';
import { getMovie } from '../api/movie';
import Poster from "../components/Poster";

class Details extends Component {

    constructor(props) {
        super(props);
        this.title = (this.props.match.params.name) ? this.props.match.params.name : '';
    }

    async componentWillMount() {
        const {
            match: {
                params: { name }
            },
            details: { title, release_date },
            getMovieDetails,
            clearMovieDetails,
            movies,
            movie = getMovie(name, movies)
        } = this.props;
        let movie_title = (title) ? title : name;
        let movie_year = (release_date) ? release_date.substring(0,4) : movie.release_date.substring(0,4);
        clearMovieDetails();
        getMovieDetails(movie_title, movie_year);
    }


    render() {
        const {
            details: {
                title,
                overview,
                cast,
                crew,
                poster_path,
                backdrop_path,
                trailer,
                genres
            },
            images
        } = this.props;

        if(!title) return null;

        let poster = images.base_url + images.poster_sizes[4] + poster_path;
        let backdrop = images.base_url + images.backdrop_sizes[3] + backdrop_path;

        let directors = [];
        if(crew.directing) directors = crew.directing;

        let genreList = genres.map(genre => {
            return genre.name;
        })
        return(
            <div className="details">
                <div className="details__hero" style={{backgroundImage: "url(" + backdrop + ")"}}></div>
                <div className="details__content">
                    {poster_path && <Poster image={poster} title={title} />}
                    <div className="details__header">
                        <h1>{title}</h1>
                        <p className="details__description">{overview}</p>
                    </div>
                    {cast.length && cast.map((item) => {
                        return (<p key={item.person.ids.trakt}>{item.person.name} :: {item.character}</p>)
                    })}
                    {directors.length && directors.map((item) => {
                        return (<p key={item.person.ids.trakt}>{item.person.name} :: {item.job}</p>)
                    })}

                    {genreList.length && (
                    <div className="details__genres">
                        <p>Genres:</p>
                        <ul className="linklist">
                        {genreList.map(genre => {
                            return (<li className="linklist__item">{genre}</li>)
                        })}
                        </ul>
                    </div>
                    )}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    details: state.MovieDetails.details,
    movies: state.MovieList.movies,
    images: state.Config.images
})

export default connect(mapStateToProps, {
    getMovie,
    convertToSlug,
    getMovieDetails,
    clearMovieDetails
})(Details);
