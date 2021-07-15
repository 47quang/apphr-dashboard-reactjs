import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, ROUTE_PATH } from 'src/constants/key';
import { deleteStatic, fetchStatics, setEmptyStatics } from 'src/stores/actions/static';

const Report = ({ t, location }) => {
  const dispatch = useDispatch();
  const statics = useSelector((st) => st.static.statics);
  let data = statics;
  const [state, setState] = useState({
    loading: false,
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
  };

  const columnDef = [
    { name: 'type', title: t('label.file_type'), align: 'left', width: '20%', wordWrapEnabled: true },
    { name: 'name', title: t('label.file_name'), align: 'left', width: '40%', wordWrapEnabled: true },
    { name: 'createdAt', title: t('label.createdAt'), align: 'left', width: '30%', wordWrapEnabled: true },
  ];
  const operatesText = [
    {
      id: FILTER_OPERATOR.LIKE,
      name: t('filter_operator.like'),
    },
    {
      id: FILTER_OPERATOR.START,
      name: t('filter_operator.start'),
    },
    {
      id: FILTER_OPERATOR.END,
      name: t('filter_operator.end'),
    },
    {
      id: FILTER_OPERATOR.EMPTY,
      name: t('filter_operator.empty'),
    },
    {
      id: FILTER_OPERATOR.NOT_EMPTY,
      name: t('filter_operator.not_empty'),
    },
  ];
  const filters = {
    name: {
      title: t('label.file_name'),
      operates: operatesText,
      type: 'text',
    },
    type: {
      title: t('label.file_type'),
      operates: [
        {
          id: FILTER_OPERATOR.EQUAL,
          name: t('filter_operator.='),
        },
      ],
      type: 'select',
      values: [
        { id: 'Word', name: t('label.Word') },
        { id: 'Excel', name: t('label.Excel') },
      ],
    },
  };
  const filterFunction = (params) => {
    console.log(params);
  };
  const deleteRow = async (rowId) => {
    dispatch(deleteStatic(rowId, t('message.successful_delete'), handleAfterDelete));
  };

  return (
    <CContainer fluid className="c-main m-auto p-4" style={{ backgroundColor: '#f7f7f7' }}>
      <Helmet>
        <title>{'APPHR | ' + t('Store')}</title>
      </Helmet>
      {/* <div className="m-auto">{load(state.loading)}</div> */}
      <QTable
        t={t}
        columnDef={columnDef}
        route={ROUTE_PATH.STORE + '/'}
        data={data}
        deleteRow={deleteRow}
        disableCreate={true}
        disableEdit={true}
        disableToolBar={true}
        filters={filters}
        filterFunction={filterFunction}
        disableFilter={false}
        notPaging={true}
        isDownload={true}
      />
    </CContainer>
  );
};

export default Report;
