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
    put: (data, id) => {
      return client.put(API_PREFIX.API_SETTING_BRANCH + `/${id}`, data);
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
    postPosition: (bodyParams) => {
      return client.post(API_PREFIX.API_SETTING_POSITION, bodyParams);
    },
    getPositions: (params) => {
      return client.get(API_PREFIX.API_SETTING_POSITION, {
        params: params,
      });
    },
    getPosition: (id) => {
      return client.get(API_PREFIX.API_SETTING_POSITION + `/${id}`);
    },
    putPosition: (bodyParams, id) => {
      return client.put(API_PREFIX.API_SETTING_POSITION + `/${id}`, bodyParams);
    },
    deletePosition: (id) => {
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
};
