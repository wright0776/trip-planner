import React, { Component } from 'react'

class DestinationForm extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                name: props.inputs.name || "",
                startDate: props.inputs.startDate || "",
                endDate: props.inputs.endDate || "",
                climate: props.inputs.climate || "",
                transportation: [],
                reservations: [],
                tripID: this.props.tripID
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
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.submit(this.state.inputs);
        this.props.toggle();
    }

    render() {
        const { name, startDate, endDate, climate } = this.state.inputs;
        return (
            <form onSubmit={this.handleSubmit} className='genForm'>
                {/* /destination form/ */}
                <button type="button"name={this.props.formCode} className='closeButton' onClick={this.props.toggle}>&times;</button>
                <h3>+ Destination</h3>
                <label>Name</label>
                <input onChange={this.handleChange} name="name" value={name} placeholder="Rome" type="text" />
                <label>Arrival Date</label>
                <input onChange={this.handleChange} name="startDate" value={startDate} type="date" />
                <label>Departure Date</label>
                <input onChange={this.handleChange} name="endDate" value={endDate} type="date" />
                <label>Climate</label>
                <input onChange={this.handleChange} name="climate" value={climate} placeholder="warm to hot" type="text" />
                <button className='submitButton'>Add</button>
            </form>
        )
    }
}

export default DestinationForm
