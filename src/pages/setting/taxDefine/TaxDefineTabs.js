import AppBar from '@material-ui/core/AppBar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ObligatoryTax from './ObligatoryTax';
import OtherFee from './OhterFee';
import PersonalTax from './PersonalTax';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && <div>{children}</div>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const a11yProps = (index) => {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
};

const useStyles = makeStyles((theme) => ({
  anchorOriginTopCenter: {
    [theme.breakpoints.down('md')]: {
      top: 0,
      justifyContent: 'center',
    },
  },
  root: {
    [theme.breakpoints.down('md')]: {
      borderRadius: 4,
      minWidth: 200,
    },
  },
}));

const TaxDefineTabs = ({ t, history, match }) => {
  const classes = useStyles();
  const theme = useTheme();
  // const basicInfoRef = createRef();
  const [tabName, setTabName] = useState(0);

  const handleChange = (event, newValue) => {
    setTabName(newValue);
  };

  return (
    <>
      <div className={classes.root} id="account-tabs">
        <AppBar position="static" color="default">
          <Tabs
            value={tabName}
            onChange={handleChange}
            indicatorColor="primary"
            className="noselect"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab className="noselect" label={t('label.required_insurance')} {...a11yProps(0)} />
            <Tab className="noselect" label={t('label.personal_tax')} {...a11yProps(1)} />
            <Tab className="noselect" label={t('label.other_fee')} {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={tabName} index={0} dir={theme.direction}>
          <ObligatoryTax t={t} />
        </TabPanel>
        <TabPanel value={tabName} index={1}>
          <PersonalTax t={t} />
        </TabPanel>
        <TabPanel value={tabName} index={2}>
          <OtherFee t={t} match={match} />
        </TabPanel>
      </div>
      {/* <div
        className={joinClassName(['bg-white d-flex flex-column justify-content-center', 'px-4'])}
        style={{ position: 'fixed', right: 0, bottom: 0, width: `${snackBarWidth}px`, height: 50, borderTop: '0.5px solid #d8dbe0' }}
      >
        {renderButtons(buttons)}
      </div> */}
    </>
  );
};
export default TaxDefineTabs;
