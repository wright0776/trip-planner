import React from 'react';

function TransportationData(props) {
    let {transportations} = props
    return (
        <div className='transportationData'>
            {transportations.map((trans, i) =>
                <div className='transportation' key={i}>
                    <h4>{trans.name}</h4>
                    {trans.departDate ?
                        <span className='transDates'>
                            <label className='transDepart startDate'>
                                Transportation Depart:
                                            <p>{trans.departDate}</p>
                            </label>
                            {trans.arriveDate ?
                                <label className='transArrive endDate'>
                                    Transportation Arrive:
                                                <p>{trans.arriveDate}</p>
                                </label> : null}
                        </span> : null}
                </div>
            )}
        </div>
    )
}

export default TransportationData;
