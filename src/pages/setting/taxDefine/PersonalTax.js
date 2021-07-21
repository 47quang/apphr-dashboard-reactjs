import { CContainer } from '@coreui/react';
import React from 'react';
import QTable from 'src/components/table/Table';

const PersonalTax = ({ t, location, history }) => {
  const columnDef = [
    { name: 'name', title: t('label.personal_tax_level'), align: 'left', width: '70%', wordWrapEnabled: true },
    { name: 'value', title: t('label.percentage_tax_person'), align: 'left', width: '30%', wordWrapEnabled: true },
  ];
  const taxes = [
    { id: 1, name: t('label.less_than_5m'), value: '5%' },
    { id: 2, name: t('label.great_than_5m_less_than_10m'), value: '10%' },
    { id: 3, name: t('label.great_than_10m_less_than_18m'), value: '15%' },
    { id: 4, name: t('label.great_than_18m_less_than_32m'), value: '20%' },
    { id: 5, name: t('label.great_than_32m_less_than_52m'), value: '25%' },
    { id: 6, name: t('label.great_than_52m_less_than_80m'), value: '30%' },
    { id: 7, name: t('label.great_than_80m'), value: '35%' },
  ];

  return (
    <CContainer fluid className="c-main m-auto col-xl-6">
      <QTable t={t} columnDef={columnDef} data={taxes} disableEditColum={true} disableToolBar={true} disableFilter={true} notPaging={true} />
    </CContainer>
  );
};
export default PersonalTax;
