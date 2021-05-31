import { isBeforeTypeHour, isSameBeforeTypeDate } from 'src/utils/datetimeUtils';
import { getRegexExpression, VALIDATION_TYPE } from 'src/utils/validationUtils';
import * as Yup from 'yup';

const VALIDATION_STRING = {
  NOT_EMPTY: 'Not empty',
};
//SETTING
//General Information
Yup.addMethod(Yup.array, 'unique', function (message, mapper = (a) => a) {
  return this.test('unique', message, function (list) {
    return list.length === new Set(list.map(mapper)).size;
  });
});

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

export const SettingShiftInfoSchema = Yup.object().shape({
  code: Yup.string().min(1, 'validation.required_enter_shift_code').required('validation.required_enter_shift_code'),
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
      return isBeforeTypeHour(startCC, value);
    }),
  coefficient: Yup.number()
    .min(0, 'validation.working_time_coefficient_must_not_be_negative')
    .required('validation.required_enter_working_time_coefficient'),
  overtimeCoefficient: Yup.number()
    .min(0, 'validation.working_time_overtime_coefficient_must_not_be_negative')
    .required('validation.required_enter_working_time_overtime_coefficient'),
  expected: Yup.number().min(0, 'validation.minimum_work_time_must_not_be_negative').required('validation.required_enter_minimum_work_time'),
  flexibleTime: Yup.number().min(0, 'validation.flexible_time_must_not_be_negative').required('validation.required_enter_flexible_time'),
  minPoint: Yup.number().min(0, 'validation.min_point_must_not_be_negative').required('validation.required_enter_min_point'),
  branchId: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_branch_id', function (value) {
    return value !== '0';
  }),
  operateLoop: Yup.array()
    .of(Yup.number())
    .required('validation.required_select_operator_loop')
    .test('not choose', 'validation.required_select_operator_loop', function (value) {
      return value ? value.length > 0 : false;
    }),
});

