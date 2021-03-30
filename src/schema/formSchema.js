import * as Yup from 'yup';
import { getRegexExpression, VALIDATION_TYPE } from 'src/utils/validationUtils';
import moment from 'moment';

const VALIDATION_STRING = {
  NOT_EMPTY: 'Not empty',
};
//SETTING
//General Information
export const SettingGeneralInfoSchema = Yup.object().shape({
  name: Yup.string().trim().required('validation.required_enter_company_name'),
  phone: Yup.string()
    .matches(getRegexExpression(VALIDATION_TYPE.PHONE_NUMBER), 'validation.enter_valid_phone_number')
    .required('validation.required_enter_phone_number'),
  email: Yup.string().email('validation.enter_valid_email').required('validation.required_enter_email'),
  address: Yup.string().trim(),
  taxCode: Yup.string(),
  provinceId: Yup.number(),
  districtId: Yup.number(),
  wardId: Yup.number(),
});

//Shift
const isBefore = (startTime, endTime) => {
  return moment(startTime, 'HH:mm').isBefore(moment(endTime, 'HH:mm'));
};
export const SettingShiftInfoSchema = Yup.object().shape({
  name: Yup.string().required('validation.required_enter_shift_name'),
  startCC: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_checkin_time', function (value) {
    return !!value;
  }),
  endCC: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_checkout_time', function (value) {
      return !!value;
    })
    .test('end_time_test', 'validation.checkout_time_must_be_greater_than_checkin_time', function (value) {
      const { startCC } = this.parent;
      return isBefore(startCC, value);
    }),
  coefficient: Yup.number()
    .min(0, 'validation.working_time_coefficient_must_not_be_negative')
    .required('validation.required_enter_working_time_coefficient'),
  branchIds: Yup.array()
    .of(Yup.number())
    .required('validation.required_select_branch_id')
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_branch_id', function (value) {
      return value ? value.length > 0 : false;
    }),

  operateLoop: Yup.array()
    .of(Yup.number())
    .required('validation.required_select_operator_loop')
    .test('not choose', 'validation.required_select_operator_loop', function (value) {
      return value ? value.length > 0 : false;
    }),
  typeCC: Yup.string()
    .required('Bắt buộc chọn hình thức điểm danh')
    .test('not equal 0', 'validation.required_select_roll_call', function (value) {
      return value !== '0';
    }),
});

//Holiday
export const SettingHolidayInfoSchema = Yup.object().shape({
  title: Yup.string().required('validation.required_enter_holiday_title'),
  startDate: Yup.date().required('validation.required_select_start_date'),
  endDate: Yup.date().required('validation.required_select_end_date'),
  coefficient: Yup.number()
    .min(0, 'validation.working_time_coefficient_must_not_be_negative')
    .required('validation.required_enter_working_time_coefficient'),
});

export const SettingHolidayLimitSchema = Yup.object().shape({
  total: Yup.number()
    .integer('validation.total_proposal_day_must_be_integer"')
    .min(0, 'validation.total_proposal_day_must_not_be_negative')
    .required('validation.required_enter_total_proposal_day'),
});

//Position
export const SettingPositionInfoSchema = Yup.object().shape({
  name: Yup.string().required('validation.required_enter_position_name'),
  branchId: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_branch_id', function (value) {
    return value !== '0';
  }),
  departmentId: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_department_id', function (value) {
    return value !== '0';
  }),
  academicLevel: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_academic_level', function (value) {
    return value !== '0';
  }),
  expYear: Yup.number().required('validation.required_enter_experience_year').min(0, 'validation.experience_year_must_not_be_negative'),
});

//Branch
export const SettingBranchInfoSchema = Yup.object().shape({
  name: Yup.string().required('validation.required_enter_branch_name'),
  ipRouter: Yup.string().matches(getRegexExpression(VALIDATION_TYPE.IP_V4_ADDRESS), 'validation.enter_valid_ip_v4_address'),
  address: Yup.string(),
});

