import client from './client';

const API_PREFIX = {
  API_SETTING_BRANCH: '/api.branch',
  API_SETTING_DEPARTMENT: '/api.department',
  API_SETTING_POSITION: '/api.position',
  API_SETTING_SHIFT: '/api.shift',
  API_PROVINCE: '/api.province',
  API_DISTRICT: '/api.district',
  API_WARD: '/api.ward',
  API_GENERAL: '/api.tenant',
  API_SETTING_HOLIDAY: '/api.holiday',
  API_USER: '/api.user',
  API_META: '/api.meta/__type_holiday',
  API_ACCOUNT: '/api.user',
  API_ROLE: '/api.role',
  API_PERMISSION: '/api.permission',
  API_PROFILE: '/api.profile',
  API_CONTACT: '/api.contact',
  API_CONTRACT: '/api.contract',
  API_WAGE: '/api.wage',
  API_ALLOWANCE: '/api.allowance',
  API_DIPLOMA: '/api.diploma',
  API_UPLOAD: 'api.upload',
  API_ARTICLE: '/api.article',
  API_ARTICLE_TYPE: '/api.type-article',
  API_HISTORY_WORK: '/api.work-history',
  API_WAGE_HISTORY: '/api.wage-history',
  API_ROLL_UP: '/api.roll-up',
  API_ASSIGNMENT: '/api.assignment',
  API_LEAVE_REQUEST: '/api.leave-form',
  API_REMOTE_REQUEST: '/api.remote-form',
  API_OVERTIME_REQUEST: '/api.overtime-form',
  API_ATTRIBUTE: '/api.attribute',
};

