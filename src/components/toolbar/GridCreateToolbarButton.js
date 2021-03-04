import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

GridCreateToolbarButton.propTypes = {

};

function GridCreateToolbarButton(props) {
    return (
        <Link to="/setting/shift/newShift">new</Link>
    );
}

export default GridCreateToolbarButton;