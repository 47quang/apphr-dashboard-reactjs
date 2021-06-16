import { CContainer } from '@coreui/react';
import { CircularProgress, IconButton } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import WarningAlertDialog from 'src/components/dialog/WarningAlertDialog';
import { fetchStatics, setEmptyStatics, deleteStatic } from 'src/stores/actions/static';

const Report = ({ t, location }) => {
  const dispatch = useDispatch();
  const statics = useSelector((st) => st.static.statics);
  const [state, setState] = useState({
    loading: false,
    openWarning: false,
    deletingFile: '',
  });
  const setLoading = (isLoad) => {
    setState({ ...state, loading: isLoad });
  };

  useEffect(() => {
    dispatch(fetchStatics(setLoading));
    return () => {
      dispatch(setEmptyStatics());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAfterDelete = () => {
    dispatch(fetchStatics());
    setState({ ...state, openWarning: false });
  };
  const handleConfirmWarning = (e) => {
    dispatch(deleteStatic(state.deletingFile, t('message.successful_delete'), handleAfterDelete));
  };
  const handleCancelWarning = () => {
    setState({ ...state, openWarning: false });
  };

  const body = (stat) => {
    if (stat && stat.length > 0) {
      return (
        <div>
          {state.openWarning && (
            <WarningAlertDialog
              isVisible={state.openWarning}
              title={t('title.delete_file')}
              titleConfirm={t('label.agree')}
              handleConfirm={handleConfirmWarning}
              titleCancel={t('label.decline')}
              handleCancel={handleCancelWarning}
              warningMessage={t('message.delete_file_warning_message')}
            />
          )}
          {stat.map((st, idx) => {
            return (
              <div key={idx}>
                <h5 className="d-inline py-3">
                  <b>{st.key}</b>
                </h5>
                <div className="row p-3">
                  {st?.date && st.date.length > 0 ? (
                    st.date.map((date, id) => {
                      return (
                        <div className="col-2 d-block" key={'date ' + id}>
                          <div className="show-image d-flex justify-content-center">
                            {date.type === 'docx' ? (
                              <img src="images/word.svg" alt="docx" style={{ height: '100px' }} />
                            ) : (
                              <img src="images/excel.svg" alt="excel" style={{ height: '100px' }} />
                            )}
                            <IconButton
                              className="pl-2 close"
                              hidden={false}
                              onClick={() => {
                                setState({ ...state, openWarning: true, deletingFile: date.filename });
                              }}
                              title={t('message.delete_row')}
                              style={{ width: 35, height: 35, color: 'red' }}
                            >
                              <Cancel />
                            </IconButton>
                          </div>

                          <a href={`https://apphr.me/public/DEV/${date.filename}`} style={{ color: '#303C54' }}>
                            <p style={{ textAlign: 'center', paddingTop: 8 }}>{date.filename}</p>
                          </a>
                        </div>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    } else return <></>;
  };
  const load = (isLoad) => {
    if (isLoad)
      return (
        <div className="text-center">
          <CircularProgress />
        </div>
      );
    else return body(statics);
  };
  return (
    <CContainer fluid className="c-main m-auto p-4" style={{ backgroundColor: '#f7f7f7' }}>
      <Helmet>
        <title>{'APPHR | ' + t('Store')}</title>
      </Helmet>
      <div className="m-auto">{load(state.loading)}</div>
    </CContainer>
  );
};

export default Report;
