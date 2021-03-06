import { CContainer } from "@coreui/react";
import {
  DataGrid,
  GridColumnsToolbarButton,
  GridToolbarContainer,
} from "@material-ui/data-grid";
import React, { useState } from "react";
import { TheHeader } from "src/layouts";

//TODO: translate
const Profile = ({ t, location }) => {
  const [selectionModel, setSelectionModel] = useState([]);
  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridColumnsToolbarButton displayName="Col"/>
    </GridToolbarContainer>
  );
  const rows = [];
  const columns = [
    { field: "code", headerName: "Mã nhân viên", width: 150 },
    { field: "employee_name", headerName: "Họ và tên", width: 200 },
    { field: "phone", headerName: "Số điện thoại", width: 150 },
    { field: "sex", headerName: "Giới tính", width: 110 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "position", headerName: "Vị trí", width: 200 },
    { field: "department", headerName: "Phòng ban", width: 200 },
    { field: "branch", headerName: "Chi nhánh", width: 200 },
  ];
  return (
    <>
      <TheHeader />
      <CContainer fluid className="c-main mb-3">
        <DataGrid
          className="bg-white py-3 px-4"
          autoHeight
          checkboxSelection
          selectionModel={selectionModel}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          pagination
          rows={rows}
          columns={columns}
          components={{
            Toolbar: CustomToolbar,
            // NoRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      </CContainer>
    </>
  );
};

export default Profile;