export const api = {
  contact: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_CONTACT, {
        params: params,
      });
    },
    post: (params) => {
      return client.post(API_PREFIX.API_CONTACT, params);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_CONTACT + `/${data.id}`, data);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_CONTACT + `/${id}`);
    },
  },
  general: {
    getGeneralInfo: (id) => {
      return client.get(API_PREFIX.API_GENERAL + `/${1}`);
    },
  },

  branch: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_SETTING_BRANCH, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_SETTING_BRANCH, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_SETTING_BRANCH + `/${data.id}`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_SETTING_BRANCH + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_SETTING_BRANCH + `/${id}`);
    },
  },
  department: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_SETTING_DEPARTMENT, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_SETTING_DEPARTMENT, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_SETTING_DEPARTMENT + `/${data.id}`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_SETTING_DEPARTMENT + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_SETTING_DEPARTMENT + `/${id}`);
    },
  },
  position: {
    post: (bodyParams) => {
      return client.post(API_PREFIX.API_SETTING_POSITION, bodyParams);
    },
    getAll: (params) => {
      return client.get(API_PREFIX.API_SETTING_POSITION, {
        params: params,
      });
    },
    get: (id) => {
      return client.get(API_PREFIX.API_SETTING_POSITION + `/${id}`);
    },
    put: (bodyParams, id) => {
      return client.put(API_PREFIX.API_SETTING_POSITION + `/${id}`, bodyParams);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_SETTING_POSITION + `/${id}`);
    },
  },
  shift: {
    post: (bodyParams) => {
      return client.post(API_PREFIX.API_SETTING_SHIFT, { ...bodyParams });
    },
    getAll: (params) => {
      return client.get(API_PREFIX.API_SETTING_SHIFT, {
        params: params,
      });
    },
    get: (id) => {
      return client.get(API_PREFIX.API_SETTING_SHIFT + `/${id}`);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_SETTING_SHIFT + `/${data.id}`, data);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_SETTING_SHIFT + `/${id}`);
    },
  },
  location: {
    getProvince: (provinceId) => {
      return client.get(API_PREFIX.API_PROVINCE + `/${provinceId}`);
    },
    getProvinces: () => {
      return client.get(API_PREFIX.API_PROVINCE);
    },
    getDistricts: (provinceId) => {
      return client.get(API_PREFIX.API_PROVINCE + `/${provinceId}/district`);
    },
    getDistrict: (districtId) => {
      return client.get(API_PREFIX.API_DISTRICT + `/${districtId}`);
    },
    getWards: (districtId) => {
      return client.get(API_PREFIX.API_DISTRICT + `/${districtId}/ward`);
    },
    getWard: (wardID) => {
      return client.get(API_PREFIX.API_WARD + `/${wardID}`);
    },
  },
  setting: {
    getGeneral: (tenantId) => {
      return client.get(API_PREFIX.API_GENERAL + `/${tenantId}`);
    },
    putGeneral: (payload) => {
      return client.put(API_PREFIX.API_GENERAL + `/${payload.id}`, payload);
    },
  },
  holiday: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_SETTING_HOLIDAY, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_SETTING_HOLIDAY, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_SETTING_HOLIDAY + `/${data.id}`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_SETTING_HOLIDAY + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_SETTING_HOLIDAY + `/${id}`);
    },
    getAllRequest: (params) => {
      return client.get(API_PREFIX.API_META, {
        params: params,
      });
    },
    getPolicy: (params) => {
      return client.get(API_PREFIX.API_META, {
        params: params,
      });
    },
    setPolicy: (params) => {
      return client.put(API_PREFIX.API_META, {
        params: params,
      });
    },
  },
  user: {
    login: (params) => {
      return client.post(API_PREFIX.API_USER + `/login`, params);
    },
    createUser: (payload) => {
      return client.put(API_PREFIX.API_USER, payload);
    },
  },
  account: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_ACCOUNT, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_ACCOUNT, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_ACCOUNT + `/${data.id}`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_ACCOUNT + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_ACCOUNT + `/${id}`);
    },
    getAllProfiles: (params) => {
      return client.get(API_PREFIX.API_ACCOUNT, {
        params: params,
      });
    },
    getAllRole: (params) => {
      return client.get(API_PREFIX.API_ROLE, {
        params: params,
      });
    },
  },
  role: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_ROLE, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_ROLE, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_ROLE + `/${data.id}`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_ROLE + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_ROLE + `/${id}`);
    },
    getAllPermission: (params) => {
      return client.get(API_PREFIX.API_PERMISSION, {
        params: params,
      });
    },
  },
  profile: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_PROFILE, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_PROFILE, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_PROFILE + `/${data.id}`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_PROFILE + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_PROFILE + `/${id}`);
    },
    getAllRole: (params) => {
      return client.get(API_PREFIX.API_PROFILE, {
        params: params,
      });
    },
    getProfiles: (params) => {
      return client.get(API_PREFIX.API_PROFILE + '?fields=' + params.fields.join());
    },
    getRollUpTable: (params) => {
      return client.get(API_PREFIX.API_PROFILE + '/assignment', {
        params: params,
      });
    },
  },
  contract: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_CONTRACT, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_CONTRACT, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_CONTRACT + `/${data.id}`, data);
    },
    putField: (data) => {
      return client.put(API_PREFIX.API_CONTRACT + `/${data.id}/add-attribute`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_CONTRACT + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_CONTRACT + `/${id}`);
    },
  },
  wage: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_WAGE, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_WAGE, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_WAGE + `/${data.id}`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_WAGE + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_WAGE + `/${id}`);
    },
  },
  allowance: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_ALLOWANCE, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_ALLOWANCE, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_ALLOWANCE + `/${data.id}`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_ALLOWANCE + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_ALLOWANCE + `/${id}`);
    },
  },

  diploma: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_DIPLOMA, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_DIPLOMA, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_DIPLOMA + `/${data.id}`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_DIPLOMA + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_DIPLOMA + `/${id}`);
    },
  },
  upload: {
    postForm: (data) => {
      return client.post(API_PREFIX.API_UPLOAD, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },
  },
  article: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_ARTICLE, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_ARTICLE, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_ARTICLE + `/${data.id}`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_ARTICLE + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_ARTICLE + `/${id}`);
    },
  },
  articleType: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_ARTICLE_TYPE, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_ARTICLE_TYPE, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_ARTICLE_TYPE + `/${data.id}`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_ARTICLE_TYPE + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_ARTICLE_TYPE + `/${id}`);
    },
  },
  historyWork: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_HISTORY_WORK, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_HISTORY_WORK, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_HISTORY_WORK + `/${data.id}`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_HISTORY_WORK + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_HISTORY_WORK + `/${id}`);
    },
  },
  wageHistory: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_WAGE_HISTORY, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_WAGE_HISTORY, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_WAGE_HISTORY + `/${data.id}`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_WAGE_HISTORY + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_WAGE_HISTORY + `/${id}`);
    },
  },
  rollUp: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_ROLL_UP, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_ROLL_UP, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_ROLL_UP + `/${data.id}`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_ROLL_UP + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_ROLL_UP + `/${id}`);
    },
  },
  assignment: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_ASSIGNMENT, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_ASSIGNMENT, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_ASSIGNMENT + `/${data.id}`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_ASSIGNMENT + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_ASSIGNMENT + `/${id}`);
    },
  },
  leaveRequest: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_LEAVE_REQUEST, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_LEAVE_REQUEST, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_LEAVE_REQUEST + `/${data.id}`, data);
    },
    approve: (id) => {
      return client.put(API_PREFIX.API_LEAVE_REQUEST + `/${id}/approve`);
    },
    reject: (id) => {
      return client.put(API_PREFIX.API_LEAVE_REQUEST + `/${id}/reject`);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_LEAVE_REQUEST + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_LEAVE_REQUEST + `/${id}`);
    },
  },
  remoteRequest: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_REMOTE_REQUEST, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_REMOTE_REQUEST, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_REMOTE_REQUEST + `/${data.id}`, data);
    },
    approve: (id) => {
      return client.put(API_PREFIX.API_REMOTE_REQUEST + `/${id.id}/approve`);
    },
    reject: (id) => {
      return client.put(API_PREFIX.API_REMOTE_REQUEST + `/${id}/reject`);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_REMOTE_REQUEST + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_REMOTE_REQUEST + `/${id}`);
    },
  },
  overtimeRequest: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_OVERTIME_REQUEST, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_OVERTIME_REQUEST, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_OVERTIME_REQUEST + `/${data.id}`, data);
    },
    approve: (id) => {
      return client.put(API_PREFIX.API_OVERTIME_REQUEST + `/${id}/approve`);
    },
    reject: (id) => {
      return client.put(API_PREFIX.API_OVERTIME_REQUEST + `/${id}/reject`);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_OVERTIME_REQUEST + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_OVERTIME_REQUEST + `/${id}`);
    },
  },
  attribute: {
    getAll: (params) => {
      return client.get(API_PREFIX.API_ATTRIBUTE, {
        params: params,
      });
    },
    post: (data) => {
      return client.post(API_PREFIX.API_ATTRIBUTE, data);
    },
    put: (data) => {
      return client.put(API_PREFIX.API_ATTRIBUTE + `/${data.id}`, data);
    },
    get: (id) => {
      return client.get(API_PREFIX.API_ATTRIBUTE + `/${id}`);
    },
    delete: (id) => {
      return client.delete(API_PREFIX.API_ATTRIBUTE + `/${id}`);
    },
  },
};