//Holiday
export const SettingHolidayInfoSchema = Yup.object().shape({
  code: Yup.string().min(1, 'validation.required_enter_holiday_code').required('validation.required_enter_holiday_code'),
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
  code: Yup.string().min(1, 'validation.required_enter_position_code').required('validation.required_enter_position_code'),
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
//TODO
//Branch
export const SettingBranchInfoSchema = Yup.object().shape({
  code: Yup.string().min(1, 'validation.required_enter_branch_code').required('validation.required_enter_branch_code'),
  name: Yup.string().required('validation.required_enter_branch_name'),
  bssid: Yup.string()
    .matches(getRegexExpression(VALIDATION_TYPE.BSS_ID), 'validation.enter_valid_ip_v4_address')
    .when('typeCC', {
      is: (value) => {
        return ['WIFI'].includes(value);
      },
      then: Yup.string().required('validation.required_enter_bssid'),
    }),
  address: Yup.string(),
  typeCC: Yup.string()
    .required('validation.required_select_roll_call')
    .test('not equal 0', 'validation.required_select_roll_call', function (value) {
      return value !== '0';
    }),
});

//Department
export const SettingDepartmentInfoSchema = Yup.object().shape({
  code: Yup.string().min(1, 'validation.required_enter_department_code').required('validation.required_enter_department_code'),
  name: Yup.string().required('validation.required_enter_department_name'),
  branchId: Yup.string().test('empty string', 'validation.required_select_branch_id', function (value) {
    return value !== '0';
  }),
});
//Account
export const AccountCreateInfoSchema = Yup.object().shape({
  code: Yup.string().min(1, 'validation.required_enter_account_code').required('validation.required_enter_account_code'),
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
  code: Yup.string().min(1, 'validation.required_enter_role_code').required('validation.required_enter_role_code'),
  name: Yup.string().required('validation.required_enter_role_name'),
});

export const BasicInfoCreateSchema = Yup.object().shape({
  code: Yup.string().min(1, 'validation.required_enter_employee_code').required('validation.required_enter_employee_code'),
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
  phone: Yup.string()
    .min(8, 'validation.min_length_phone_number')
    .max(13, 'validation.max_length_phone_number')
    .matches(getRegexExpression(VALIDATION_TYPE.PHONE_NUMBER), 'validation.enter_valid_phone_number')
    .required('validation.required_enter_phone_number'),
  email: Yup.string().email('validation.enter_valid_email').required('validation.required_enter_email'),
  gender: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_gender', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_gender'),
  passportIssuedDate: Yup.string(),
  passportExpiredDate: Yup.string().test('end_time_test', 'validation.expired_date_must_be_great_issued_start_date', function (value) {
    const { passportIssuedDate } = this.parent;
    if (passportIssuedDate) return isSameBeforeTypeDate(passportIssuedDate, value);
    else return true;
  }),
});

export const NewContractSchema = Yup.object().shape({
  code: Yup.string().min(1, 'validation.required_enter_contract_full_name').required('validation.required_contract_code'),
  fullname: Yup.string().min(1, 'validation.required_enter_contract_full_name').required('validation.required_enter_contract_full_name'),
  type: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_type', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_contract_type'),
  typeTax: Yup.string()
    .when('type', {
      is: (value) => {
        return ['un_limitation', 'limitation'].includes(value);
      },
      then: Yup.string().required('validation.required_select_contract_type_tax'),
    })
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_type_tax', function (value) {
      return value !== '0';
    }),
  status: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_status', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_contract_status'),
  handleDate: Yup.string().required('validation.required_select_contract_handle_date'),
  validDate: Yup.string().required('validation.required_select_contract_valid_date'),
  startWork: Yup.string().required('validation.required_select_start_work'),
  expiredDate: Yup.string()
    .when('type', {
      is: (value) => {
        return value === 'limitation';
      },
      then: Yup.string().required('validation.required_select_contract_expired_date'),
    })
    .test('end_time_test', 'validation.expired_date_must_be_greater_than_handle_date', function (value) {
      const { handleDate } = this.parent;
      return isSameBeforeTypeDate(handleDate, value);
    })
    .test('end_time_test', 'validation.expired_date_must_be_greater_than_valid_date', function (value) {
      const { validDate } = this.parent;
      return isSameBeforeTypeDate(validDate, value);
    })
    .test('end_time_test', 'validation.expired_date_must_be_greater_than_start_work', function (value) {
      const { startWork } = this.parent;
      return isSameBeforeTypeDate(startWork, value);
    }),
  formOfPayment: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_payment', function (value) {
      return value !== '0';
    })
    .when('type', {
      is: (value) => {
        return ['limitation', 'un_limitation'].includes(value);
      },
      then: Yup.string().required('validation.required_select_contract_payment'),
    }),
  standardHours: Yup.number().when('formOfPayment', {
    is: (value) => {
      return ['by_month'].includes(value);
    },
    then: Yup.number()
      .positive('validation.required_positive_standard_hours')
      .integer('validation.required_integer_standard_hours')
      .required('validation.required_enter_standard_hours'),
  }),
  wageId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_wage', function (value) {
      return value !== '0';
    })
    .when('type', {
      is: (value) => {
        return ['limitation', 'un_limitation'].includes(value);
      },
      then: Yup.string().required('validation.required_select_contract_wage'),
    }),
  dayOff: Yup.number()
    .integer('validation.dayOff_must_be_integer')
    .min(0, 'validation.dayOff_must_not_be_negative')
    .when('type', {
      is: (value) => {
        return ['limitation', 'un_limitation'].includes(value);
      },
      then: Yup.number().required('validation.required_enter_dayOff'),
    }),
  dependant: Yup.number()
    .integer('validation.dependant_must_be_integer')
    .min(0, 'validation.dependant_must_not_be_negative')
    .when('type', {
      is: (value) => {
        return ['limitation', 'un_limitation'].includes(value);
      },
      then: Yup.number().required('validation.required_enter_dependant'),
    }),

  seasonWage: Yup.number().when('type', {
    is: (value) => {
      return value === 'season';
    },
    then: Yup.number()
      .positive('validation.required_positive_prob_pay')
      .integer('validation.required_integer_prob_pay')
      .required('validation.required_enter_prob_pay'),
  }),
  allowances: Yup.array().of(
    Yup.object()
      .shape({
        id: Yup.string()
          .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_allowance', function (value) {
            return value !== '0';
          })
          .required('validation.required_select_allowance'),
      })
      .test('unique', 'validation.duplicate_allowance', function validateUnique(currentAllowance) {
        const otherAllowance = this.parent.filter((allowance) => allowance !== currentAllowance);

        const isDuplicate = otherAllowance.some((otherAllowance) => otherAllowance.id === currentAllowance.id);

        return isDuplicate ? this.createError({ path: `${this.path}.id` }) : true;
      }),
  ),
});

