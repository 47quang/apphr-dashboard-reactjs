import { CContainer } from '@coreui/react';
import React from 'react';
import QTable from 'src/components/table/Table';

const ObligatoryTax = ({ t, location, history }) => {
  const columnDef = [
    { name: 'name', title: t('label.name_tax'), align: 'left', width: '70%', wordWrapEnabled: true },
    { name: 'person', title: t('label.percentage_tax_person'), align: 'left', width: '15%', wordWrapEnabled: true },
    { name: 'company', title: t('label.percentage_tax_company'), align: 'left', width: '15%', wordWrapEnabled: true },
  ];
  const taxes = [
    { id: 1, name: t('label.social_Insurance'), person: '8%', company: '17%' },
    { id: 2, name: t('label.heath_insurance'), person: '1.5%', company: '3%' },
    { id: 3, name: t('label.unemployment_insurance'), person: '1%', company: '1%' },
    { id: 4, name: t('label.accident_insurance'), person: '---', company: '0.5%' },
  ];

  return (
    <CContainer fluid className="c-main m-auto p-4">
      <QTable t={t} columnDef={columnDef} data={taxes} disableEditColum={true} disableToolBar={true} disableFilter={true} notPaging={true} />
    </CContainer>
  );
};
export default ObligatoryTax;
