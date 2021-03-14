import { CContainer } from "@coreui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QTable from "src/components/table/Table";
import { changeActions } from "src/stores/actions/header";
import { fetchBranches } from "src/stores/actions/branch";

const columnDef = [
  { name: "shortname", title: "Mã chi nhánh" },
  { name: "name", title: "Tên chi nhánh" },
  { name: "address", title: "Địa chỉ" },
];
const Branch = ({ t, location, history }) => {
  const dispatch = useDispatch();
  const branches = useSelector((state) => state.branch.branches);

  useEffect(() => {
    const actions = [
      {
        type: "primary",
        name: "Tạo chi nhánh",
        callback: () => {
          history.push("/setting/branch/newBranch");
        },
      },
    ];
    dispatch(fetchBranches());

    dispatch(changeActions(actions));
  }, []);
  return (
    <CContainer fluid className="c-main mb-3 px-4">
      <QTable
        columnDef={columnDef}
        data={branches}
        route={"/setting/branch/id="}
        idxColumnsFilter={[0, 1]}
      />
    </CContainer>
  );
};
export default Branch;
