import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const listOfBranches = [
  { id: 1, name: "APPHR Thủ Đức" },
  { id: 2, name: "APPHR Quận 1" },
  { id: 3, name: "APPHR Quận 2" },
  { id: 4, name: "APPHR Quận 3" },
  { id: 5, name: "APPHR Quận 4" },
  { id: 6, name: "APPHR Quận 5" },
  { id: 7, name: "APPHR Quận 6" },
  { id: 8, name: "APPHR Quận 7" },
  { id: 9, name: "APPHR Quận 8" },
  { id: 10, name: "APPHR Quận 9" },
  { id: 11, name: "APPHR Quận 10" },
];

function getStyles(id, branches, theme) {
  if (branches)
    return {
      fontWeight:
        branches.indexOf(id) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}

export default function CommonMultiSelectInput({ branches, onChangeBranch }) {
  branches = branches || [];
  const classes = useStyles();
  const theme = useTheme();
  //const [branches, setBranches] = React.useState([]);
  const hash = listOfBranches.reduce((acc, val) => {
    acc[val.id] = val;
    return acc;
  }, {});
  const handleChange = (event) => {
    console.log(event.target);
    onChangeBranch(event.target.value);
  };

  // const handleChangeMultiple = (event) => {
  //     const { options } = event.target;
  //     const value = [];
  //     for (let i = 0, l = options.length; i < l; i += 1) {
  //         if (options[i].selected) {
  //             value.push(options[i].value);
  //         }
  //     }
  //     setBranches(value);
  // };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={branches}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value, index) => {
                return (
                  <Chip
                    key={index}
                    label={hash[value].name}
                    className={classes.chip}
                  />
                );
              })}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {listOfBranches.map((branch) => (
            <MenuItem
              key={branch.id}
              value={branch.id}
              label={branch.name}
              style={getStyles(branch.id, branches, theme)}
            >
              {branch.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
