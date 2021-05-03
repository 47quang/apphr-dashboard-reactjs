import { CContainer } from '@coreui/react';
import React from 'react';
import QTable from 'src/components/table/Table';

const PersonalTax = ({ t, location, history }) => {
  const columnDef = [
    { name: 'name', title: t('label.personal_tax_level'), align: 'left', width: '70%', wordWrapEnabled: true },
    { name: 'value', title: t('label.percentage_tax'), align: 'left', width: '30%', wordWrapEnabled: true },
  ];
  const taxes = [
    { id: 1, name: 'Đến 5 triệu VNĐ', value: '5%' },
    { id: 2, name: 'Trên 5 triệu VNĐ đến 10 triệu VNĐ', value: '10%' },
    { id: 3, name: 'Trên 10 triệu VNĐ đến 18 triệu VNĐ', value: '15%' },
    { id: 4, name: 'Trên 18 triệu VNĐ đến 32 triệu VNĐ', value: '20%' },
    { id: 5, name: 'Trên 32 triệu VNĐ đến 52 triệu VNĐ', value: '25%' },
    { id: 6, name: 'Trên 52 triệu VNĐ đến 80 triệu VNĐ', value: '30%' },
    { id: 7, name: 'Trên 80 triệu VNĐ', value: '35%' },
  ];

  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable t={t} columnDef={columnDef} data={taxes} disableEditColum={true} disableToolBar={true} disableFilter={true} notPaging={true} />
    </CContainer>
  );
};
export default PersonalTax;
