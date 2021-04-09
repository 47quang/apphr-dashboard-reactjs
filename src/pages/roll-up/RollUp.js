import { CContainer } from '@coreui/react';
import { Button } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import QTable from 'src/components/table/Table';
import { ROUTE_PATH } from 'src/constants/key';
import {} from 'src/stores/actions/rollUp';

const RollUp = ({ t, location }) => {
  const columnDefOfRollUp = [
    { name: 'code', title: t('label.employee_code'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'fullname', title: t('label.employee_full_name'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'sunday', title: ['Chủ nhật', '04/05'], align: 'left', width: '10%', wordWrapEnabled: true },
    { name: 'monday', title: ['Thứ hai', '05/05'], align: 'left', width: '10%', wordWrapEnabled: true },
    { name: 'tuesday', title: ['Thứ ba', '06/05'], align: 'left', width: '10%', wordWrapEnabled: true },
    { name: 'wednesday', title: ['Thứ tư', '07/05'], align: 'left', width: '10%', wordWrapEnabled: true },
    { name: 'thursday', title: ['Thứ năm', '08/05'], align: 'left', width: '10%', wordWrapEnabled: true },
    { name: 'friday', title: ['Thứ sáu', '09/05'], align: 'left', width: '10%', wordWrapEnabled: true },
    { name: 'saturday', title: ['Thứ bảy', '10/05'], align: 'left', width: '10%', wordWrapEnabled: true },
  ];
  const today = moment();
  const [fromDate, setFromDate] = useState(today.clone().startOf('week'));
  const [toDate, setToDate] = useState(today.clone().endOf('week'));

  // const dispatch = useDispatch();
  // const data = useSelector((state) => state.rollUp.week);
  let data = [
    {
      id: 1,
      code: 'NV001',
      fullname: 'Nguyễn Văn An',
      monday: '08:30 17:30',
      tuesday: '08:30 17:30',
      wednesday: '08:30 17:30',
      thursday: '08:30 17:30',
      friday: '08:30 17:30',
      saturday: '08:30 17:30',
      sunday: '08:30 17:30',
    },
    {
      id: 3,
      code: 'NV001',
      fullname: 'Nguyễn Văn An',
      monday: '08:30 17:30',
      tuesday: '08:30 17:30',
      wednesday: '08:30 17:30',
      thursday: '08:30 17:30',
      friday: '08:30 17:30',
      saturday: '08:30 17:30',
      sunday: '08:30 17:30',
    },
    {
      id: 5,
      code: 'NV001',
      fullname: 'Nguyễn Văn An',
      monday: '08:30 17:30',
      tuesday: '08:30 17:30',
      wednesday: '08:30 17:30',
      thursday: '08:30 17:30',
      friday: '08:30 17:30',
      saturday: '08:30 17:30',
      sunday: '08:30 17:30',
    },
    {
      id: 4,
      code: 'NV001',
      fullname: 'Nguyễn Văn An',
      monday: '08:30 17:30',
      tuesday: '08:30 17:30',
      wednesday: '08:30 17:30',
      thursday: '08:30 17:30',
      friday: '08:30 17:30',
      saturday: '08:30 17:30',
      sunday: '08:30 17:30',
    },
    {
      id: 7,
      code: 'NV001',
      fullname: 'Nguyễn Văn An',
      monday: '08:30 17:30',
      tuesday: '08:30 17:30',
      wednesday: '08:30 17:30',
      thursday: '08:30 17:30',
      friday: '08:30 17:30',
      saturday: '08:30 17:30',
      sunday: '08:30 17:30',
    },
    {
      id: 6,
      code: 'NV001',
      fullname: 'Nguyễn Văn An',
      monday: '08:30 17:30',
      tuesday: '08:30 17:30',
      wednesday: '08:30 17:30',
      thursday: '08:30 17:30',
      friday: '08:30 17:30',
      saturday: '08:30 17:30',
      sunday: '08:30 17:30',
    },
    {
      id: 9,
      code: 'NV001',
      fullname: 'Nguyễn Văn An',
      monday: '08:30 17:30',
      tuesday: '08:30 17:30',
      wednesday: '08:30 17:30',
      thursday: '08:30 17:30',
      friday: '08:30 17:30',
      saturday: '08:30 17:30',
      sunday: '08:30 17:30',
    },
    {
      id: 8,
      code: 'NV001',
      fullname: 'Nguyễn Văn An',
      monday: '08:30 17:30',
      tuesday: '08:30 17:30',
      wednesday: '08:30 17:30',
      thursday: '08:30 17:30',
      friday: '08:30 17:30',
      saturday: '08:30 17:30',
      sunday: '08:30 17:30',
    },
  ];

  const handlePrev = () => {
    let from = fromDate.clone().subtract(7, 'd');
    let to = toDate.clone().subtract(7, 'd');
    setFromDate(from);
    setToDate(to);
  };
  const handleNext = () => {
    let from = fromDate.clone().add(7, 'd');
    let to = toDate.clone().add(7, 'd');
    setFromDate(from);
    setToDate(to);
  };
  useEffect(() => {
    // dispatch(fetchProfiles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="pb-2 d-flex justify-content-center">
        <Button onClick={handlePrev}>
          <NavigateBeforeIcon className="m-3" fontSize="large" />
        </Button>
        <div className="d-inline">
          <h2 className="d-flex justify-content-center">Bảng điểm danh</h2>
          <h5 className="d-flex justify-content-center">
            {t('label.from') + ': ' + fromDate.format('DD/MM/YYYY') + t('label.to') + ': ' + toDate.format('DD/MM/YYYY')}
          </h5>
        </div>
        <Button onClick={handleNext} disabled={today <= toDate}>
          <NavigateNextIcon className="m-3" fontSize="large" />
        </Button>
      </div>
      <QTable
        t={t}
        columnDef={columnDefOfRollUp}
        data={data}
        route={ROUTE_PATH.ROLL_UP + '/'}
        idxColumnsFilter={[0, 1]}
        disableEditColum={true}
        headerDateCols={[2, 3, 4, 5, 6, 7, 8]}
      />
    </CContainer>
  );
};

export default RollUp;
