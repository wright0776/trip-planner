import React, { Component } from 'react';
import ReservationModal from './ReservationModal';

class AccommodationForm extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                name: "",
                arriveDate: "",
                departDate: "",
                type: "hotel"
            },
            showResModal: false
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
    toggleResModal = (e) => {
        this.setState(prevState => ({ showResModal: !prevState.showResModal }))
    }

    render() {
        const { name, arriveDate, departDate } = this.state.inputs;
        return (
            <form onSubmit={(e) => this.props.addAccommodation(e, this.state.inputs)} className='genForm'>
                <button name='accom' className='closeButton' onClick={this.props.closeForm}>&times;</button>
                <h3>+ Accommodation</h3>
                <label htmlFor="name">Name</label>
                <input onChange={this.handleChange} name="name" value={name} placeholder="Train" type="text" />
                <label htmlFor="departDate">Arrive Date</label>
                <input onChange={this.handleChange} name="arriveDate" value={arriveDate} type="date" />
                <label htmlFor="arriveDate">Depart Date</label>
                <input onChange={this.handleChange} name="departDate" value={departDate} type="date" />
                {this.state.showResModal ?
                    <ReservationModal toggleResModal={this.toggleResModal} /> :
                    <div>
                        <label htmlFor="resQ">Reservation?</label>
                        <button onClick={this.toggleResModal} name="resQ" >Add Reservation</button>
                    </div>}
                <button className='saveButton'>Add</button>
            </form>
        )
    }
}

export default AccommodationForm;
