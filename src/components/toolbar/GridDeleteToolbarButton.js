import React, { useState } from "react";
import PropTypes from "prop-types";
import { DeleteOutlineOutlined } from "@material-ui/icons";
import { COLORS } from "../../constants/theme";

//TODO: translate
const GridDeleteToolbarButton = ({ rowsSelected, onDelete }) => {
  const handleDelete = (rows) => {
    if (!onDelete) return;
    onDelete(rows);
  };
  return (
    <div>
      <button
        type="button"
        className="btn"
        disabled={rowsSelected.length < 1}
        style={{
          color: COLORS.BUTTON_COLOR,
          fontSize: 13,
          justifyContent: "center",
        }}
        onClick={() => handleDelete(rowsSelected)}
      >
        <DeleteOutlineOutlined style={{ fontSize: 18 }} className="mr-1" />
        DELETE
      </button>
    </div>
  );
};
GridDeleteToolbarButton.propTypes = {
  rowsSelected: PropTypes.array,
  onDelete: PropTypes.func,
};
GridDeleteToolbarButton.defaultProps = {
  rowsSelected: [],
  onDelete: null,
};
export default GridDeleteToolbarButton;
