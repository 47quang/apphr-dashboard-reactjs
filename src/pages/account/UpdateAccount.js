import React from 'react';
import AccountTabs from './AccountTabs';

//TODO: translate

const UpdateAccount = ({ t, location, history, match }) => {
  return <AccountTabs match={match} history={history} t={t} />;
};

export default UpdateAccount;
