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
  API_CONTRACT: '/api.contract',
  API_WAGE: '/api.wage',
  API_ALLOWANCE: '/api.allowance',
};

export const api = {
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
};
