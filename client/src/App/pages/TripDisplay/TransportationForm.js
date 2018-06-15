import React, { Component } from 'react';
import ReservationModal from './ReservationModal';

class TransportationForm extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                name: "",
                departDate: "",
                arriveDate: "",
                reservation: false
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
        const { name, departDate, arriveDate } = this.state.inputs;
        return (
            <form onSubmit={(e) => this.props.addTransportation(e, this.state.inputs)} className='genForm'>
                <button name='trans' className='closeButton' onClick={this.props.closeForm}>&times;</button>
                <h3>+ Transportation</h3>
                <label htmlFor="name">Name</label>
                <input onChange={this.handleChange} name="name" value={name} placeholder="Train" type="text" />
                <label htmlFor="departDate">Depart Date</label>
                <input onChange={this.handleChange} name="departDate" value={departDate} type="date" />
                <label htmlFor="arriveDate">Arrive Date</label>
                <input onChange={this.handleChange} name="arriveDate" value={arriveDate} type="date" />
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

export default TransportationForm