export const NewContractSchemaWithProfileID = Yup.object().shape({
  profileId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_profile_id', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_profile_id'),
  code: Yup.string().min(1, 'validation.required_enter_contract_full_name').required('validation.required_contract_code'),
  fullname: Yup.string().min(1, 'validation.required_enter_contract_full_name').required('validation.required_enter_contract_full_name'),
  type: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_type', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_contract_type'),
  typeTax: Yup.string()
    .when('type', {
      is: (value) => {
        return ['un_limitation', 'limitation'].includes(value);
      },
      then: Yup.string().required('validation.required_select_contract_type_tax'),
    })
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_type_tax', function (value) {
      return value !== '0';
    }),
  status: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_status', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_contract_status'),
  handleDate: Yup.string().required('validation.required_select_contract_handle_date'),
  validDate: Yup.string().required('validation.required_select_contract_valid_date'),
  startWork: Yup.string().required('validation.required_select_start_work'),
  expiredDate: Yup.string()
    .when('type', {
      is: (value) => {
        return value === 'limitation';
      },
      then: Yup.string().required('validation.required_select_contract_expired_date'),
    })
    .test('end_time_test', 'validation.expired_date_must_be_greater_than_handle_date', function (value) {
      const { handleDate } = this.parent;
      return isSameBeforeTypeDate(handleDate, value);
    })
    .test('end_time_test', 'validation.expired_date_must_be_greater_than_valid_date', function (value) {
      const { validDate } = this.parent;
      return isSameBeforeTypeDate(validDate, value);
    })
    .test('end_time_test', 'validation.expired_date_must_be_greater_than_start_work', function (value) {
      const { startWork } = this.parent;
      return isSameBeforeTypeDate(startWork, value);
    }),
  formOfPayment: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_payment', function (value) {
      return value !== '0';
    })
    .when('type', {
      is: (value) => {
        return ['limitation', 'un_limitation'].includes(value);
      },
      then: Yup.string().required('validation.required_select_contract_payment'),
    }),
  standardHours: Yup.number().when('formOfPayment', {
    is: (value) => {
      return ['by_month'].includes(value);
    },
    then: Yup.number()
      .positive('validation.required_positive_standard_hours')
      .integer('validation.required_integer_standard_hours')
      .required('validation.required_enter_standard_hours'),
  }),
  wageId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_wage', function (value) {
      return value !== '0';
    })
    .when('type', {
      is: (value) => {
        return ['limitation', 'un_limitation'].includes(value);
      },
      then: Yup.string().required('validation.required_select_contract_wage'),
    }),
  dayOff: Yup.number()
    .integer('validation.dayOff_must_be_integer')
    .min(0, 'validation.dayOff_must_not_be_negative')
    .when('type', {
      is: (value) => {
        return ['limitation', 'un_limitation'].includes(value);
      },
      then: Yup.number().required('validation.required_enter_dayOff'),
    }),
  dependant: Yup.number()
    .integer('validation.dependant_must_be_integer')
    .min(0, 'validation.dependant_must_not_be_negative')
    .when('type', {
      is: (value) => {
        return ['limitation', 'un_limitation'].includes(value);
      },
      then: Yup.number().required('validation.required_enter_dependant'),
    }),

  seasonWage: Yup.number().when('type', {
    is: (value) => {
      return value === 'season';
    },
    then: Yup.number()
      .positive('validation.required_positive_prob_pay')
      .integer('validation.required_integer_prob_pay')
      .required('validation.required_enter_prob_pay'),
  }),
  allowances: Yup.array().of(
    Yup.object()
      .shape({
        id: Yup.string()
          .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_allowance', function (value) {
            return value !== '0';
          })
          .required('validation.required_select_allowance'),
      })
      .test('unique', 'validation.duplicate_allowance', function validateUnique(currentAllowance) {
        const otherAllowance = this.parent.filter((allowance) => allowance !== currentAllowance);

        const isDuplicate = otherAllowance.some((otherAllowance) => otherAllowance.id === currentAllowance.id);

        return isDuplicate ? this.createError({ path: `${this.path}.id` }) : true;
      }),
  ),
});
export const EditContractSchemaWithProfileID = Yup.object().shape({
  fullname: Yup.string().min(1, 'validation.required_enter_contract_full_name').required('validation.required_enter_contract_full_name'),
  type: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_type', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_contract_type'),
  typeTax: Yup.string()
    .when('type', {
      is: (value) => {
        return ['un_limitation', 'limitation'].includes(value);
      },
      then: Yup.string().required('validation.required_select_contract_type_tax'),
    })
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_type_tax', function (value) {
      return value !== '0';
    }),
  status: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_status', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_contract_status'),
  handleDate: Yup.string().required('validation.required_select_contract_handle_date'),
  validDate: Yup.string().required('validation.required_select_contract_valid_date'),
  startWork: Yup.string().required('validation.required_select_start_work'),
  expiredDate: Yup.string()
    .when('type', {
      is: (value) => {
        return value === 'limitation';
      },
      then: Yup.string().required('validation.required_select_contract_expired_date'),
    })
    .test('end_time_test', 'validation.expired_date_must_be_greater_than_handle_date', function (value) {
      const { handleDate } = this.parent;
      return isSameBeforeTypeDate(handleDate, value);
    })
    .test('end_time_test', 'validation.expired_date_must_be_greater_than_valid_date', function (value) {
      const { validDate } = this.parent;
      return isSameBeforeTypeDate(validDate, value);
    })
    .test('end_time_test', 'validation.expired_date_must_be_greater_than_start_work', function (value) {
      const { startWork } = this.parent;
      return isSameBeforeTypeDate(startWork, value);
    }),
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
export const NewDegreeSchema = Yup.object().shape({
  level: Yup.string()
    .required('validation.required_select_academic_level')
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_academic_level', function (value) {
      return value && value !== '' && value !== '0';
    }),
  name: Yup.string()
    .required('validation.required_enter_academic_name')
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_enter_academic_name', function (value) {
      return value && value !== '';
    }),
  issuedPlace: Yup.string()
    .required('validation.required_enter_academic_provincedId')
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_enter_academic_provincedId', function (value) {
      return value && value !== '';
    }),
  issuedDate: Yup.string().required('validation.required_select_academic_issuedDate'),
});

