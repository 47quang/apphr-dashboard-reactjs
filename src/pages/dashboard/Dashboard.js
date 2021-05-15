import CIcon from '@coreui/icons-react';
import { CCard, CCardBody, CCol, CRow, CWidgetDropdown } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MainChartExample from 'src/components/charts/MainChartExample';
import AccountIcon from 'src/components/icon/Account';
import BranchesIcon from 'src/components/icon/Branches';
import DepartmentIcon from 'src/components/icon/Department';
import QTable from 'src/components/table/Table';
import { PAGE_SIZES } from 'src/constants/key';
import { countActiveContracts } from 'src/stores/actions/contract';
import { countBranches, countDepartments, countLeaveRequests, countOvertimeRequests, countRemoteRequests } from 'src/stores/actions/dashboard';
import { fetchLogs } from 'src/stores/actions/log';

const Dashboard = ({ t, location }) => {
  const totalEmployee = useSelector((state) => state.contract.total);
  const totalBranch = useSelector((state) => state.dashboard.totalBranch);
  const totalDepartment = useSelector((state) => state.dashboard.totalDepartment);
  const totalLeave = useSelector((state) => state.dashboard.totalLeave);
  const totalRemote = useSelector((state) => state.dashboard.totalRemote);
  const totalOvertime = useSelector((state) => state.dashboard.totalOvertime);
  const logData = useSelector((state) => state.log.data);
  const [paging, setPaging] = useState({
    currentPage: 0,
    pageSize: PAGE_SIZES.LEVEL_1,
    total: 0,
    pageSizes: [PAGE_SIZES.LEVEL_1, PAGE_SIZES.LEVEL_2, PAGE_SIZES.LEVEL_3],
    loading: false,
  });
  const onCurrentPageChange = (pageNumber) => {
    setPaging((prevState) => ({
      ...prevState,
      currentPage: pageNumber,
    }));
  };
  const onPageSizeChange = (newPageSize) =>
    setPaging((prevState) => ({
      ...prevState,
      pageSize: newPageSize,
    }));
  const onTotalChange = (total) =>
    setPaging((prevState) => ({
      ...prevState,
      total: total,
    }));
  const setLoading = (isLoading) => {
    setPaging((prevState) => ({
      ...prevState,
      loading: isLoading,
    }));
  };
  const columnDef = [
    { name: 'user', title: t('label.log_user'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'message', title: t('label.log_message'), align: 'left', width: '60%', wordWrapEnabled: true },
    { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '20%', wordWrapEnabled: true },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(countActiveContracts());
    dispatch(countBranches());
    dispatch(countDepartments());
    dispatch(
      countLeaveRequests({
        status: 'new',
      }),
    );
    dispatch(
      countRemoteRequests({
        status: 'new',
      }),
    );
    dispatch(
      countOvertimeRequests({
        status: 'new',
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(
      fetchLogs(
        {
          page: paging.currentPage,
          perpage: paging.pageSize,
        },
        onTotalChange,
        setLoading,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paging.currentPage, paging.pageSize]);
  return (
    <>
      <div className="m-4 p-4">
        <h2>{t('label.overall')}</h2>
        <div className={'row mt-2'}>
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-warning"
              text="Tổng số nhân viên"
              style={{ height: '175px' }}
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>{totalEmployee}</p>
                  </h1>
                  {/* <div className="row ml-4">
                    <TrendingUp />
                    <h5 className="pl-2">5% + {t('label.compare_with_previous_month')}</h5>
                  </div> */}
                </div>
              }
            >
              <Link to={'/profile'}>
                <AccountIcon />
              </Link>
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              style={{
                background: `linear-gradient(to left, #ff5050 19%, #ff9900 100%)`,
                height: '175px',
              }}
              text="Tổng số tài khoản"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>15</p>
                  </h1>
                  {/* <div className="row ml-4">
                    <TrendingDown />
                    <h5 className="pl-2">5% + {t('label.compare_with_previous_month')}</h5>
                  </div> */}
                </div>
              }
            >
              <Link to={'/account'} style={{ color: 'white' }}>
                <CIcon name="cilPeople" size="xl" />
              </Link>
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-primary"
              style={{
                height: '175px',
              }}
              text="Tổng số chi nhánh"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>{totalBranch}</p>
                  </h1>
                  {/* <div className="row ml-4">
                    <TrendingDown />
                    <h5 className="pl-2">5% + {t('label.compare_with_previous_month')}</h5>
                  </div> */}
                </div>
              }
            >
              <Link to={'/setting/branch'}>
                <BranchesIcon />
              </Link>
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              style={{
                background: `linear-gradient(to left, #99ccff 0%, #cc99ff 100%)`,
                height: '175px',
              }}
              text="Tổng số phòng ban"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>{totalDepartment}</p>
                  </h1>
                  {/* <div className="row ml-4">
                    <TrendingDown />
                    <h5 className="pl-2">5% + {t('label.compare_with_previous_month')}</h5>
                  </div> */}
                </div>
              }
            >
              <Link to={'/setting/department'}>
                <DepartmentIcon />
              </Link>
            </CWidgetDropdown>
          </div>
        </div>
        <h2>{t('label.request')}</h2>
        <div className="row mt-2">
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-success"
              style={{
                height: '175px',
              }}
              text="Số đề xuất xin nghỉ chưa được xử lý"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>{totalLeave}</p>
                  </h1>
                </div>
              }
            >
              <Link to={'/proposal/leave'} style={{ color: 'white' }}>
                <CIcon name="cilPeople" size="xl" />
              </Link>
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-info"
              style={{
                height: '175px',
              }}
              text="Số đề xuất xin làm từ xa chưa được xử lý"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>{totalRemote}</p>
                  </h1>
                </div>
              }
            >
              <Link to={'/proposal/remote'} style={{ color: 'white' }}>
                <CIcon name="cilPeople" size="xl" />
              </Link>
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              style={{
                background: `linear-gradient(to right, #0099cc 0%, #66ccff 100%)`,
                height: '175px',
              }}
              text="Số đề xuất xin làm thêm giờ chưa được xử lý"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>{totalOvertime}</p>
                  </h1>
                </div>
              }
            >
              <Link to={'/proposal/overtime'} style={{ color: 'white' }}>
                <CIcon name="cilPeople" size="xl" />
              </Link>
            </CWidgetDropdown>
          </div>
        </div>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol sm="5">
                <h4 id="traffic" className="card-title mb-0">
                  Biểu đồ điểm danh
                </h4>
                <div className="small text-muted">Tháng 5 2021</div>
              </CCol>
            </CRow>
            <MainChartExample style={{ height: '300px', marginTop: '20px' }} />
          </CCardBody>
        </CCard>
        <QTable
          t={t}
          disableFilter={true}
          columnDef={columnDef}
          data={logData}
          disableEditColum={true}
          paging={paging}
          onCurrentPageChange={onCurrentPageChange}
          onPageSizeChange={onPageSizeChange}
          disableToolBar={true}
        />
      </div>
    </>
  );
};

export default Dashboard;