//Department
export const SettingDepartmentInfoSchema = Yup.object().shape({
  name: Yup.string().required('validation.required_enter_department_name'),
  branchId: Yup.string().test('empty string', 'validation.required_select_branch_id', function (value) {
    return value !== '0';
  }),
});
//Account
export const AccountCreateInfoSchema = Yup.object().shape({
  username: Yup.string().required('validation.required_enter_usename'),
  password: Yup.string().test('empty string', 'validation.password_length_must_be_greater_than_6', function (value) {
    return value ? value.length > 5 : false;
  }),
  email: Yup.string().email('validation.enter_valid_email').required('validation.required_enter_email'),
  phone: Yup.string().matches(getRegexExpression(VALIDATION_TYPE.PHONE_NUMBER), 'validation.enter_valid_phone_number'),
  roleId: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_role_id', function (value) {
    return value !== '0';
  }),
});
export const AccountUpdateInfoSchema = Yup.object().shape({
  username: Yup.string().required('validation.required_enter_usename'),
  password: Yup.string(),
  email: Yup.string().email('validation.enter_valid_email').required('validation.required_enter_email'),
  phone: Yup.string().matches(getRegexExpression(VALIDATION_TYPE.PHONE_NUMBER), 'validation.enter_valid_phone_number'),
  roleId: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_role_id', function (value) {
    return value !== '0';
  }),
});
export const RoleInfoSchema = Yup.object().shape({
  name: Yup.string().required('validation.required_enter_role_name'),
});

export const BasicInfoCreateSchema = Yup.object().shape({
  firstname: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_enter_firstname', function (value) {
      return value && value.length;
    })
    .required('validation.required_enter_firstname'),
  lastname: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_enter_lastname', function (value) {
      return value && value.length;
    })
    .required('validation.required_enter_lastname'),
  phone: Yup.string().matches(getRegexExpression(VALIDATION_TYPE.PHONE_NUMBER), 'validation.enter_valid_phone_number'),
  email: Yup.string().email('validation.enter_valid_email').required('validation.required_enter_email'),
  gender: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_gender', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_gender'),
});

export const JobTimelineSchema = Yup.object().shape({
  contractInfo: Yup.array().of(
    Yup.object().shape({
      code: Yup.string().required('validation.required_contract_code'),
      fullname: Yup.string().min(1, 'validation.required_enter_contract_full_name').required('validation.required_enter_contract_full_name'),
      type: Yup.string()
        .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_type', function (value) {
          return value !== '0';
        })
        .required('validation.required_select_contract_type'),
      typeTax: Yup.string()
        .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_type_tax', function (value) {
          return value !== '0';
        })
        .required('validation.required_select_contract_type_tax'),
      typeWork: Yup.string()
        .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_type_work', function (value) {
          return value !== '0';
        })
        .required('validation.required_select_contract_type_work'),
      probTime: Yup.number()
        .positive('validation.required_positive_prob_time')
        .integer('validation.required_integer_prob_time')
        .required('validation.required_enter_prob_time'),
      handleDate: Yup.string().required('validation.required_select_contract_handle_date'),
      validDate: Yup.string().required('validation.required_select_contract_valid_date'),
      expiredDate: Yup.string().required('validation.required_select_contract_expired_date'),
      startWork: Yup.string().required('Bắt buộc chọn ngày bắt đầu làm việc'),
      paymentType: Yup.string()
        .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_payment', function (value) {
          return value !== '0';
        })
        .required('validation.required_select_contract_payment'),
      wageId: Yup.string()
        .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_wage', function (value) {
          return value !== '0';
        })
        .required('validation.required_select_contract_wage'),
      allowance: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_allowance', function (value) {
              return value !== '0';
            })
            .required('validation.required_select_allowance'),
        }),
      ),
    }),
  ),
});
export const ContactSchema = Yup.object().shape({
  type: Yup.string()
    .required('validation.required_select_contact_type')
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contact_type', function (value) {
      return value && value !== '' && value !== 0;
    }),
  url: Yup.string()
    .required('validation.required_enter_contact_url')
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_enter_contact_url', function (value) {
      return value && value !== '';
    }),
});