export const NewCertificateSchema = Yup.object().shape({
  name: Yup.string()
    .required('validation.required_enter_academic_name')
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_enter_academic_name', function (value) {
      return value && value !== '';
    }),
  issuedDate: Yup.string().required('validation.required_select_academic_issuedDate'),
  expiredDate: Yup.string().test('end_time_test', 'validation.expired_date_must_be_great_issued_start_date', function (value) {
    const { issuedDate } = this.parent;
    return isSameBeforeTypeDate(issuedDate, value);
  }),
});
export const CertificatesSchema = Yup.object().shape({
  certificates: Yup.array().of(
    Yup.object().shape({
      name: Yup.string()
        .required('validation.required_enter_academic_name')
        .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_enter_academic_name', function (value) {
          return value && value !== '';
        }),
      issuedDate: Yup.string().required('validation.required_select_academic_issuedDate'),
    }),
  ),
});
export const NewHistoryWorkingSchema = Yup.object().shape({
  branchId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_branch_id', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_branch_id'),
  departmentId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_department_id', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_department_id'),
  positionId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_position', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_position'),
  status: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_history_working_status', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_history_working_status'),
  from: Yup.string().required('validation.required_select_start_date'),
  to: Yup.string().test('end_time_test', 'validation.expired_date_must_be_great_than_start_date', function (value) {
    const { from } = this.parent;
    return isSameBeforeTypeDate(from, value);
  }),
});
export const HistoryWorkingsSchema = Yup.object().shape({
  branchId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_branch_id', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_branch_id'),
  departmentId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_department_id', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_department_id'),
  positionId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_position', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_position'),
  from: Yup.string().required('validation.required_select_start_date'),
  to: Yup.string().test('end_time_test', 'validation.expired_date_must_be_great_than_start_date', function (value) {
    const { from } = this.parent;
    return isSameBeforeTypeDate(from, value);
  }),
});
export const WageSchema = Yup.object().shape({
  code: Yup.string().min(1, 'validation.required_enter_wage_code').required('validation.required_enter_wage_code'),
  name: Yup.string().min(1, 'validation.required_enter_salary_group').required('validation.required_enter_salary_group'),
  type: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_payment', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_contract_payment'),
  amount: Yup.number()
    .integer('validation.salary_level_must_be_integer')
    .min(0, 'validation.salary_level_must_not_be_negative')
    .required('validation.required_enter_salary_level'),
});
export const AllowanceSchema = Yup.object().shape({
  code: Yup.string().min(1, 'validation.required_enter_allowance_code').required('validation.required_enter_allowance_code'),
  name: Yup.string().min(1, 'validation.required_enter_allowance_name').required('validation.required_enter_allowance_name'),
  amount: Yup.number()
    .integer('validation.allowance_level_must_be_integer"')
    .min(0, 'validation.allowance_level_must_not_be_negative')
    .required('validation.required_enter_allowance_level'),
  type: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_allowance_type', function (value) {
      return value !== '';
    })
    .required('validation.required_select_allowance_type'),
  bound: Yup.number()
    .integer('validation.allowance_bound_must_be_integer')
    .min(0, 'validation.allowance_bound_must_not_be_negative')
    .when('type', {
      is: (value) => {
        return ['partial_tax'].includes(value);
      },
      then: Yup.number().required('validation.required_enter_allowance_bound'),
    }),
});
export const NotificationSchema = Yup.object().shape({
  title: Yup.string().min(1, 'validation.required_enter_notification_title').required('validation.required_enter_notification_title'),
  typeId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_notification_type', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_notification_type'),
});
export const ArticleTypeSchema = Yup.object().shape({
  code: Yup.string().min(1, 'validation.required_enter_article_type_code').required('validation.required_enter_article_type_code'),
  name: Yup.string().min(1, 'validation.required_enter_article_type').required('validation.required_enter_article_type'),
});

