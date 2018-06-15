import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReservation } from '../../../redux/reservations-reducer';

class ReservationModal extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                name: "",
                type: "hotel",
                dateIn: "",
                dateOut: "",
                timeIn: "",
                timeOut: "",
                confirmationNumber: "",
                howEarly: "",
                seatNumber: "",
                phone: "",
                address: ""
            }
        }
        this.state = this.initialState;
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
    closeModal = (e) => {
        this.props.toggleResModal();
    }
    submitReservation = (e) => {
        e.preventDefault();
        if (this.state.inputs.name && this.state.inputs.confirmationNumber) {
            this.props.addReservation(this.state.inputs, this.props.destinations.currentDestination._id);
            this.props.toggleResModal();
        }
    }

    render() {
        let { name, type, dateIn, dateOut, confirmationNumber, phone } = this.state.inputs;
        return (
            <div id="resModal" className='resModal'>
                <div className='genForm resModalInner'>

                    <button onClick={this.closeModal} className='closeButton'>&times;</button>

                    <h4>+ Reservation</h4>

                    <label htmlFor="type">Type</label>
                    <select onChange={this.handleChange} name="type" value={type}>
                        <option value="hotel">Hotel</option>
                        <option value="transportation">Transportation</option>
                        <option value="rental">Rental</option>
                        <option value="tour">Tour</option>
                        <option value="museum">Museum</option>
                    </select>

                    <label htmlFor="name">Name:</label>
                    <input onChange={this.handleChange} name="name" value={name} type="text" placeholder="Name" />

                    {type === "hotel" && <label htmlFor="dateIn">Date In:</label>}
                    {type === "transportation" && <label htmlFor="dateIn">Depart:</label>}
                    {(type === "rental" || type === "tour" || type === "museum") && <label htmlFor="dateIn">Start:</label>}
                    <input onChange={this.handleChange} name="dateIn" value={dateIn} type="date" />

                    {type === "hotel" && <label htmlFor="dateOut">Date Out:</label>}
                    {type === "transportation" && <label htmlFor="dateOut">Arrive:</label>}
                    {(type === "rental" || type === "tour" || type === "museum") && <label htmlFor="dateOut">End:</label>}
                    <input onChange={this.handleChange} name="dateOut" value={dateOut} type="date" />

                    <label htmlFor="confirmationNumber">Confirmation Number:</label>
                    <input onChange={this.handleChange} name="confirmationNumber" value={confirmationNumber} type="text" placeholder="Confirmation Number" />

                    <label htmlFor="phone">Phone:</label>
                    <input onChange={this.handleChange} name="phone" value={phone} type="text" placeholder="Phone" />

                    <button className='saveButton' onClick={this.submitReservation}>Add</button>
                </div>
            </div>
        )
    }
}

export default connect(state => state, { addReservation })(ReservationModal);