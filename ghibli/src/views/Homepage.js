import React, { Component } from "react";
import { connect } from "react-redux";
import Hero from "../components/Hero";
import VideoCard from "../components/VideoCard";
import { resetMovieLoaded, movieLoading, movieLoaded } from "../api/movie";
import { getMovieList, getMovieDetails, getSiteImageConfig } from '../api/ghibliapi';

class Homepage extends Component {
    constructor(props) {
        super(props);
        this.features = [];
        this.movies = [];
        this.state = {
            movies: this.props.movies,
            features: this.props.features,
        }
    }

    componentWillMount() {
        this.props.resetMovieLoaded();
        this.props.movieLoading();
    }

    componentDidMount() {
        this.props.getMovieList();
        this.props.getSiteImageConfig();

        if(!this.features.length) this.features = this.featureMovies(this.props.movies);
    }

    // removes features videos from movie list
    getMovieList = (movies, features) => {
        let movieList = [];

        movies.forEach((movie) => {
            if(!features.some((o) => Object.entries(movie).every(([k,v]) => o[k] === v) && Object.keys(movie).length === Object.keys(o).length))
                movieList.push(movie);
        })

        return movieList;
    }

    // randomly chooses 2 videos to feature
    featureMovies = (movies) => {
        let feature1, feature2;

        feature1 = feature2 = Math.floor(Math.random() * movies.length);

        while(feature1 === feature2) {
            feature2 = Math.floor(Math.random() * movies.length);
        }

        let features = [movies[feature1], movies[feature2]];

        this.movies = this.getMovieList(movies, features);

        return features;
    }

    render() {
        const {
            movies,
            isLoading,
            movieCount,
            loadedCount,
            movieLoaded
        } = this.props;

        if(!movies.length) return null;

        if(movieCount === loadedCount && isLoading) movieLoaded();

        return(
            <React.Fragment>
                <Hero />
                <div className={"movielist"}>
                    {this.features && this.features.map(feature => (
                        <div class="movielist__item">
                            <VideoCard key={feature.id} movie={feature} feature={true} />
                        </div>
                    ))}

                    {this.movies.map(movie => (
                        <div class="movielist__item">
                            <VideoCard key={movie.id} movie={movie} />
                        </div>
                    ))}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    movies: state.MovieList.movies,
    images: state.Config.images,
    movieCount: state.MovieList.movieCount,
    loadedCount: state.MovieList.movieLoaded,
    isLoading: state.MovieList.isMovieListLoading
})

const mapDispatchToProps = (dispatch) => ({
    getMovieList: () => dispatch(getMovieList()),
    getMovieDetails: (name, year) => dispatch(getMovieDetails(name, year)),
    getSiteImageConfig: () => dispatch(getSiteImageConfig()),
    resetMovieLoaded: () => dispatch(resetMovieLoaded()),
    movieLoading: () => dispatch(movieLoading()),
    movieLoaded: () => dispatch(movieLoaded())
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
