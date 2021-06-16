import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatics, setEmptyStatics } from 'src/stores/actions/static';

const Report = ({ t, location }) => {
  const dispatch = useDispatch();
  const statics = useSelector((state) => state.static.statics);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    dispatch(fetchStatics(setLoading));
    return () => {
      dispatch(setEmptyStatics());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <CContainer fluid className="c-main m-auto p-4">
      <Helmet>
        <title>{'APPHR | ' + t('Store')}</title>
      </Helmet>
      <div className="m-auto">
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            {statics && statics.length > 0 ? (
              statics.map((st, idx) => {
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
                              <div className="show-image">
                                {date.type === 'docx' ? (
                                  <img src="images/word.svg" alt="docx" style={{ height: '100px' }} />
                                ) : (
                                  <img src="images/excel.svg" alt="excel" style={{ height: '100px' }} />
                                )}
                                <span className="pl-2 close">X</span>
                                {/* <IconButton
                                  className="mx-2 my-0 p-0"
                                  hidden={false}
                                  onClick={() => {}}
                                  title={t('message.delete_row')}
                                  style={{ width: 35, height: 35, color: 'red' }}
                                >
                                  <DeleteIcon />
                                </IconButton> */}
                              </div>

                              <a href={`https://apphr.me/public/DEV/${date.filename}`}>
                                <p>{date.filename}</p>
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
              })
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </CContainer>
  );
};

export default Report;
