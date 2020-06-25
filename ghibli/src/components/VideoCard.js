import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Poster from "./Poster";
import { updateTitleAndYear, clearMovieDetails } from '../api/ghibliapi';
import { resetMovieLoaded } from '../api/movie';
import { convertToSlug } from "../api/strings";

let tomatometer = {
    splat: "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/global/new-rotten.efc30acb29c.png",
    fresh: "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/global/new-fresh.587bf3a5e47.png",
    certified: "https://www.rottentomatoes.com/assets/pizza-pie/images/icons/global/new-cf.9b01b08d257.png"
}

class VideoCard extends Component {

    handleMovieClick = () => {
        const {
            movie,
            updateTitleAndYear,
            clearMovieDetails,
            resetMovieLoaded
        } = this.props;
        clearMovieDetails();
        updateTitleAndYear(movie.title, movie.release_date.substring(0,4));
        resetMovieLoaded();
    }

    render() {
        const {
            movie,
            feature,
            images,
            slug = "/movie/" + convertToSlug(movie.title)
        } = this.props;

        movie.image_path = images.base_url;

        const background = (feature && window.innerWidth > 768) ? movie.image_path + "original" + movie.backdrop_path : movie.image_path + "w500" + movie.poster_path;

        return (
            <div
            className={feature ? "card is-featured" : "card"}
            key={movie.id}
            >
                <Link
                to={slug}
                onClick={() => this.handleMovieClick()}
                key={movie.id}
                className='card__link'
                >
                    <div className="card__content">
                        <Poster image={background} title={movie.title} />
                        <CardOverlay movie={movie} feature={feature} />
                    </div>
                </Link>
            </div>
        )
    }
}

const CardOverlay = ({movie, feature}) => {
    let score_image = (movie.rt_score < 60) ? tomatometer.splat : tomatometer.fresh;
    return (
        <React.Fragment>
            <div className="card__overlay">
                {movie.original_title && <h2 className="card__jptitle">{movie.original_title}</h2>}

                <p className="card__title">{movie.title}</p>
                <p className="card__release">{movie.release_date.substring(0, 4)}</p>

                {movie.rt_score && (
                    <span className="card__score" style={{backgroundImage:"url(" + score_image + ")" }}>
                        {movie.rt_score}%
                    </span>
                )}
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = state => ({
    images: state.Config.images
})

export default connect(mapStateToProps, {
    updateTitleAndYear,
    clearMovieDetails,
    convertToSlug,
    resetMovieLoaded
})(VideoCard);
