import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router";

import { getTrips } from "../../redux/trips-reducer";
import TripsList from "./TripsList";

class Home extends Component {

    componentDidMount() {
        this.props.getTrips();
    }

    render() {
        const { data, loading, errMsg } = this.props.trips;
        return (
            <TripsList data={data} />
        )

        // if (loading) {
        //     return <p>Loading... please wait.</p>
        // } else if (errMsg) {
        //     return <p>{`home errMsg: ${errMsg}`}</p>
        // } else {
        //     if (data.length > 1) {
        //         return (
        //             <TripsList data={data} />
        //         )
        //     } else if (data.length === 1) {
        //         return (
        //             <Redirect to={`/trip/${data[0]._id}`} />
        //         )
        //     } else {
        //         return (
        //             <Redirect to="/new-trip" />
        //         )
        //     }
        // }
    }
}

export default withRouter(connect(state => state, { getTrips })(Home));
