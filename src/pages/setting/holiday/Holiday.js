import { Tab, Tabs, withStyles } from "@material-ui/core";
import React, { useState } from "react";
import { TheHeader } from "src/layouts";
import { COLORS } from "../../../constants/theme";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: `${COLORS.TAB_INDICATOR}`,
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    "&:hover": {
      color: `${COLORS.TAB_HOVER}`,
      opacity: 1,
    },
    "&$selected": {
      color: `${COLORS.TAB_INDICATOR}`,
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: `${COLORS.TAB_INDICATOR}`,
      border: "none",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const HolidayPage = ({ t, location }) => {
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <TheHeader />
      <div className="mt-2 bg-white px-3">
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Ngày nghỉ lễ" />
          <AntTab label="Thiết lập số ngày nghỉ" />
        </AntTabs>
      </div>
    </>
  );
};

export default HolidayPage;
