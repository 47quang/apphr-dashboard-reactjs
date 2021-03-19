import { REDUX_STATE } from '../states';

const initialState = {
  profiles: [
    {
      id: 1,
      shortname: 'E01',
      name: 'Nguyễn Trọng T',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ntt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
    {
      id: 2,
      shortname: 'E02',
      name: 'Nguyễn Trọng Tr',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ntt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
    {
      id: 3,
      shortname: 'E03',
      name: 'Nguyễn Trọng Tru',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ntt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
    {
      id: 4,
      shortname: 'E04',
      name: 'Nguyễn Trọng Trun',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ntt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
    {
      id: 5,
      shortname: 'E05',
      name: 'Nguyễn Trọng Trung',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ntt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
    {
      id: 6,
      shortname: 'E06',
      name: 'Nguyễn Trọng Đạt',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ntd@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Fresher',
    },
    {
      id: 7,
      shortname: 'E07',
      name: 'Trần Thanh Q',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ttt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
    {
      id: 8,
      shortname: 'E08',
      name: 'Trần Thanh Qu',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ttt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Junior',
    },
    {
      id: 10,
      shortname: 'E10',
      name: 'Trần Thanh Qua',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ttt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
    {
      id: 12,
      shortname: 'E12',
      name: 'Trần Thanh Quan',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ttt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
    {
      id: 14,
      shortname: 'E14',
      name: 'Trần Thanh Quang',
      phone: '0123456789',
      gender: 'Nam',
      email: 'ttt@gmail.com',
      positionName: 'Front-End Junior',
      departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
      branchName: 'APPHR Hồ Chí Minh Quận 1',
      status: 'Intern',
    },
  ],
  profile: {
    id: '',
    shortname: '',
    name: 'Trần Thanh Quang',
    phone: '0123456789',
    gender: 'Nam',
    email: 'ttt@gmail.com',
    positionName: 'Front-End Junior',
    departmentName: 'IT APPHR Hồ Chí Minh Quận 1',
    branchName: 'APPHR Hồ Chí Minh Quận 1',
    status: 'Intern',
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
  tabName: 'profile',
  subTabName: 'basicInfo',
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.profile.SET_PROFILES:
      return { ...state, profiles: payload };
    case REDUX_STATE.profile.SET_PROFILE:
      return { ...state, profile: payload };
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
    default:
      return state;
  }
};

export default profileReducer;
