import React from 'react';


const CommonCheckBoxInput = ({ value, checked = false, label, handleChange }) => {

    const handleChangeState = (event) => {
        handleChange(value);
    };

    return (
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value={value} checked={checked} onChange={handleChangeState} />
            <label className="form-check-label">
                {label}
            </label>
        </div>
    );
}


export default CommonCheckBoxInput;