export const NewFieldContract = Yup.object().shape({
  code: Yup.string().min(1, 'validation.required_enter_contract_field_code').required('validation.required_enter_contract_field_code'),
  name: Yup.string().min(1, 'validation.required_enter_field_name').required('validation.required_enter_field_name'),
  type: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_field_type', function (value) {
    return value !== '0';
  }),
});

export const BenefitsSchema = Yup.object().shape({
  profileId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_profile_id', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_profile_id'),
  contractId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_id', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_contract_id'),
  code: Yup.string().min(1, 'validation.required_enter_benefit_code').required('validation.required_enter_benefit_code'),
  contractType: Yup.string(),
  type: Yup.string()
    .when('contractType', {
      is: (value) => {
        return !['season'].includes(value);
      },
      then: Yup.string().required('validation.required_select_contract_payment'),
    })
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_payment', function (value) {
      return value !== '0';
    }),
  status: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_benefit_status', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_benefit_status'),
  wageId: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_wage', function (value) {
    return value !== '0';
  }),
  allowances: Yup.array().of(
    Yup.object()
      .shape({
        id: Yup.string()
          .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_allowance', function (value) {
            return value !== '0';
          })
          .required('validation.required_select_allowance'),
      })
      .test('unique', 'validation.duplicate_allowance', function validateUnique(currentAllowance) {
        const otherAllowance = this.parent.filter((allowance) => allowance !== currentAllowance);

        const isDuplicate = otherAllowance.some((otherAllowance) => otherAllowance.id === currentAllowance.id);

        return isDuplicate ? this.createError({ path: `${this.path}.id` }) : true;
      }),
  ),
  startDate: Yup.string().required('validation.required_select_contract_handle_date'),
  expiredDate: Yup.string().test('end_time_test', 'validation.expired_date_must_be_greater_than_handle_date', function (value) {
    const { startDate } = this.parent;
    if (!value) return true;
    return isSameBeforeTypeDate(startDate, value);
  }),
});
export const NewActiveBenefitSchema = Yup.object().shape({
  profileId: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_profile_id', function (value) {
    return value !== '0';
  }),
  contractId: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_id', function (value) {
    return value !== '0';
  }),
  code: Yup.string().min(1, 'validation.required_enter_benefit_code').required('validation.required_enter_benefit_code'),
  contractType: Yup.string(),
  type: Yup.string()
    .when('contractType', {
      is: (value) => {
        return !['season'].includes(value);
      },
      then: Yup.string().required('validation.required_select_contract_payment'),
    })
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_payment', function (value) {
      return value !== '0';
    }),
  status: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_benefit_status', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_benefit_status'),
  wageId: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_wage', function (value) {
    return value !== '0';
  }),
  allowances: Yup.array().of(
    Yup.object()
      .shape({
        id: Yup.string()
          .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_allowance', function (value) {
            return value !== '0';
          })
          .required('validation.required_select_allowance'),
      })
      .test('unique', 'validation.duplicate_allowance', function validateUnique(currentAllowance) {
        const otherAllowance = this.parent.filter((allowance) => allowance !== currentAllowance);

        const isDuplicate = otherAllowance.some((otherAllowance) => otherAllowance.id === currentAllowance.id);

        return isDuplicate ? this.createError({ path: `${this.path}.id` }) : true;
      }),
  ),
  startDate: Yup.string().required('validation.required_select_contract_handle_date'),
  expiredDate: Yup.string().test('end_time_test', 'validation.expired_date_must_be_greater_than_handle_date', function (value) {
    const { startDate } = this.parent;
    if (!value) return true;
    return isSameBeforeTypeDate(startDate, value);
  }),
});
export const UpdateBenefitsSchema = Yup.object().shape({
  profileId: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_profile_id', function (value) {
    return value !== '0';
  }),
  contractId: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_id', function (value) {
    return value !== '0';
  }),
  code: Yup.string().min(1, 'validation.required_enter_benefit_code'),
  status: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_benefit_status', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_benefit_status'),
  type: Yup.string()
    .when('wageId', {
      is: (value) => {
        return ![undefined, null, '', '0'].includes(value);
      },
      then: Yup.string().required('validation.required_select_contract_payment'),
    })
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_payment', function (value) {
      return value !== '0';
    }),
  wageId: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_wage', function (value) {
    return value !== '0';
  }),
  amount: Yup.number()
    .when('wageId', {
      is: (value) => {
        return [undefined, null, '', '0'].includes(value);
      },
      then: Yup.number().required('validation.required_enter_salary_level'),
    })
    .integer('validation.salary_level_must_be_integer')
    .min(0, 'validation.salary_level_must_not_be_negative'),
  allowances: Yup.array().of(
    Yup.object()
      .shape({
        id: Yup.string()
          .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_allowance', function (value) {
            return value !== '0';
          })
          .required('validation.required_select_allowance'),
      })
      .test('unique', 'validation.duplicate_allowance', function validateUnique(currentAllowance) {
        const otherAllowance = this.parent.filter((allowance) => allowance !== currentAllowance);

        const isDuplicate = otherAllowance.some((otherAllowance) => otherAllowance.id === currentAllowance.id);

        return isDuplicate ? this.createError({ path: `${this.path}.id` }) : true;
      }),
  ),
  startDate: Yup.string().required('validation.required_select_contract_handle_date'),
  expiredDate: Yup.string().test('end_time_test', 'validation.expired_date_must_be_greater_than_handle_date', function (value) {
    const { startDate } = this.parent;
    if (!value) return true;
    return isSameBeforeTypeDate(startDate, value);
  }),
});
export const NewTaskSchedule = Yup.object().shape({
  shiftId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_shift', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_shift'),
  start: Yup.string(),
  end: Yup.string(),
  endTime: Yup.string(),
});

