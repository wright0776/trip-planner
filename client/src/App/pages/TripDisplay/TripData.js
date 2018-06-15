import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTrips, getOneTrip, editTrip, deleteTrip } from '../../../redux/trips-reducer';
import { withRouter } from 'react-router-dom';
import { formatDateForInputs } from '../../shared/helper';
import moment from 'moment';

class TripData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                name: props.name || "",
                startDate: props.startDate || "",
                endDate: props.endDate || ""
            },
            form: false,
            noName: false,
            noStart: false,
            isDeleted: false,
        }
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.editTrip(this.state.inputs, this.props.trips.currentTrip._id)
        this.setState(prevState => ({ form: false }))
    }
    removeTrip = (e) => {
        this.setState(prevState => ({ isDeleted: true }));
        this.props.deleteTrip(this.props.trips.currentTrip._id);
    }
    showForm = (e) => {
        e.preventDefault();
        this.setState(prevState => ({ form: !this.state.form }))
    }

    render() {
        // if (this.state.isDeleted) return <Redirect to="/home" />
        console.log(this.props.startDate, this.props.endDate);
        const { form, inputs, noName, noStart } = this.state;
        let displayEndDate = formatDateForInputs(inputs.endDate);
        let displayStartDate = formatDateForInputs(inputs.startDate);
        if (!form)
            return (
                <div className='tripData'>
                    {/* /trip data/ */}
                    <h2 className='tripTitle'>{inputs.name}</h2>
                    <div className="tripDates">
                        {inputs.startDate && <div className='tripDate'>Start Date: <span>{moment(inputs.startDate).add(1, 'days').format('MMM DD, YYYY')}</span></div>}
                        {inputs.endDate && <div className='tripDate'>End Date: <span>{moment(inputs.endDate).add(1, 'days').format('MMM DD, YYYY')}</span></div>}
                    </div>
                    <div className='buttonsContainer'>
                        <button onClick={this.showForm} className='editButton'>Edit</button>
                        <button onClick={this.props.removeTrip} className='deleteButton' >Delete</button>
                    </div>
                </div>
            )
        return (
            <form className='genForm' >
                {/* /trip data edit form/ */}
                <h2>+ Edit Trip</h2>
                <button name='dest' className='closeButton' onClick={this.showForm}>&times;</button>
                {noName ? <p className='red'>Please enter a trip name</p> : null}
                {noStart ? <p className='red'>Please enter a start date</p> : null}
                <label>Trip Name</label>
                <input onChange={this.handleChange} name="name" value={inputs.name} placeholder="Tour of Italy" type="text" />
                <label>Start Date</label>
                <input onChange={this.handleChange} name="startDate" value={displayStartDate} type="date" />
                <label>End Date</label>
                <input onChange={this.handleChange} name="endDate" value={displayEndDate} type="date" />
                <button onClick={this.handleSubmit} className='submitButton'>Save</button>
            </form>
        )
    }
}

export default withRouter(connect(state => state, { getTrips, getOneTrip, editTrip, deleteTrip })(TripData));
