import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
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
    <CContainer fluid className="c-main mb-3 px-4">
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
                            <div className="col-2" key={'date ' + id}>
                              {date.type === 'docx' ? (
                                <img className="image" src="images/word.svg" alt="docx" style={{ height: '100px' }} />
                              ) : (
                                <img className="image" src="images/excel.svg" alt="excel" style={{ height: '100px' }} />
                              )}

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
