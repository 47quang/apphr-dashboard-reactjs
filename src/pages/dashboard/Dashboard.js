import { CCardBody, CContainer } from '@coreui/react';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import PieChart from 'src/components/charts/PieChart';
import { PERMISSION } from 'src/constants/key';
import { fetchStatisticChart } from 'src/stores/actions/assignment';
import Count from './Count';
import LogTable from './LogTable';
import RenewContract from './RenewContract';

const Dashboard = ({ t, location }) => {
  const permissionIds = JSON.parse(localStorage.getItem('permissionIds'));

  const dispatch = useDispatch();

  const handleChangeShift = (values) => {
    dispatch(fetchStatisticChart(values));
  };

  return (
    <>
      <Helmet>
        <title>{'APPHR | ' + t('Dashboard')}</title>
      </Helmet>
      <CContainer fluid className="c-main m-auto p-4" style={{ backgroundColor: '#f7f7f7' }}>
        <Count t={t} />
        <div className="row">
          {permissionIds.includes(PERMISSION.LIST_CONTRACT) ? (
            <CCardBody className="col-12 ">
              <RenewContract t={t} />
            </CCardBody>
          ) : (
            <div />
          )}
          <CCardBody className="col-6 ">
            <PieChart handleFunction={handleChangeShift} />
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
