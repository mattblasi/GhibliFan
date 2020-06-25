import React, { Component } from "react";
import { connect } from "react-redux";
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";
import { movieHeroLoading, movieHeroLoaded, incrementHeroItem, resetHeroItemCount } from "../api/movie";
import bg from "../assets/images/hero_bg.png";
import fg from "../assets/images/hero_fg.png";
import porco from "../assets/images/hero_porco.png";
import nausica from "../assets/images/hero_nausica.png";

class Hero extends Component {

    componentWillMount() {
        this.props.resetHeroItemCount();
        this.props.movieHeroLoading();
    }

    render() {
        const {
            isMovieHeroLoading,
            incrementHeroItem,
            heroItemsCount,
            heroItemsLoaded,
            movieHeroLoaded
        } = this.props;
        if(heroItemsCount === heroItemsLoaded && isMovieHeroLoading) movieHeroLoaded();
        let parallaxClass = (isMovieHeroLoading) ? 'is-loading' : '';
        return (
            <ParallaxProvider>
                <div className={"hero " + parallaxClass}>
                    <ParallaxBanner
                    className="hero__parallax"
                    layers={[
                        {
                            image: bg,
                            amount: 0.01,
                            expanded: true
                        },
                        {
                            image: porco,
                            amount: 0.4,
                            expanded: true
                        },
                        {
                            image: nausica,
                            amount: -0.1,
                            expanded: true
                        },
                        {
                            image: fg,
                            amount: 0.1,
                            expanded: true
                        }
                    ]}
                    style={{
                        height: '100%'
                    }}
                    >
                    </ParallaxBanner>
                </div>
                <div style={{ display: "none" }}>
                    <img src={bg} onLoad={() => incrementHeroItem()} alt="background" />
                    <img src={fg} onLoad={() => incrementHeroItem()} alt="totoro" />
                    <img src={porco} onLoad={() => incrementHeroItem()} alt="porco rosso" />
                </div>
            </ParallaxProvider>
        )
    }
}

const mapStateToProps = state => ({
    isMovieHeroLoading: state.MovieList.isMovieHeroLoading,
    heroItemsCount: state.MovieList.heroItemsCount,
    heroItemsLoaded: state.MovieList.heroItemsLoaded
})

export default connect(mapStateToProps, {
    movieHeroLoading,
    movieHeroLoaded,
    incrementHeroItem,
    resetHeroItemCount
})(Hero);
