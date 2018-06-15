import React, { Component } from 'react';

// SHARED
import Loading from '../shared/Loading';

// FORMS
import TripForm from "./TripDisplay/TripForm";

// REDUX
import { connect } from 'react-redux';
import { addTrip, getTrips, editTrip } from '../../redux/trips-reducer';
import { addDestination } from '../../redux/destinations-reducer';
import { Redirect, withRouter } from 'react-router-dom';

class NewTrip extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                name: "",
                startDate: "",
                endDate: "",
                destinations: []
            },
            trip: {},
            noName: false,
            noStart: false,
            initialSubmit: false,
        }
        this.state = this.initialState;
    }

    handleChange = (e) => {
        let { name, value, type, checked } = e.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: type === "checkbox" ? checked : value
                }
            }
        })
    }
    openForm = (e) => {
        switch (e.target.name) {
            case 'dest':
                this.setState(prevState => ({ addingDestination: !prevState.addingDestination }));
                break;
            default: break;
        }
    }
    createTrip = (e) => {
        e.preventDefault();
        const { name, startDate } = this.state.inputs;
        if (!name && !startDate) return this.setState({ noName: true, noStart: false });
        if (name && !startDate) return this.setState({ noName: false, noStart: true });
        if (!name && startDate) return this.setState({ noName: true, noStart: false });
        this.props.addTrip(this.state.inputs);
        this.setState({ initialSubmit: true });
    }

    render() {
        const { inputs,
            noName,
            noStart,
            initialSubmit } = this.state;
        if(!initialSubmit)
        return (
            <div className='newTrip'>
                <TripForm
                    createTrip={this.createTrip}
                    handleChange={this.handleChange}
                    inputs={inputs}
                    noName={noName}
                    noStart={noStart}
                />
            </div>
        )
        return (
            <Loading loading={this.props.trips.currentLoading} render={() => <div>...loading</div>}>
                <Redirect to={'/trip/' + this.props.trips.currentTrip._id} />
            </Loading>
        )
    }
}

export default withRouter(connect(state => state, { addTrip, getTrips, editTrip, addDestination })(NewTrip));