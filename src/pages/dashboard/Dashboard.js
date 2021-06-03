import { CCardBody } from '@coreui/react';
import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import PieChart from 'src/components/charts/PieChart';
import { fetchStatisticChart } from 'src/stores/actions/assignment';
import Count from './Count';
import LogTable from './LogTable';

const Dashboard = ({ t, location }) => {
  const initValues = {
    date: moment().format('YYYY-MM-DD'),
    shiftId: '',
  };

  const dispatch = useDispatch();

  const handleChangeShift = (values) => {
    // console.log(values);
    dispatch(fetchStatisticChart(values));
  };
  return (
    <>
      <div className="m-4 p-4">
        <Count t={t} />
        <div className="row">
          <CCardBody className="col-6 ">
            <PieChart initValues={initValues} handleFunction={handleChangeShift} />
          </CCardBody>
          <CCardBody className="col-6 ">
            <LogTable t={t} />
          </CCardBody>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
