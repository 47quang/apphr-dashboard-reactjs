import { CCardBody, CContainer } from '@coreui/react';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import PieChart from 'src/components/charts/PieChart';
import { fetchStatisticChart } from 'src/stores/actions/assignment';
import Count from './Count';
import LogTable from './LogTable';
import { Helmet } from 'react-helmet';
import RenewContract from './RenewContract';

const Dashboard = ({ t, location }) => {
  const initValues = {
    date: moment().format('YYYY-MM-DD'),
    shiftId: '',
  };

  const dispatch = useDispatch();

  const handleChangeShift = (values) => {
    dispatch(fetchStatisticChart(values));
  };
  return (
    <>
      <Helmet>
        <title>{'APPHR | ' + t('Dashboard')}</title>
      </Helmet>
      <CContainer fluid className="c-main p-4 m-auto">
        <Count t={t} />

        <div className="row">
          <CCardBody className="col-6 ">
            <PieChart initValues={initValues} handleFunction={handleChangeShift} />
            <RenewContract t={t} />
          </CCardBody>
          <CCardBody className="col-6 ">
            <LogTable t={t} />
          </CCardBody>
        </div>
      </CContainer>
    </>
  );
};

export default Dashboard;
