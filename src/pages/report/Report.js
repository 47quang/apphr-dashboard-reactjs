import { CContainer } from '@coreui/react';
import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
  console.log('statics', statics);
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <div className="m-auto">
        {loading ? (
          <div className="text-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="row">
            {statics && statics.length > 0 ? (
              statics.map((file, idx) => {
                return (
                  <div className="col-2" key={idx}>
                    {file.type === 'docx' ? (
                      <img
                        className="image"
                        src="images/Microsoft_Word-Logo.wine.svg"
                        alt="docx"
                        style={{ height: '100px' }}
                        // onClick={() => {
                        //   window.location.href = `https://apphr.me/public/DEV/${file.file}`;
                        // }}
                      />
                    ) : (
                      <img className="image" src="images/microsoft-excel-logo.svg" alt="excel" style={{ height: '100px' }} />
                    )}

                    <Link
                      onClick={() => {
                        window.location.href = `https://apphr.me/public/DEV/${file.file}`;
                      }}
                    >
                      <p>{file.file}</p>
                    </Link>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </CContainer>
  );
};

export default Report;
