import React from 'react';

function AccommodationsData(props) {
    let {accommodations} = props
    return (
        <div className='accommodationData'>
            {accommodations.map((accom, i) =>
                <div className='accommodation' key={i}>
                    <h4>{accom.name}</h4>
                    {accom.arriveDate ?
                        <span className='accomDates'>
                            <label className='accomStart startDate'>
                                Accommodation Arrive:
                                            <p>{accom.arriveDate}</p>
                            </label>
                            {accom.departDate ?
                                <label className='accomEnd endDate'>
                                    Accommodation Depart:
                                                <p>{accom.departDate}</p>
                                </label> : null}
                        </span> : null}
                </div>
            )}
        </div>
    )
}

export default AccommodationsData;
