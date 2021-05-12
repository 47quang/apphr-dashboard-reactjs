import CIcon from '@coreui/icons-react';
import { CCard, CCardBody, CCol, CRow, CWidgetDropdown } from '@coreui/react';
import { TrendingDown, TrendingUp } from '@material-ui/icons';
import React from 'react';
import MainChartExample from 'src/components/charts/MainChartExample';
import AccountIcon from 'src/components/icon/Account';
import BranchesIcon from 'src/components/icon/Branches';
import DepartmentIcon from 'src/components/icon/Department';

const Dashboard = ({ t, location }) => {
  return (
    <>
      <div className="m-4 p-4">
        <h2>Tổng thể</h2>
        <div className={'row mt-2'}>
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-warning"
              text="Tổng số nhân viên"
              style={{ height: '175px' }}
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>51</p>
                  </h1>
                  <div className="row ml-4">
                    <TrendingUp />
                    <h5 className="pl-2">5% so với tháng trước</h5>
                  </div>
                </div>
              }
            >
              <AccountIcon />
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
                  <div className="row ml-4">
                    <TrendingDown />
                    <h5 className="pl-2">5% so với tháng trước</h5>
                  </div>
                </div>
              }
            >
              <CIcon name="cilPeople" size="xl" />
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
                    <p>51</p>
                  </h1>
                  <div className="row ml-4">
                    <TrendingDown />
                    <h5 className="pl-2">5% so với tháng trước</h5>
                  </div>
                </div>
              }
            >
              <BranchesIcon />
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
                    <p>51</p>
                  </h1>
                  <div className="row ml-4">
                    <TrendingDown />
                    <h5 className="pl-2">5% so với tháng trước</h5>
                  </div>
                </div>
              }
            >
              <DepartmentIcon />
            </CWidgetDropdown>
          </div>
        </div>
        <h2>Đề xuất</h2>
        <div className="row mt-2">
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-success"
              style={{
                height: '175px',
              }}
              text="Số đề xuất xin nghỉ chưa được xữ lý"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>4</p>
                  </h1>
                  <div className="row ml-4">
                    <TrendingDown />
                    <h5 className="pl-2">5% so với tháng trước</h5>
                  </div>
                </div>
              }
            >
              <CIcon name="cilPeople" size="xl" />
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-info"
              style={{
                height: '175px',
              }}
              text="Số đề xuất xin làm từ xa chưa được xữ lý"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>4</p>
                  </h1>
                  <div className="row ml-4">
                    <TrendingDown />
                    <h5 className="pl-2">5% so với tháng trước</h5>
                  </div>
                </div>
              }
            >
              <CIcon name="cilPeople" size="xl" />
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              style={{
                background: `linear-gradient(to right, #0099cc 0%, #66ccff 100%)`,
                height: '175px',
              }}
              text="Số đề xuất xin làm thêm giờ chưa được xữ lý"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>4</p>
                  </h1>
                  <div className="row ml-4">
                    <TrendingDown />
                    <h5 className="pl-2">5% so với tháng trước</h5>
                  </div>
                </div>
              }
            >
              <CIcon name="cilPeople" size="xl" />
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
      </div>
    </>
  );
};

export default Dashboard;
