import React from 'react';

function TripForm(props) {
    const { name, startDate, endDate, backgroundImg } = props.inputs;
    return (
        <form onSubmit={props.createTrip} className='genForm' >
            <h2>+ New Trip</h2>
            {this && <button name='trip' className='closeButton' onClick={this.props.closeForm}>&times;</button>}
            {props.noName ? <p className='red'>Please enter a trip name</p> : null}
            {props.noStart ? <p className='red'>Please enter a start date</p> : null}
            <label>Trip Name</label>
            <input onChange={props.handleChange} name="name" value={name} placeholder="Tour of Italy" type="text" />
            <label className='startDate'>Start Date</label>
            <input onChange={props.handleChange} name="startDate" value={startDate} type="date" />
            <label className='endDate'>End Date</label>
            <input onChange={props.handleChange} name="endDate" value={endDate} type="date" />
            <label>Background Image (url)</label>
            <input onChange={props.handleChange} name="backgroundImg" value={backgroundImg} placeholder="https://unsplash.com/beautiful-photo" type="url"/>
            <button className='submitButton'>Submit</button>
        </form>
    )
}


export default TripForm
