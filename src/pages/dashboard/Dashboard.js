import CIcon from '@coreui/icons-react';
import { CButton, CButtonGroup, CCard, CCardBody, CCardFooter, CCol, CProgress, CRow, CWidgetDropdown } from '@coreui/react';
import React from 'react';
import MainChartExample from 'src/components/charts/MainChartExample';

const Dashboard = ({ t, location }) => {
  return (
    <>
      <div className="m-4 p-4">
        <div className={'row mt-2'}>
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-warning"
              text="Tổng số nhân viên"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>51</p>
                  </h1>
                </div>
              }
            >
              <CIcon name="cilPeople" size="xl" />
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              style={{
                background: `linear-gradient(to left, #ff5050 19%, #ff9900 100%)`,
              }}
              text="Tổng số tài khoản"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>15</p>
                  </h1>
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
              }}
              text="Tổng số chi nhánh"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>51</p>
                  </h1>
                </div>
              }
            >
              <CIcon name="cilPeople" size="xl" />
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              style={{
                background: `linear-gradient(to left, #99ff99 19%, #33cc33 100%)`,
              }}
              text="Tổng số phòng ban"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>51</p>
                  </h1>
                </div>
              }
            >
              <CIcon name="cilPeople" size="xl" />
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-success"
              text="Số nhân viên đang làm việc"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>45</p>
                  </h1>
                </div>
              }
            >
              <CIcon name="cilPeople" size="xl" />
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-primary"
              text="Số nhân viên vắng"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>7</p>
                  </h1>
                </div>
              }
            >
              <CIcon name="cilPeople" size="xl" />
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-dark"
              text="Số nhân viên nghỉ có phép"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>6</p>
                  </h1>
                </div>
              }
            >
              <CIcon name="cilPeople" size="xl" />
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-danger"
              text="Số nhân viên nghỉ không phép"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>1</p>
                  </h1>
                </div>
              }
            >
              <CIcon name="cilPeople" size="xl" />
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              color="gradient-info"
              text="Số nhân viên làm từ xa"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>2</p>
                  </h1>
                </div>
              }
            >
              <CIcon name="cilPeople" size="xl" />
            </CWidgetDropdown>
          </div>
          <div className={'col-3'}>
            <CWidgetDropdown
              style={{
                background: `linear-gradient(to left, #99ccff 0%, #cc99ff 100%)`,
              }}
              text="Số nhân viên làm thêm giờ"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>6</p>
                  </h1>
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
              }}
              text="Số nhân viên làm thêm giờ từ xa"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>0</p>
                  </h1>
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
              }}
              text="Số đề xuất xin nghỉ chưa được xữ lý"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>4</p>
                  </h1>
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
              }}
              text="Số đề xuất xin làm từ xa chưa được xữ lý"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>4</p>
                  </h1>
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
              }}
              text="Số đề xuất xin làm thêm giờ chưa được xữ lý"
              footerSlot={
                <div className={'text-center'} style={{ height: '100px' }}>
                  <h1>
                    <p>4</p>
                  </h1>
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
