import * as Yup from 'yup';
import { getRegexExpression, VALIDATION_TYPE } from 'src/utils/validationUtils';
import moment from 'moment';

//SETTING
//General Information
export const SettingGeneralInfoSchema = Yup.object().shape({
  name: Yup.string().trim().required('Bắt buộc nhập tên công ty'),
  phone: Yup.string()
    .matches(getRegexExpression(VALIDATION_TYPE.PHONE_NUMBER), 'Nhập không đúng số điện thoại')
    .required('Bắt buộc nhập số điện thoại'),
  email: Yup.string().email('Email nhập sai').required('Bắt buộc nhập email'),
  address: Yup.string().trim(),
  taxCode: Yup.string(),
  provinceId: Yup.number().required(),
  districtId: Yup.number().required(),
  wardId: Yup.number().required(),
});

//Shift
const isBefore = (startTime, endTime) => {
  return moment(startTime, 'HH:mm').isBefore(moment(endTime, 'HH:mm'));
};
export const SettingShiftInfoSchema = Yup.object().shape({
  shortname: Yup.string().trim().required('Bắt buộc nhập mã ca làm'),
  name: Yup.string().trim().required('Bắt buộc nhập tên ca làm'),
  startCC: Yup.string().test('not empty', 'Bắt buộc chọn giờ check-in', function (value) {
    return !!value;
  }),
  endCC: Yup.string()
    .test('not empty', 'Bắt buộc chọn giờ check-out', function (value) {
      return !!value;
    })
    .test('end_time_test', 'Giờ check-out phải sau giờ check-in', function (value) {
      const { startCC } = this.parent;
      return isBefore(startCC, value);
    }),
  coefficient: Yup.number().min(0, 'Hệ số giờ làm phải là một số không âm').required('Bắt buộc phải nhập hệ số giờ làm'),
  branchIds: Yup.array()
    .of(Yup.number())
    .required('Bắt buộc chọn chi nhánh')
    .test('empty string', 'Phải chọn chi nhánh', function (value) {
      return value ? value.length > 0 : false;
    }),

  operateLoop: Yup.array()
    .of(Yup.number())
    .required('Bắt buộc chọn thời gian làm việc')
    .test('not choose', 'Phải chọn thời gian làm việc', function (value) {
      return value ? value.length > 0 : false;
    }),
  typeCC: Yup.string()
    .required('Bắt buộc chọn hình thức điểm danh')
    .test('not equal 0', 'Bắt buộc chọn hình thức điểm danh', function (value) {
      return value !== '0';
    }),
});

//Holiday
export const SettingHolidayInfoSchema = Yup.object().shape({
  title: Yup.string().required('Bắt buộc nhập vào tiêu đề của ngày lễ'),
  startDate: Yup.date().required('Ngày bắt đầu không được bỏ trống'),
  endDate: Yup.date().required('Ngày kết thúc không được bỏ trống'),
  coefficient: Yup.number().min(0, 'Hệ số giờ làm phải là một số không âm').required('Bắt buộc phải nhập hệ số giờ làm'),
});

export const SettingHolidayLimitSchema = Yup.object().shape({
  total: Yup.number()
    .integer('Số ngày đề xuất tối đa là một số nguyên')
    .min(0, 'Số ngày đề xuất tối đa là một số không âm')
    .required('Bắt buộc phải nhập số ngày đề  xuất tối đa'),
});

//Position
export const SettingPositionInfoSchema = Yup.object().shape({
  shortname: Yup.string().required('Nhập mã của vị trí'),
  name: Yup.string().required('Bắt buộc nhập vào tên vị trí'),
  branchId: Yup.string().test('empty string', 'Phải chọn chi nhánh', function (value) {
    return value !== '0';
  }),
  departmentId: Yup.string().test('empty string', 'Phải chọn phòng ban', function (value) {
    return value !== '0';
  }),
  academicLevel: Yup.string().test('empty string', 'Phải chọn trình độ cho vị trí', function (value) {
    return value !== '0';
  }),
  expYear: Yup.number().required('Nhập vào năm kinh nghiệm').min(0, 'Năm kinh nghiệm là một số không âm'),
});

//Branch
export const SettingBranchInfoSchema = Yup.object().shape({
  shortname: Yup.string().required('Bắt buộc nhập vào mã chi nhánh'),
  name: Yup.string().required('Bắt buộc nhập vào tên của chi nhánh'),
  ipRouter: Yup.string().matches(getRegexExpression(VALIDATION_TYPE.IP_V4_ADDRESS), 'Địa chỉ IP không hợp lệ.'),
  address: Yup.string(),
  note: Yup.string(),
});

//Department
export const SettingDepartmentInfoSchema = Yup.object().shape({
  shortname: Yup.string().required('Bắt buộc nhập vào mã phòng ban'),
  name: Yup.string().required('Bắt buộc nhập vào tên phòng ban'),
  branchId: Yup.string().test('empty string', 'Phải chọn chi nhánh', function (value) {
    return value !== '0';
  }),
  note: Yup.string().required('Ghi chú không được bỏ trống'),
});
