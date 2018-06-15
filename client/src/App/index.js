import React, { Component } from "react";

// REACT ROUTER ELEMENTS
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// STATIC
import TopNav from "./TopNav";
import Footer from "./Footer";

// ROUTES
import Login from "./pages/Login";
import Home from './pages/Home';
import TripDisplay from './pages/TripDisplay';
import NewTrip from './pages/NewTrip';
import About from './pages/About';
import ProtectedRoute from "./ProtectedRoute";

import { verify } from '../redux/auth-reducer';

class App extends Component {

    componentDidMount() {
        this.props.verify();
    }

    render() {
        const { isAuthenticated, loading } = this.props;
        return (
            <div className='app'>
                <TopNav />
                {loading ?
                    <h1>...Loading user data... </h1>
                    :
                    <Switch>
                        <Route exact path="/" render={props => isAuthenticated ?
                            <Redirect to="/home" /> :
                            <Login {...props} />
                        } />
                        <Route path="/signup" render={props => isAuthenticated ?
                            <Redirect to="/home" /> :
                            <Login isSignup {...props} />
                        } />

                        <Route path='/about' component={About} />

                        <ProtectedRoute path='/home' component={Home} />
                        <ProtectedRoute path='/trip/:id' component={TripDisplay} />
                        <ProtectedRoute path='/new-trip' component={NewTrip} />
                    </Switch>
                }
                <Footer />
            </div>
        )
    }
}

export default withRouter(connect(state => state.users, { verify })(App));  