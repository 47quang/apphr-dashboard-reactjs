import { CCardGroup } from '@coreui/react';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GroupBarChart from 'src/components/charts/GroupBarChart';
import { fetchPersonChart } from 'src/stores/actions/assignment';

//TODO
const Statistic = ({ t, location, profileId }) => {
  const dispatch = useDispatch();

  const chart = useSelector((state) => state.assignment.personChart);
  let initValues = {
    from: moment().startOf('month').format('YYYY-MM-DD'),
    to: moment().endOf('month').format('YYYY-MM-DD'),
    profileId: +profileId,
  };
  const title = t('title.person_chart');
  useEffect(() => {
    dispatch(fetchPersonChart(initValues, t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleRangeTime = (values) => {
    dispatch(fetchPersonChart(values, t));
  };
  return (
    <div className="d-flex justify-content-center">
      <CCardGroup className="m-4 p-4 col-9">
        <GroupBarChart t={t} title={title} chart={chart} initValues={initValues} handleFunction={handleRangeTime} />
      </CCardGroup>
    </div>
  );
};

export default Statistic;
