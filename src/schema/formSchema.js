import * as Yup from "yup";
import { getRegexExpression, VALIDATION_TYPE } from "src/utils/validationUtils";
import moment from "moment";

//SETTING
//General Information
export const SettingGeneralInfoSchema = Yup.object().shape({
  companyName: Yup.string().trim().required("Bắt buộc nhập tên công ty"),
  phone: Yup.string()
    .matches(
      getRegexExpression(VALIDATION_TYPE.PHONE_NUMBER),
      "Nhập không đúng số điện thoại"
    )
    .required("Bắt buộc nhập số điện thoại"),
  email: Yup.string().email("Email nhập sai").required("Bắt buộc nhập email"),
  address: Yup.string().trim(),
  taxCode: Yup.string(),
});

//Shift
const isBefore = (startTime, endTime) => {
  return moment(startTime, "HH:mm").isBefore(moment(endTime, "HH:mm"));
};
export const SettingShiftInfoSchema = Yup.object().shape({
  shiftCode: Yup.string().trim().required("Bắt buộc nhập mã ca làm"),
  shiftName: Yup.string().trim().required("Bắt buộc nhập tên ca làm"),
  start: Yup.string().test(
    "not empty",
    "Bắt buộc chọn giờ check-in",
    function (value) {
      return !!value;
    }
  ),
  end: Yup.string()
    .test("not empty", "Bắt buộc chọn giờ check-out", function (value) {
      return !!value;
    })
    .test(
      "end_time_test",
      "Giờ check-out phải sau giờ check-in",
      function (value) {
        const { start } = this.parent;
        return isBefore(start, value);
      }
    ),
  facOfShift: Yup.number()
    .min(0, "Hệ số giờ làm phải là một số không âm")

    .required("Bắt buộc phải nhập hệ số giờ làm"),
});

//Holiday
export const SettingHolidayInfoSchema = Yup.object().shape({
  holidayTitle: Yup.string().required("Bắt buộc nhập vào tiêu đề của ngày lễ"),
  startDate: Yup.string().required("Ngày bắt đầu không được bỏ trống"),
  endDate: Yup.string().required("Ngày kết thúc không được bỏ trống"),
});

//Position
export const SettingPositionInfoSchema = Yup.object().shape({
  shortname: Yup.string().required("Nhập mã của vị trí"),
  name: Yup.string().required("Bắt buộc nhập vào tên vị trí"),
});

//Branch
export const SettingBranchInfoSchema = Yup.object().shape({
  branchCode: Yup.string().required("Bắt buộc nhập vào mã chi nhánh"),
  branchName: Yup.string().required("Bắt buộc nhập vào tên của chi nhánh"),
  ip: Yup.string().matches(getRegexExpression(VALIDATION_TYPE.IP_V4_ADDRESS), "Địa chỉ IP không hợp lệ."),
  address: Yup.string().trim().required("Bắt buộc nhập địa chỉ chi nhánh"),
  description: Yup.string(),
});

//Department
export const SettingDepartmentInfoSchema = Yup.object().shape({
  departmentCode: Yup.string().required("Bắt buộc nhập vào mã phòng ban"),
  departmentName: Yup.string().required("Bắt buộc nhập vào tên phòng ban"),
});