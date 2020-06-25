import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { getMovieList, getSiteImageConfig } from './api/ghibliapi';

// layout
import Footer from './components/Footer';

// views
import Homepage from './views/Homepage';
import Details from './views/Details';

// styles
import './assets/scss/styles.scss';

class App extends Component {

    componentDidMount() {
        this.props.getMovieList();  //get movie list when app loads
        this.props.getSiteImageConfig();
    }

    render() {
        return (
            <React.Fragment>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Homepage} />
                        <Route path="/movie/:name" component={Details} />
                    </Switch>
                </BrowserRouter>
                <Footer />
            </React.Fragment>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    getMovieList: () => dispatch(getMovieList()),
    getSiteImageConfig: () => dispatch(getSiteImageConfig())
})

export default connect(null,mapDispatchToProps)(App);
