import React from "react";
import Label from "src/components/label/label";
import "./general_style.css";
//TODO: translate
const General = () => {
  return (
    <div className="m-auto">
      <div className="shadow bg-white rounded p-4 container col-md-10">
        <form>
          <div className="row">
            <div className="form-group col-lg-6">
              <Label text={"Tên doanh nghiệp"} required />
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Nhập tên doanh nghiệp"
              />
            </div>
            <div className="form-group col-lg-6">
              <Label text={"Số điện thoại"} />

              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <Label text={"Email"} />
              <input
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Nhập email của công ty"
              />
            </div>
            <div className="form-group col-lg-6">
              <Label text={"Địa chỉ"} />
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Nhập địa chỉ"
              />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <Label text={"Mã số thuế"} />
              <input
                type="text"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Nhập mã số thuế"
              />
            </div>
            <div className="form-group col-lg-6">
              <Label text={"Số lượng nhân viên"} />
              <select className="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-6">
              <label>Hình thức điểm danh</label>
              <select className="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default General;
