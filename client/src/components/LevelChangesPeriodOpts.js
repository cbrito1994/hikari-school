import React from 'react'

function LevelChangesPeriodOpts({ periodValue, periodText }) {
    return (
        <option value={periodValue} >
            {periodText}
        </option>
    )
}

export default LevelChangesPeriodOpts
