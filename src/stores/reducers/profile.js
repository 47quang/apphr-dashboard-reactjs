import { getDateInput } from 'src/utils/datetimeUtils';
import { REDUX_STATE } from '../states';

const initialState = {
  profiles: [],
  profile: {
    id: 0,
    shortname: '',
    fullname: '',
    phone: '',
    dateOfBirth: '',
    email: '',
    gender: '',
    expYear: 0,
    branchId: 0,
    departmentId: 0,
    positionId: 0,
    avatar: '',
    have_id: false,
    cmnd: '',
    cmndIssuedDate: null,
    cmndProvinceId: null,
    have_passport: false,
    passport: '',
    passportIssuedDate: '',
    passport_end: '',
    passportProvinceId: null,
    firstname: '',
    lastname: '',
    permanentAddress: '',
    temporaryAddress: '',
    homeTown: '',
    status: '',
    manager: '',
    academicLevel: 'not_require',
    contracts: [
      {
        id: 1,
        isMinimize: false,
        isOpen: true,
        code: '',
        type: '',
        pTaxType: '',
        signee: '',
        typeWork: 0,
        probTime: 0,
        handleDate: '',
        validDate: '',
        expiredDate: '',
        branchId: 0,
        startWork: '',
        paymentType: 0,
        salaryGroup: 0,
        salary: 0,
        allowance: [],
        files: [],
      },
    ],
    degrees: [],
    newDegree: {
      level: '',
      name: '',
      issuedPlace: '',
      issuedDate: '',
      note: '',
      attaches: [],
    },
    certificates: [],
  },
  roles: [],
  contracts: [
    {
      id: 1,
      name: 'Hợp đồng A',
      code: 'A1212',
      type: 'Hợp đồng ngắn hạn',
      signDate: '2021-03-16T15:59:05.803',
      expirationDate: '2021-03-16T15:59:05.803',
      status: 'Hết hạn',
    },
    {
      id: 2,
      name: 'Hợp đồng B',
      code: 'A1234',
      type: 'Hợp đồng ngắn hạn',
      signDate: '2021-03-16T15:59:05.803',
      expirationDate: '2021-03-14T15:59:05.803',
      status: 'Hết hạn',
    },
    {
      id: 3,
      name: 'Hợp đồng C',
      code: 'A1235',
      type: 'Hợp đồng ngắn hạn',
      signDate: '2021-03-16T15:59:05.803',
      expirationDate: '2021-03-115T15:59:05.803',
      status: 'Hết hạn',
    },
    {
      id: 4,
      name: 'Hợp đồng D',
      code: 'A1236',
      type: 'Hợp đồng ngắn hạn',
      signDate: '2021-03-16T15:59:05.803',
      expirationDate: '2021-03-17T15:59:05.803',
      status: 'Hết hạn',
    },
    {
      id: 5,
      name: 'Hợp đồng E',
      code: 'A1231',
      type: 'Hợp đồng ngắn hạn',
      signDate: '2021-03-16T15:59:05.803',
      expirationDate: '2021-03-18T15:59:05.803',
      status: 'Hết hạn',
    },
    {
      id: 6,
      name: 'Hợp đồng F',
      code: 'A1230',
      type: 'Hợp đồng ngắn hạn',
      signDate: '2021-03-16T15:59:05.803',
      expirationDate: '2021-03-19T15:59:05.803',
      status: 'Còn hạn',
    },
  ],
  contract: {},
  historyWorking: [
    {
      id: 1,
      name: 'Yasuo',
      branch: 'APPHR Quận 1',
      department: 'IT',
      position: 'Front-end Dev',
      role: 'Lead Team Front-end',
      start: '2021-03-16T15:59:05.803',
      end: '2021-03-16T15:59:05.803',
      countDay: 30,
    },
    {
      id: 2,
      name: 'Yasuo',
      branch: 'APPHR Quận 2',
      department: 'IT',
      position: 'Front-end Dev',
      role: 'Lead Team Front-end',
      start: '2021-03-17T15:59:05.803',
      end: '2021-03-18T15:59:05.803',
      countDay: 30,
    },
    {
      id: 3,
      name: 'Yasuo',
      branch: 'APPHR Quận 3',
      department: 'IT',
      position: 'Front-end Dev',
      role: 'Lead Team Front-end',
      start: '2021-03-19T15:59:05.803',
      end: '2021-03-20T15:59:05.803',
      countDay: 30,
    },
    {
      id: 4,
      name: 'Yasuo',
      branch: 'APPHR Quận 4',
      department: 'IT',
      position: 'Front-end Dev',
      role: 'Lead Team Front-end',
      start: '2021-03-20T15:59:05.803',
      end: '2021-03-25T15:59:05.803',
      countDay: 30,
    },
    {
      id: 5,
      name: 'Yasuo',
      branch: 'APPHR Quận 5',
      department: 'IT',
      position: 'Front-end Dev',
      role: 'Lead Team Front-end',
      start: '2021-04-1T15:59:05.803',
      end: '2021-04-11T15:59:05.803',
      countDay: 30,
    },
  ],
  tabName: 0,
  subTabName: 0,
  contacts: [],
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.profile.SET_PROFILES:
      return { ...state, profiles: payload };
    case REDUX_STATE.profile.SET_PROFILE:
      return { ...state, profile: Object.assign({}, state.profile, payload) };
    case REDUX_STATE.profile.DELETE_PROFILE:
      return {
        ...state,
        profiles: state.profiles.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.profile.EMPTY_VALUE:
      return {
        ...state,
        profile: initialState.profile,
      };
    case REDUX_STATE.profile.GET_ROLES:
      return {
        ...state,
        roles: payload,
      };
    case REDUX_STATE.profile.SET_TAB_NAME:
      return {
        ...state,
        tabName: payload,
      };
    case REDUX_STATE.profile.SET_SUB_TAB_NAME:
      return {
        ...state,
        subTabName: payload,
      };
    case REDUX_STATE.profile.SET_JOB_TIMELINE:
      payload =
        payload && payload.length > 0
          ? payload.map((contract) => {
              contract.handleDate = getDateInput(contract.handleDate);
              contract.validDate = getDateInput(contract.validDate);
              contract.expiredDate = getDateInput(contract.expiredDate);
              contract.startWork = getDateInput(contract.startWork);
              return contract;
            })
          : [];

      return {
        ...state,
        profile: { ...state.profile, contracts: payload },
      };
    case REDUX_STATE.diploma.SET_DEGREES:
      return {
        ...state,
        profile: Object.assign({}, state.profile, { degrees: payload }),
      };

    case REDUX_STATE.diploma.SET_CERTIFICATES:
      return {
        ...state,
        profile: Object.assign({}, state.profile, { certificates: payload }),
      };

    case REDUX_STATE.profile.SET_CONTACTS:
      return {
        ...state,
        contacts: [...payload],
      };
    case REDUX_STATE.profile.CREATE_NEW_CONTACTS:
      return {
        ...state,
        contacts: [...state.contacts, payload],
      };
    case REDUX_STATE.diploma.DELETE_CERTIFICATE:
      return {
        ...state,
        profile: Object.assign({}, state.profile, { certificates: state.profile.certificates.filter((c) => c.id !== payload.id) }),
      };
    case REDUX_STATE.diploma.DELETE_DEGREE:
      return {
        ...state,
        profile: Object.assign({}, state.profile, { degrees: state.profile.degrees.filter((c) => c.id !== payload.id) }),
      };
    case REDUX_STATE.diploma.SET_DIPLOMA:
      return { ...state, newDegree: payload };
    default:
      return state;
  }
};

export default profileReducer;
