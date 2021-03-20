import { REDUX_STATE } from '../states';

const initialState = {
  accounts: [{ id: 1, username: 'admin', email: 'dat@gmail.com', phone: '0212312321312', role: 'Pro', profileId: 1 }],
  account: {
    username: '',
    email: '',
    phone: '',
    role: '',
    profile: '',
    permissions: [1, 2, 3, 4, 5],
  },
  roles: [],

  permissions: [
    {
      id: 1,
      name: 'Chi nhánh',
      group: 'branch',
      children: [
        {
          id: 1,
          name: 'Tạo chi nhánh',
          endpoint: 'api.branch',
          method: 'POST',
          service: 'TIMEKEEPING',
        },
        {
          id: 2,
          name: 'Danh sách chi nhánh',
          endpoint: 'api.branch',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 3,
          name: 'Chi tiết chi nhánh',
          endpoint: 'api.branch/{id}',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 4,
          name: 'Cập nhật chi nhánh',
          endpoint: 'api.branch/{id}',
          method: 'PUT',
          service: 'TIMEKEEPING',
        },
        {
          id: 5,
          name: 'Xóa chi nhánh',
          endpoint: 'api.branch/{id}',
          method: 'DELETE',
          service: 'TIMEKEEPING',
        },
      ],
    },
    {
      id: 2,
      name: 'Phòng ban',
      group: 'department',
      children: [
        {
          id: 6,
          name: 'Tạo phòng ban',
          endpoint: 'api.department',
          method: 'POST',
          service: 'TIMEKEEPING',
        },
        {
          id: 7,
          name: 'Danh sách phòng ban',
          endpoint: 'api.department',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 8,
          name: 'Chi tiết phòng ban',
          endpoint: 'api.department/{id}',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 9,
          name: 'Cập nhật phòng ban',
          endpoint: 'api.department/{id}',
          method: 'PUT',
          service: 'TIMEKEEPING',
        },
        {
          id: 10,
          name: 'Xóa phòng ban',
          endpoint: 'api.department/{id}',
          method: 'DELETE',
          service: 'TIMEKEEPING',
        },
      ],
    },
    {
      id: 3,
      name: 'Vị trí',
      group: 'position',
      children: [
        {
          id: 11,
          name: 'Tạo vị trí',
          endpoint: 'api.position',
          method: 'POST',
          service: 'TIMEKEEPING',
        },
        {
          id: 12,
          name: 'Danh sách vị trí',
          endpoint: 'api.position',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 13,
          name: 'Chi tiết vị trí',
          endpoint: 'api.position/{id}',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 14,
          name: 'Cập nhật vị trí',
          endpoint: 'api.position/{id}',
          method: 'PUT',
          service: 'TIMEKEEPING',
        },
        {
          id: 15,
          name: 'Xóa vị trí',
          endpoint: 'api.position/{id}',
          method: 'DELETE',
          service: 'TIMEKEEPING',
        },
      ],
    },
    {
      id: 4,
      name: 'Ca làm việc',
      group: 'shift',
      children: [
        {
          id: 16,
          name: 'Tạo ca làm việc',
          endpoint: 'api.shift',
          method: 'POST',
          service: 'TIMEKEEPING',
        },
        {
          id: 17,
          name: 'Danh sách ca làm việc',
          endpoint: 'api.shift',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 18,
          name: 'Chi tiết ca làm việc',
          endpoint: 'api.shift/{id}',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 19,
          name: 'Cập nhật ca làm việc',
          endpoint: 'api.shift/{id}',
          method: 'PUT',
          service: 'TIMEKEEPING',
        },
        {
          id: 20,
          name: 'Xóa ca làm việc',
          endpoint: 'api.shift/{id}',
          method: 'DELETE',
          service: 'TIMEKEEPING',
        },
      ],
    },
    {
      id: 5,
      name: 'Ngày nghỉ lễ',
      group: 'holiday',
      children: [
        {
          id: 5.1,
          name: 'Tạo ngày nghỉ lễ',
          endpoint: 'api.holiday',
          method: 'POST',
          service: 'TIMEKEEPING',
        },
        {
          id: 22,
          name: 'Danh sách ngày nghỉ lễ',
          endpoint: 'api.holiday',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 23,
          name: 'Chi tiết ngày nghỉ lễ',
          endpoint: 'api.holiday/{id}',
          method: 'GET',
          service: 'TIMEKEEPING',
        },
        {
          id: 24,
          name: 'Cập nhật ngày nghỉ lễ',
          endpoint: 'api.holiday/{id}',
          method: 'PUT',
          service: 'TIMEKEEPING',
        },
        {
          id: 25,
          name: 'Xóa ngày nghỉ lễ',
          endpoint: 'api.holiday/{id}',
          method: 'DELETE',
          service: 'TIMEKEEPING',
        },
      ],
    },
    {
      id: 6,
      name: 'Hồ sơ nhân viên',
      group: 'profile',
      children: [
        {
          id: 26,
          name: 'Tạo hồ sơ nhân viên',
          endpoint: 'api.profile',
          method: 'POST',
          service: 'USER',
        },
        {
          id: 6.2,
          name: 'Danh sách hồ sơ nhân viên',
          endpoint: 'api.profile',
          method: 'GET',
          service: 'USER',
        },
        {
          id: 27,
          name: 'Chi tiết hồ sơ nhân viên',
          endpoint: 'api.profile/{id}',
          method: 'GET',
          service: 'USER',
        },
        {
          id: 6.4,
          name: 'Cập nhật hồ sơ nhân viên',
          endpoint: 'api.profile/{id}',
          method: 'PUT',
          service: 'USER',
        },
        {
          id: 28,
          name: 'Xóa hồ sơ nhân viên',
          endpoint: 'api.profile/{id}',
          method: 'DELETE',
          service: 'USER',
        },
      ],
    },
    {
      id: 7,
      name: 'Tài khoản',
      group: 'user',
      children: [
        {
          id: 29,
          name: 'Tạo tài khoản',
          endpoint: 'api.user',
          method: 'POST',
          service: 'USER',
        },
        {
          id: 30,
          name: 'Danh sách tài khoản',
          endpoint: 'api.user',
          method: 'GET',
          service: 'USER',
        },
        {
          id: 31,
          name: 'Chi tiết tài khoản',
          endpoint: 'api.user/{id}',
          method: 'GET',
          service: 'USER',
        },
        {
          id: 32,
          name: 'Cập nhật tài khoản',
          endpoint: 'api.user/{id}',
          method: 'PUT',
          service: 'USER',
        },
        {
          id: 33,
          name: 'Xóa tài khoản',
          endpoint: 'api.user/{id}',
          method: 'DELETE',
          service: 'USER',
        },
      ],
    },
    {
      id: 8,
      name: 'Cấu hình',
      group: 'setting',
      children: [
        {
          id: 34,
          name: 'Cập nhật cấu hình chung',
          endpoint: 'api.setting/general-information',
          method: 'PUT',
          service: 'TIMEKEEPING',
        },
      ],
    },
    {
      id: 9,
      name: 'Phân quyên',
      group: 'role',
      children: [
        {
          id: 35,
          name: 'Tạo quyền',
          endpoint: 'api.role',
          method: 'POST',
          service: 'USER',
        },
        {
          id: 36,
          name: 'Danh sách quyền',
          endpoint: 'api.role',
          method: 'GET',
          service: 'USER',
        },
        {
          id: 37,
          name: 'Chi tiết quyền',
          endpoint: 'api.role/{id}',
          method: 'GET',
          service: 'USER',
        },
        {
          id: 38,
          name: 'Cập nhật quyền',
          endpoint: 'api.role',
          method: 'UPDATE',
          service: 'USER',
        },
        {
          id: 39,
          name: 'Xóa quyền',
          endpoint: 'api.role',
          method: 'DELETE',
          service: 'USER',
        },
      ],
    },
  ],
};

const accountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REDUX_STATE.account.SET_ACCOUNTS:
      return { ...state, accounts: payload };
    case REDUX_STATE.account.SET_ACCOUNT:
      return { ...state, account: payload };
    case REDUX_STATE.account.DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter((b) => b.id !== payload.id),
      };
    case REDUX_STATE.account.EMPTY_VALUE:
      return {
        ...state,
        account: initialState.account,
      };
    case REDUX_STATE.account.GET_ROLES:
      return {
        ...state,
        roles: payload,
      };
    default:
      return state;
  }
};

export default accountReducer;
