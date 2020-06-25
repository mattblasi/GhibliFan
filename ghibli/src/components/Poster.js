import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementMovieLoaded } from "../api/movie";
import noImage from '../assets/images/no_image.gif';

class Poster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            imageStatus: "loading",
            imageSource: this.props.image,
            cssClass: "hidden"
        }
    }

    handleImageLoaded() {
        this.setState({ imageStatus: "loaded", cssClass: "is-visible" });
        this.props.incrementMovieLoaded();
    }

    handleImageError() {
        this.setState({ imageStatus: "error", imageSource: noImage });
    }

    render() {
        return(
            <React.Fragment>
                <img
                    className={this.state.cssClass + " poster"}
                    src={this.state.imageSource}
                    alt={this.props.title}
                    onLoad={() => this.handleImageLoaded()}
                    onError={() => this.handleImageError()}
                />
            </React.Fragment>
        )
    }
}

export default connect(null, { incrementMovieLoaded })(Poster);