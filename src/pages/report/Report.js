import { CContainer } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import QTable from 'src/components/table/Table';
import { FILTER_OPERATOR, ROUTE_PATH } from 'src/constants/key';
import { deleteStatic, fetchStatics, setEmptyStatics } from 'src/stores/actions/static';
import { slugify } from 'src/utils/stringUtils';

const equalQTable = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data) &&
    JSON.stringify(prevProps.columnDef) === JSON.stringify(nextProps.columnDef) &&
    JSON.stringify(prevProps.paging.statics) === JSON.stringify(nextProps.paging.statics)
  );
};

const MemoizedQTable = React.memo(QTable, equalQTable);

const Report = ({ t, location }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    loading: false,
    data: [],
    statics: [],
  });
  const setLoading = (isLoad) => {
    setState((prevState) => ({
      ...prevState,
      loading: isLoad,
    }));
  };
  const setData = (newData) => {
    setState((prevState) => ({
      ...prevState,
      data: newData,
    }));
  };
  const setFetch = (newData) => {
    setState((prevState) => ({
      ...prevState,
      data: newData,
      statics: newData,
    }));
  };

  useEffect(() => {
    dispatch(fetchStatics(setLoading, setFetch));
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

  var filterFunction = (params) => {
    console.log(params);
    let newData = params.filters.reduce((init, filter) => {
      let filterValues, keyWord;
      if (filter.rule === 'type') {
        keyWord = filter.value;
        filterValues = init.filter((record) => record.type === keyWord);
      } else {
        keyWord = slugify(filter.value);
        filterValues = init.filter((record) => record.name.includes(keyWord));
      }
      return filterValues;
    }, state.statics);
    setData(newData);
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
      <MemoizedQTable
        t={t}
        columnDef={columnDef}
        route={ROUTE_PATH.STORE + '/'}
        data={state.data}
        paging={state}
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
