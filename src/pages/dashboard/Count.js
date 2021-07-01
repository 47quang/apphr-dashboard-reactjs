import CIcon from '@coreui/icons-react';
import { CWidgetDropdown } from '@coreui/react';
import { IconButton } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AccountIcon from 'src/components/icon/Account';
import BranchesIcon from 'src/components/icon/Branches';
import DepartmentIcon from 'src/components/icon/Department';
import { countAccounts } from 'src/stores/actions/account';
import { countActiveContracts } from 'src/stores/actions/contract';
import { countBranches, countDepartments, countLeaveRequests, countOvertimeRequests, countRemoteRequests } from 'src/stores/actions/dashboard';

const Count = () => {
  const totalEmployee = useSelector((state) => state.contract.total);
  const totalAccount = useSelector((state) => state.account.total);
  const totalBranch = useSelector((state) => state.dashboard.totalBranch);
  const totalDepartment = useSelector((state) => state.dashboard.totalDepartment);
  const totalLeave = useSelector((state) => state.dashboard.totalLeave);
  const totalRemote = useSelector((state) => state.dashboard.totalRemote);
  const totalOvertime = useSelector((state) => state.dashboard.totalOvertime);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(countActiveContracts());
    dispatch(countBranches());
    dispatch(countDepartments());
    dispatch(countAccounts());
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

  return (
    <>
      <h2>{t('label.overall')}</h2>
      <div className={'row mt-2'}>
        <div className={'col-3'}>
          <CWidgetDropdown
            color="gradient-warning"
            text={t('label.total_number_employees')}
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
            <IconButton style={{ width: 40, height: 40 }}>
              <Link to={'/profile'}>
                <AccountIcon />
              </Link>
            </IconButton>
          </CWidgetDropdown>
        </div>
        <div className={'col-3'}>
          <CWidgetDropdown
            style={{
              background: `linear-gradient(to left, #ff5050 19%, #ff9900 100%)`,
              height: '175px',
            }}
            text={t('label.total_number_accounts')}
            footerSlot={
              <div className={'text-center'} style={{ height: '100px' }}>
                <h1>
                  <p>{totalAccount}</p>
                </h1>
                {/* <div className="row ml-4">
                    <TrendingDown />
                    <h5 className="pl-2">5% + {t('label.compare_with_previous_month')}</h5>
                  </div> */}
              </div>
            }
          >
            <IconButton style={{ width: 40, height: 40 }}>
              <Link to={'/account'} style={{ color: 'white' }}>
                <CIcon name="cilPeople" size="xl" />
              </Link>
            </IconButton>
          </CWidgetDropdown>
        </div>
        <div className={'col-3'}>
          <CWidgetDropdown
            color="gradient-primary"
            style={{
              height: '175px',
            }}
            text={t('label.total_number_branches')}
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
            <IconButton style={{ width: 40, height: 40 }}>
              <Link to={'/setting/branch'}>
                <BranchesIcon />
              </Link>
            </IconButton>
          </CWidgetDropdown>
        </div>
        <div className={'col-3'}>
          <CWidgetDropdown
            style={{
              background: `linear-gradient(to left, #99ccff 0%, #cc99ff 100%)`,
              height: '175px',
            }}
            text={t('label.total_number_departments')}
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
            <IconButton style={{ width: 40, height: 40 }}>
              <Link to={'/setting/department'}>
                <DepartmentIcon />
              </Link>
            </IconButton>
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
            text={t('label.unprocessed_leave_request')}
            footerSlot={
              <div className={'text-center'} style={{ height: '100px' }}>
                <h1>
                  <p>{totalLeave}</p>
                </h1>
              </div>
            }
          >
            <IconButton style={{ width: 40, height: 40 }}>
              <Link to={{ pathname: '/leave', state: { rule: 'status', op: '=', value: 'new' } }} style={{ color: 'white' }}>
                <CIcon name="cilDescription" size="xl" />
              </Link>
            </IconButton>
          </CWidgetDropdown>
        </div>
        <div className={'col-3'}>
          <CWidgetDropdown
            color="gradient-info"
            style={{
              height: '175px',
            }}
            text={t('label.unprocessed_remote_request')}
            footerSlot={
              <div className={'text-center'} style={{ height: '100px' }}>
                <h1>
                  <p>{totalRemote}</p>
                </h1>
              </div>
            }
          >
            <IconButton style={{ width: 40, height: 40 }}>
              <Link to={{ pathname: '/remote', state: { rule: 'status', op: '=', value: 'new' } }} style={{ color: 'white' }}>
                <CIcon name="cilDescription" size="xl" />
              </Link>
            </IconButton>
          </CWidgetDropdown>
        </div>
        <div className={'col-3'}>
          <CWidgetDropdown
            style={{
              background: `linear-gradient(to right, #0099cc 0%, #66ccff 100%)`,
              height: '175px',
            }}
            text={t('label.unprocessed_overtime_request')}
            footerSlot={
              <div className={'text-center'} style={{ height: '100px' }}>
                <h1>
                  <p>{totalOvertime}</p>
                </h1>
              </div>
            }
          >
            <IconButton style={{ width: 40, height: 40 }}>
              <Link to={{ pathname: '/overtime', state: { rule: 'status', op: '=', value: 'new' } }} style={{ color: 'white' }}>
                <CIcon name="cilDescription" size="xl" />
              </Link>
            </IconButton>
          </CWidgetDropdown>
        </div>
      </div>
    </>
  );
};
export default Count;