export const NewRollUpSchema = Yup.object().shape({
  startTime: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_checkin_time', function (value) {
    return !!value;
  }),
  endTime: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_checkout_time', function (value) {
      return !!value;
    })
    .test('end_time_test', 'validation.checkout_time_must_be_greater_than_checkin_time', function (value) {
      const { startTime } = this.parent;
      return isBeforeTypeHour(startTime, value);
    }),
});
export const NewOvertimeFormSchema = Yup.object().shape({
  code: Yup.string().min(1, 'validation.required_enter_overtime_code').required('validation.required_enter_overtime_code'),
  profileId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_profile_id', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_profile_id'),
  date: Yup.date().required('validation.required_select_overtime_date'),
  shiftId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_shift', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_shift'),
  status: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_leave_status', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_leave_status'),
});

export const NewRemoteFormSchema = Yup.object().shape({
  code: Yup.string().min(1, 'validation.required_enter_remote_code').required('validation.required_enter_remote_code'),
  profileId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_profile_id', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_profile_id'),
  assignments: Yup.array()
    .of(
      Yup.object()
        .shape({
          date: Yup.date().required('validation.required_select_leave_date'),
          id: Yup.string()
            .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_leave_assignment', function (value) {
              return value !== '0';
            })
            .required('validation.required_select_leave_assignment'),
        })
        .test('unique', 'validation.duplicate_assignment', function validateUnique(currentAssignment) {
          const otherAssignment = this.parent.filter((assignment) => assignment !== currentAssignment);

          const isDuplicate = otherAssignment.some((otherAssignment) => otherAssignment.id === currentAssignment.id);

          return isDuplicate ? this.createError({ path: `${this.path}.id` }) : true;
        }),
    )
    .min(1, 'validation.required_select_assignments'),
  // .unique('validation.duplicate_assignment', (a) => a.id),
  status: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_leave_status', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_leave_status'),
});

