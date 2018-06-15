import React from 'react'

function DataList(props) {
    const { data, className } = props;
    return (
        <div className={className}>
            {data.map((item, index) => props.render({ index, key: item._id, ...item }))}
        </div>
    )
}

export default DataList
