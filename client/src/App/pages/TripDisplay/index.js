import React, { Component } from 'react';
import DestinationsData from './DestinationsData';
import TripData from './TripData';
import { Redirect, withRouter } from 'react-router-dom';

// SHARED
import Loading from '../../shared/Loading';
import ErrorHandler from '../../shared/ErrorHandler';
import Toggler from "../../shared/Toggler";

// FORMS
import DestinationForm from '../../pages/TripDisplay/DestinationForm';

// REDUX
import { connect } from 'react-redux';
import { getOneTrip, deleteTrip } from '../../../redux/trips-reducer';
import { addDestination } from '../../../redux/destinations-reducer';

class TripDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: false,
            destNoName: false,
            transNoName: false,
            accomNoName: false,
            resNoName: false,
            editingTrip: false,
            isDeleted: false
        }
    }

    componentDidMount() {
        this.props.getOneTrip(this.props.match.params.id);
    }

    removeTrip = (e) => {

        this.props.deleteTrip(this.props.match.params.id, this.props.history.push);
    }
    createDest = inputs => {
        this.props.addDestination(inputs);
        this.setState(prevState => ({ addingDestination: false }));
    }

    render() {
        const { errMsg, currentTrip, currentLoading } = this.props.trips;
        if (this.state.isDeleted) return <Redirect to="/home" />
        return (
            <div className='tripDisplay'>
                {/* /trip display/ */}
                <Loading loading={currentLoading} render={() => <div>...Loading</div>}>
                    <ErrorHandler err={errMsg} render={props => <div>Error {props.code}: {props.msg}</div>}>
                        <Toggler render={({toggle, isToggled}) => (
                            <div className='newTripData'>

                                <TripData {...currentTrip} removeTrip={this.removeTrip} />

                                <DestinationsData submit={inputs => this.createDest(inputs)} tripID={currentTrip._id} />

                                {isToggled ?
                                    <DestinationForm inputs={{}} submit={this.createDest} tripID={this.props.match.params.id} formCode="dest" toggle={toggle} /> :
                                    <button className='addFormButton' name="dest" onClick={toggle}>+ Destination</button>}

                            </div>
                        )} />
                    </ErrorHandler>
                </Loading>
            </div>
        )
    }
}

export default withRouter(connect(state => state, { getOneTrip, deleteTrip, addDestination })(TripDisplay));


