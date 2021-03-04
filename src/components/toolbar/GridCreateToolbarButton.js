import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  AddCircleOutlineOutlined,
  DeleteOutlineOutlined,
} from "@material-ui/icons";
import { COLORS } from "../../constants/theme";

GridCreateToolbarButton.propTypes = {};
//TODO: translate
function GridCreateToolbarButton(props) {
  return (
    <div>
      <Link to="/setting/shift/newShift">
        <button
          type="button"
          className="btn"
          style={{
            color: COLORS.BUTTON_COLOR,
            fontSize: 13,
            alignSelf: "center",
          }}
        >
          <AddCircleOutlineOutlined style={{ fontSize: 18 }} className="mr-1" />
          NEW
        </button>
      </Link>
      <button
        type="button"
        className="btn"
        style={{
          color: COLORS.BUTTON_COLOR,
          fontSize: 13,
          justifyContent:'center'
        }}
      >
        <DeleteOutlineOutlined style={{ fontSize: 18 }} className="mr-1" />
        DELETE
      </button>
    </div>
  );
}

export default GridCreateToolbarButton;
