import * as Yup from 'yup';
import { getRegexExpression, VALIDATION_TYPE } from 'src/utils/validationUtils';
import { isBeforeTypeHour, isSameBeforeTypeDate } from 'src/utils/datetimeUtils';

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
      return isBeforeTypeHour(startCC, value);
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
  bssid: Yup.string().matches(getRegexExpression(VALIDATION_TYPE.BSS_ID), 'validation.enter_valid_ip_v4_address'),
  address: Yup.string(),
  typeCC: Yup.string()
    .required('Bắt buộc chọn hình thức điểm danh')
    .test('not equal 0', 'validation.required_select_roll_call', function (value) {
      return value !== '0';
    }),
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
  probTime: Yup.number()
    .positive('validation.required_positive_prob_time')
    .integer('validation.required_integer_prob_time')
    .required('validation.required_enter_prob_time'),
  probPayRates: Yup.number()
    .positive('validation.required_positive_prob_pay_rates')
    .integer('validation.required_integer_prob_pay_rates')
    .required('validation.required_enter_prob_pay_rates'),
  handleDate: Yup.string().required('validation.required_select_contract_handle_date'),
  validDate: Yup.string().required('validation.required_select_contract_valid_date'),
  startWork: Yup.string().required('Bắt buộc chọn ngày bắt đầu làm việc'),
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
  paymentType: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_payment', function (value) {
      return value !== '0';
    })
    .when('type', {
      is: (value) => {
        return ['limitation', 'un_limitation'].includes(value);
      },
      then: Yup.string().required('validation.required_select_contract_payment'),
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
  probPay: Yup.number()
    .positive('validation.required_positive_prob_pay')
    .integer('validation.required_integer_prob_pay')
    .when('type', {
      is: (value) => {
        return value === 'season';
      },
      then: Yup.number().required('validation.required_enter_prob_pay'),
    }),
  allowances: Yup.array().of(
    Yup.object().shape({
      id: Yup.string()
        .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_allowance', function (value) {
          return value !== '0';
        })
        .required('validation.required_select_allowance'),
    }),
  ),
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
      allowances: Yup.array().of(
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
  from: Yup.string().required('validation.required_select_start_date'),
  to: Yup.string()
    .test('end_time_test', 'validation.expired_date_must_be_great_than_start_date', function (value) {
      const { from } = this.parent;
      return isSameBeforeTypeDate(from, value);
    })
    .required('validation.required_select_end_date'),
});
export const HistoryWorkingsSchema = Yup.object().shape({
  histories: Yup.array().of(
    Yup.object().shape({
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
      to: Yup.string(), //.required('validation.required_select_end_date'),
    }),
  ),
});
export const WageSchema = Yup.object().shape({
  name: Yup.string().min(1, 'validation.required_enter_salary_group').required('validation.required_enter_salary_group'),
  type: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_payment', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_contract_payment'),
  amount: Yup.number()
    .integer('validation.salary_level_must_be_integer"')
    .min(0, 'validation.salary_level_must_not_be_negative')
    .required('validation.required_enter_salary_level'),
  dayOff: Yup.number()
    .integer('validation.dayOff_must_be_integer"')
    .min(0, 'validation.dayOff_must_not_be_negative')
    .required('validation.required_enter_dayOff'),
});
export const AllowanceSchema = Yup.object().shape({
  name: Yup.string().min(1, 'validation.required_enter_allowance_name').required('validation.required_enter_allowance_name'),
  amount: Yup.number()
    .integer('validation.allowance_level_must_be_integer"')
    .min(0, 'validation.allowance_level_must_not_be_negative')
    .required('validation.required_enter_allowance_level'),
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
  name: Yup.string().min(1, 'validation.required_enter_article_type').required('validation.required_enter_article_type'),
});

export const NewFieldContract = Yup.object().shape({
  name: Yup.string().min(1, 'validation.required_enter_field_name').required('validation.required_enter_field_name'),
  type: Yup.string().test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_field_type', function (value) {
    return value !== '0';
  }),
});

export const BenefitsSchema = Yup.object().shape({
  wageHistories: Yup.array().of(
    Yup.object().shape({
      type: Yup.string()
        .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_payment', function (value) {
          return value !== '0';
        })
        .required('validation.required_select_contract_payment'),
      wageId: Yup.string()
        .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_contract_wage', function (value) {
          return value !== '0';
        })
        .required('validation.required_select_contract_wage'),

      allowances: Yup.array().of(
        Yup.object().shape({
          id: Yup.string()
            .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_allowance', function (value) {
              return value !== '0';
            })
            .required('validation.required_select_allowance'),
        }),
      ),
      startDate: Yup.string().required('validation.required_select_contract_handle_date'),
      expiredDate: Yup.string().test('end_time_test', 'validation.expired_date_must_be_greater_than_handle_date', function (value) {
        const { startDate } = this.parent;
        return isSameBeforeTypeDate(startDate, value);
      }),
    }),
  ),
});
export const NewTaskSchedule = Yup.object().shape({
  shiftId: Yup.string()
    .test(VALIDATION_STRING.NOT_EMPTY, 'validation.required_select_shift', function (value) {
      return value !== '0';
    })
    .required('validation.required_select_shift'),
  start: Yup.string().required('validation.required_select_start_time'),
  end: Yup.string().required('validation.required_select_end_time'),
});
