import { Formik } from 'formik';
import { useState } from 'react';
import { FilterSchema } from 'src/schema/formSchema';
import CommonSelectInput from '../input/CommonSelectInput';
import CommonTextInput from '../input/CommonTextInput';
import Chip from '@material-ui/core/Chip';
import WeekPicker from '../input/WeekPicker';
import CommonAutoCompleteInput from '../input/CommonAutoCompleteInput';

const FilterTable = ({ t, filters, filterFunction, isRollUpTable, fromDate, setFromDate, pageSize, currentPage }) => {
  let columnsFilter = filters ? Object.keys(filters) : [];
  columnsFilter =
    columnsFilter && columnsFilter.length > 0
      ? columnsFilter.map((colName) => ({
          id: colName,
          name: filters[colName]?.title,
        }))
      : [];
  const filterValues = {
    rule: '',
    op: '',
    value: '',
    operates: [],
  };

  const [multiFilter, setMultiFilter] = useState([]);

  const updateMultiFilter = async (newFilter) => {
    return new Promise((resolve, reject) => {
      let isConsist = multiFilter.some((filter) => filter.rule === newFilter.rule);
      if (isConsist) {
        setMultiFilter(multiFilter.map((filter) => (filter.rule === newFilter.rule ? newFilter : filter)));
        resolve(multiFilter.map((filter) => (filter.rule === newFilter.rule ? newFilter : filter)));
      } else {
        setMultiFilter([...multiFilter, newFilter]);
        resolve([...multiFilter, newFilter]);
      }
    });
  };
  const deleteMultiFilter = async (idx) => {
    return new Promise((resolve, reject) => {
      multiFilter.splice(idx, 1);
      setMultiFilter([...multiFilter]);
      resolve([...multiFilter]);
    });
  };
  const handleDelete = async (idx) => {
    let newState = await deleteMultiFilter(idx);
    filterFunction({ filters: newState });
  };
  if (isRollUpTable)
    return (
      <div className="row mx-2 px-2">
        <div className="d-flex justify-content-start col-2 p-2">
          <h5 style={{ paddingTop: 21 }}>
            <WeekPicker fromDate={fromDate} setFromDate={setFromDate} pageSize={pageSize} currentPage={currentPage} />
          </h5>
        </div>
        <div className=" col-md-10 pt-2">
          <Formik
            enableReinitialize
            initialValues={filterValues}
            validationSchema={FilterSchema}
            onSubmit={async ({ operates, ...values }) => {
              let newState = await updateMultiFilter(values);
              filterFunction({ filters: newState });
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue, handleReset }) => {
              return (
                <form autoComplete="off">
                  <div className="row">
                    <div className="row col-lg-11">
                      <CommonSelectInput
                        containerClassName={'form-group col-lg-4'}
                        value={values.rule}
                        onBlur={handleBlur('rule')}
                        onChange={(e) => {
                          handleChange('rule')(e);
                          setFieldValue('op', '');
                          setFieldValue('operates', filters[e.target.value]?.operates);
                          setFieldValue('value', '');
                        }}
                        labelText={t('label.column_filter')}
                        selectClassName={'form-control'}
                        lstSelectOptions={columnsFilter}
                        placeholder={t('placeholder.select_column_filter')}
                        isRequiredField
                        isTouched={touched.rule}
                        isError={errors.rule && touched.rule}
                        errorMessage={t(errors.rule)}
                      />
                      <CommonSelectInput
                        containerClassName={'form-group col-lg-4'}
                        value={values.op}
                        onBlur={handleBlur('op')}
                        onChange={handleChange('op')}
                        labelText={t('label.filter_option')}
                        placeholder={t('placeholder.select_filter_option')}
                        selectClassName={'form-control'}
                        lstSelectOptions={values.operates}
                        isRequiredField
                        isTouched={touched.op}
                        isError={errors.op && touched.op}
                        errorMessage={t(errors.op)}
                      />
                      {filters[values.rule]?.type === 'text' ? (
                        <CommonTextInput
                          containerClassName={'form-group col-lg-4'}
                          value={values.value}
                          onBlur={handleBlur('value')}
                          onChange={(e) => {
                            handleChange('value')(e);
                          }}
                          labelText={t('label.keyword')}
                          inputType={'text'}
                          placeholder={t('placeholder.enter_keyword')}
                          inputClassName={'form-control'}
                          isTouched={touched.value}
                          isDisable={['empty', 'not_empty'].includes(values.op)}
                          isError={errors.value && touched.value}
                          errorMessage={t(errors.value)}
                        />
                      ) : (
                        <CommonSelectInput
                          containerClassName={'form-group col-lg-4'}
                          value={values.value}
                          onBlur={handleBlur('value')}
                          onChange={(e) => {
                            handleChange('value')(e);
                          }}
                          labelText={t('label.filter_value')}
                          placeholder={t('placeholder.select_value')}
                          selectClassName={'form-control'}
                          lstSelectOptions={filters[values.rule]?.values ?? []}
                          isTouched={touched.value}
                          isRequiredField
                          isError={errors.value && touched.value}
                          errorMessage={t(errors.value)}
                        />
                      )}
                    </div>
                    <div className="col-lg-1 d-flex align-items-start pt-4 mt-1 px-0">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => {
                          handleSubmit();
                        }}
                        style={{ width: '100%' }}
                      >
                        {t('label.search')}
                      </button>
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>
          {multiFilter && multiFilter.length > 0 ? (
            multiFilter.map((filter, idx) => {
              return (
                <Chip
                  className="m-1 p-1 mb-2"
                  key={`filter${idx}`}
                  label={
                    filters[filter.rule]?.title +
                    ': ' +
                    t(`filter_operator.${filter.op}`) +
                    (['empty', 'not_empty'].includes(filter.op)
                      ? ''
                      : ' "' + (filters[filter.rule]?.type === 'text' ? filter.value : t(`label.${filter.value}`)) + '"')
                  }
                  color="primary"
                  onDelete={handleDelete}
                  variant="outlined"
                />
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  else
    return (
      <div className="col-md-12 pt-3 m-auto">
        <Formik
          enableReinitialize
          initialValues={filterValues}
          validationSchema={FilterSchema}
          onSubmit={async ({ operates, ...values }) => {
            let newState = await updateMultiFilter(values);
            filterFunction({ filters: newState });
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit, handleBlur, setFieldValue, handleReset }) => (
            <form autoComplete="off">
              <div className="row">
                <div className="row col-lg-11">
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-4'}
                    value={values.rule}
                    onBlur={handleBlur('rule')}
                    onChange={(e) => {
                      handleChange('rule')(e);
                      setFieldValue('op', '');
                      setFieldValue('operates', filters[e.target.value]?.operates);
                      setFieldValue('value', '');
                    }}
                    labelText={t('label.column_filter')}
                    selectClassName={'form-control'}
                    lstSelectOptions={columnsFilter}
                    placeholder={t('placeholder.select_column_filter')}
                    isRequiredField
                    isTouched={touched.rule}
                    isError={errors.rule && touched.rule}
                    errorMessage={t(errors.rule)}
                  />
                  <CommonSelectInput
                    containerClassName={'form-group col-lg-4'}
                    value={values.op}
                    onBlur={handleBlur('op')}
                    onChange={handleChange('op')}
                    labelText={t('label.filter_option')}
                    placeholder={t('placeholder.select_filter_option')}
                    selectClassName={'form-control'}
                    lstSelectOptions={values.operates}
                    isRequiredField
                    isTouched={touched.op}
                    isError={errors.op && touched.op}
                    errorMessage={t(errors.op)}
                  />
                  {filters[values.rule]?.type === 'text' ? (
                    <CommonTextInput
                      containerClassName={'form-group col-lg-4'}
                      value={values.value}
                      onBlur={handleBlur('value')}
                      onChange={(e) => {
                        handleChange('value')(e);
                      }}
                      labelText={t('label.keyword')}
                      inputType={'text'}
                      placeholder={t('placeholder.enter_keyword')}
                      inputClassName={'form-control'}
                      isTouched={touched.value}
                      isDisable={['empty', 'not_empty'].includes(values.op)}
                      isError={errors.value && touched.value}
                      errorMessage={t(errors.value)}
                    />
                  ) : (
                    <CommonSelectInput
                      containerClassName={'form-group col-lg-4'}
                      value={values.value}
                      onBlur={handleBlur('value')}
                      onChange={(e) => {
                        handleChange('value')(e);
                      }}
                      labelText={t('label.filter_value')}
                      placeholder={t('placeholder.select_value')}
                      selectClassName={'form-control'}
                      lstSelectOptions={filters[values.rule]?.values ?? []}
                      isTouched={touched.value}
                      isError={errors.value && touched.value}
                      errorMessage={t(errors.value)}
                    />
                  )}
                </div>
                <div className="col-lg-1 d-flex align-items-start pt-4 mt-1 px-0">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => {
                      handleSubmit();
                    }}
                    style={{ width: '100%' }}
                  >
                    {t('label.search')}
                  </button>
                </div>
              </div>
            </form>
          )}
        </Formik>
        {multiFilter && multiFilter.length > 0 ? (
          multiFilter.map((filter, idx) => {
            return (
              <Chip
                className="m-1 p-1"
                key={`filter${idx}`}
                label={
                  filters[filter.rule]?.title +
                  ': ' +
                  t(`filter_operator.${filter.op}`) +
                  (['empty', 'not_empty'].includes(filter.op)
                    ? ''
                    : ' "' + (filters[filter.rule]?.type === 'select' ? t(`label.${filter.value}`) : filter.value) + '"')
                }
                color="primary"
                onDelete={handleDelete}
                variant="outlined"
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    );
};

export default FilterTable;
