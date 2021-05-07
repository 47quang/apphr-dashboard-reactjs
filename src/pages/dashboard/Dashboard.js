import CIcon from '@coreui/icons-react';
import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCol, CProgress, CRow, CWidgetDropdown } from '@coreui/react';
import { AttachMoney, Cancel, MoneyOff, TrendingDown, TrendingFlat, TrendingUp } from '@material-ui/icons';
import React from 'react';
import MainChartExample from 'src/components/charts/MainChartExample';
import AccountIcon from 'src/components/icon/Account';
import BranchesIcon from 'src/components/icon/Branches';
import DepartmentIcon from 'src/components/icon/Department';
import EmployeeWorkingIcon from 'src/components/icon/EmployeeWorkingIcon';
import OverTimeICon from 'src/components/icon/Overtime';
import TeleWorking from 'src/components/icon/TeleWorking';

const Dashboard = ({ t, location }) => {
  return (
    <>
      <div className="m-4 p-4">
        <h2>Thực thể</h2>
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
              style={{
                background: `linear-gradient(to right, #0000ff 19%, #9966ff 100%)`,
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
                background: `linear-gradient(to right, #99ff99 0%, #33cc33 100%)`,
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
        <h2>Điểm danh</h2>
        <div className="row mt-2">
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-success"
              text="Số nhân viên đang làm việc"
              style={{ height: '175px' }}
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>45</p>
                  </h1>
                  <div className="row ml-4">
                    <TrendingDown />
                    <h5 className="pl-2">5% so với tháng trước</h5>
                  </div>
                </div>
              }
            >
              <EmployeeWorkingIcon />
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-primary"
              style={{ height: '175px' }}
              text="Số nhân viên nghỉ phép có lương/nghỉ chế độ"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>7</p>
                  </h1>
                  <div className="row ml-4">
                    <TrendingDown />
                    <h5 className="pl-2">5% so với tháng trước</h5>
                  </div>
                </div>
              }
            >
              <AttachMoney />
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-dark"
              text="Số nhân viên nghỉ phép không lương"
              style={{ height: '175px' }}
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>6</p>
                  </h1>
                  <div className="row ml-4">
                    <TrendingDown />
                    <h5 className="pl-2">5% so với tháng trước</h5>
                  </div>
                </div>
              }
            >
              <MoneyOff />
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-danger"
              text="Số nhân viên nghỉ không phép"
              style={{ height: '175px' }}
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>1</p>
                  </h1>
                  <div className="row ml-4">
                    <TrendingFlat />
                    <h5 className="pl-2">Không đổi so với tháng trước</h5>
                  </div>
                </div>
              }
            >
              <Cancel />
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-info"
              text="Số nhân viên làm từ xa"
              style={{ height: '175px' }}
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>2</p>
                  </h1>
                  <div className="row ml-4">
                    <TrendingDown />
                    <h5 className="pl-2">5% so với tháng trước</h5>
                  </div>
                </div>
              }
            >
              <TeleWorking />
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              style={{
                background: `linear-gradient(to left, #99ccff 0%, #cc99ff 100%)`,
                height: '175px',
              }}
              text="Số nhân viên làm thêm giờ"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>6</p>
                  </h1>
                  <div className="row ml-4">
                    <TrendingDown />
                    <h5 className="pl-2">5% so với tháng trước</h5>
                  </div>
                </div>
              }
            >
              <OverTimeICon />
            </CWidgetDropdown>
          </div>
        </div>
        <h2>Đề xuất</h2>
        <div className="row mt-2">
          <div className={'col-3'}>
            <CWidgetDropdown
              style={{
                background: `linear-gradient(to right, #0099cc 0%, #66ccff 100%)`,
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
              style={{
                background: `linear-gradient(to right, #0099cc 0%, #66ccff 100%)`,
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
        <h2>Lương</h2>
        <div className="row mt-2">
          <div className={'col-3'}>
            <CWidgetDropdown
              style={{
                background: `linear-gradient(to right, #0099cc 0%, #66ccff 100%)`,
                height: '175px',
              }}
              text="Tổng tiền lương"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>100,000,000 VNĐ</p>
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
              text="Tiền lương trung bình"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>15,000,000 VNĐ</p>
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
      </div>
      <CCard className="p-4 m-4">
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Biểu đồ điểm danh
              </h4>
              <div className="small text-muted">Tháng 5 2021</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download" />
              </CButton>
              <CButtonGroup className="float-right mr-3">
                {['Tháng'].map((value) => (
                  <CButton color="outline-secondary" key={value} className="mx-0" active={value === 'Month'}>
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample style={{ height: '300px', marginTop: '40px' }} />
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Tổng số nhân viên</div>
              <CProgress className="progress-xs mt-2" precision={1} color="success" value={100} />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Số nhân viên đi làm</div>
              <CProgress className="progress-xs mt-2" precision={1} color="info" value={100} />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>
    </>
  );
};

export default Dashboard;