export const NewLeaveFormSchema = Yup.object().shape({
  code: Yup.string().min(1, 'validation.required_enter_leave_code').required('validation.required_enter_leave_code'),
  profileId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_profile_id', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_profile_id'),
  type: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_leave_type', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_leave_type'),
  assignments: Yup.array()
    .of(
      Yup.object()
        .shape({
          date: Yup.date().required('validation.required_select_leave_date'),
          id: Yup.string()
            .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_leave_assignment', function (value) {
              return value !== '0';
            })
            .required('validation.required_select_leave_assignment'),
        })
        .test('unique', 'validation.duplicate_assignment', function validateUnique(currentAssignment) {
          const otherAssignment = this.parent.filter((assignment) => assignment !== currentAssignment);

          const isDuplicate = otherAssignment.some((otherAssignment) => otherAssignment.id === currentAssignment.id);

          return isDuplicate ? this.createError({ path: `${this.path}.id` }) : true;
        }),
    )
    .min(1, 'validation.required_select_assignments'),
  // .unique('validation.duplicate_assignment', (a) => a.id),
  status: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_leave_status', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_leave_status'),
});

export const OtherFeeSchema = Yup.object().shape({
  code: Yup.string().min(1, 'validation.required_enter_fee_code').required('validation.required_enter_fee_code'),
  name: Yup.string().min(1, 'validation.required_enter_payment_name').required('validation.required_enter_payment_name'),
  type: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_payment_type', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_payment_type'),
  by: Yup.string()
    .when('type', {
      is: (value) => {
        return ['percent'].includes(value);
      },
      then: Yup.string().required('validation.required_select_payment_by'),
    })
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_payment_by', function (value) {
      return value !== '0';
    }),
  value: Yup.number()
    .min(0, 'validation.payment_value_must_not_be_negative')
    .when('type', {
      is: (value) => {
        return ['percent'].includes(value);
      },
      then: Yup.number().max(100, 'validation.payment_value_must_less_than_100'),
      otherwise: Yup.number().integer('validation.payment_value_must_be_integer'),
    })
    .required('validation.required_enter_payment_value'),
});
export const ExportWageSchema = Yup.object().shape({
  filename: Yup.string().min(1, 'validation.required_enter_file_name').required('validation.required_enter_file_name'),
  month: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_month', function (value) {
      return !!value;
    })
    .required('validation.required_select_month'),
});

export const FilterSchema = Yup.object().shape({
  rule: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_filter_rule', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_filter_rule'),
  op: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_filter_operator', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_filter_operator'),
  value: Yup.string().when('op', {
    is: (value) => {
      return ['=', 'autocomplete'].includes(value);
    },
    then: Yup.string().required('validation.required_select_filter_value'),
  }),
});

export const DateRange = Yup.object().shape({
  from: Yup.string().required('validation.required_select_start_date'),
  to: Yup.string()
    .test('end_time_test', 'validation.expired_date_must_be_great_than_start_date', function (value) {
      const { from } = this.parent;
      return isSameBeforeTypeDate(from, value);
    })
    .required('validation.required_select_end_date'),
});
export const SelectShift = Yup.object().shape({
  date: Yup.string().required('validation.required_select_date'),
  shiftId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_shift', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_shift'),
});
