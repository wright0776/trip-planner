import React, { Component } from 'react';
import moment from 'moment';

//HELPERS
import Toggler from "../../shared/Toggler";

// FORMS
import DestinationForm from './DestinationForm';
// import TransportationForm from './TransportationForm';
// import AccommodationForm from './AccommodationForm';

// DATA DISPLAYS
// import TransportationsData from './TransportationsData';
// import AccommodationsData from './AccommodationsData';

// REDUX
import { connect } from 'react-redux';
import { deleteDestination, getDestinations, editDestination } from '../../../redux/destinations-reducer';

class DestinationsData extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            addingTransportation: false,
            addingReservation: false,
            editing: false
        }
        this.state = this.initialState;
    }

    componentDidMount(props) {
        this.props.getDestinations()
    }
    componentWillReceiveProps(nextProps) {
    }

    openForm = (e) => {
        console.log(e.target.name)
        switch (e.target.name) {
            case 'trans':
                this.setState(prevState => ({ addingTransportation: !prevState.addingTransportation }));
                break;
            case 'accom':
                this.setState(prevState => ({ addingAccommodation: !prevState.addingAccommodation }));
                break;
            case 'editing':
                this.setState(prevState => ({ editing: !prevState.editing }));
                break;
            default: break;
        }
    }
    addTransportation = (e, trans) => {
        e.preventDefault();
        this.setState(prevState => {
            return {
                ...prevState,
                transportations: [...prevState.transportations, trans],
                addingTransportation: false
            }
        })
        this.props.addTransportation(trans, this.props.destinations.currentDestination._id);
    }
    addReservation = (e, accom) => {
        e.preventDefault();
        this.setState(prevState => {
            return {
                ...prevState,
                accommodations: [...prevState.accommodations, accom],
                addingReservation: false
            }
        })
        this.props.addReservation(accom, this.props.destinations.currentDestination._id);
    }

    editDest = (dest, destID) => {
        this.props.editDestination(dest, destID);
        this.setState(prevState => ({ editing: false }));
    }

    render() {
        return (
            <div className='destinationsData'>
                {/* /destinations data/ */}
                {this.props.destinations.data &&
                    this.props.destinations.data.filter(dest => dest.tripID === this.props.tripID).map((dest, i) =>
                        <Toggler key={dest._id} render={({ isToggled, toggle }) => {
                            return (
                                <div className='destination' >
                                    <h4 className='destTitle'>{dest.name}</h4>
                                    <div className="tripDates">
                                        {/* {dest.startDate && <p>Start Date: {new Date(dest.startDate).toLocaleDateString()}</p>} */}
                                        {dest.startDate && <p>Start Date: {moment(dest.startDate).add(1, 'days').format('MMM DD, YYYY')}</p>}
                                        {/* {dest.endDate && <p>End Date: {new Date(dest.endDate).toLocaleDateString()}</p>} */}
                                        {dest.endDate && <p>End Date: {moment(dest.endDate).add(1, 'days').format('MMM DD, YYYY')}</p>}
                                    </div>
                                    <div className='climate'>
                                        {dest.climate && <p>Climate: {dest.climate}</p>}
                                    </div>
                                    <div className='buttonsContainer'>
                                        <button name='deleting' onClick={() => this.props.deleteDestination(dest._id)} className='deleteButton'>Delete</button>
                                        <button name='editing' onClick={toggle} className='editButton'>Edit</button>
                                    </div>
                                    {isToggled && <DestinationForm inputs={dest} submit={inputs => this.editDest(inputs, dest._id)} {...dest} formCode="editing" tripID={this.props.tripID} toggle={toggle} />}

                                    {/* TRANSPORTATIONS OF DESTINATION DATA */}

                                    {/* <TransportationsData /> */}

                                    {/* ADD TRANSPORTATION FORM/TOGGLE */}

                                    {/* {addingTransportation ?
                                <TransportationForm addTransportation={this.addTransportation} closeForm={this.openForm} /> :
                                <button className='addFormButton' name="trans" onClick={this.openForm}>+ Transportation</button>} */}

                                    {/* ACCOMMODATIONS OF DESTINATION DATA */}

                                    {/* <AccommodationsData /> */}

                                    {/* ADD ACCOMMODATION FORM/TOGGLE */}

                                    {/* {addingAccommodation ?
                                <AccommodationForm addAccommodation={this.addAccommodation} closeForm={this.openForm} /> :
                                <button className='addFormButton' name="accom" onClick={this.openForm}>+ Accommodation</button>} */}

                                </div>
                            )
                        }
                        } />
                    )
                }
            </div>
        )
    }
}



export default connect(state => state, { getDestinations, deleteDestination, editDestination })(DestinationsData);