import { formatDateInput } from 'src/utils/datetimeUtils';
import { REDUX_STATE } from '../states';

const initialState = {
  profiles: [],
  profile: {
    id: 0,
    shortname: '',
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    gender: '',
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
    permanentAddress: '',
    temporaryAddress: '',
    homeTown: '',
    status: '',
    manager: '',
    academicLevel: 'not_require',
    contracts: [],
    degrees: [],
    certificates: [],
    historyWorkings: [],
  },
  roles: [],
  contracts: [],
  contract: {},
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
              contract.handleDate = formatDateInput(contract.handleDate);
              contract.validDate = formatDateInput(contract.validDate);
              contract.expiredDate = formatDateInput(contract.expiredDate);
              contract.startWork = formatDateInput(contract.startWork);
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
    case REDUX_STATE.diploma.EMPTY_DEGREE:
      return {
        ...state,
        profile: Object.assign({}, state.profile, { degrees: payload }),
      };
    case REDUX_STATE.diploma.EMPTY_CERTIFICATE:
      return {
        ...state,
        profile: Object.assign({}, state.profile, { certificates: payload }),
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
