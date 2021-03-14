import client from './client';

const API_PREFIX = {
  API_GENERAL: '/api.tenant',
  API_SETTING_BRANCH: '/api.branch',
  API_SETTING_DEPARTMENT: '/api.department',
  API_SETTING_POSITION: '/api.position',
  API_SETTING_SHIFT: '/api.shift',
  API_PROVINCE: '/api.province',
  API_DISTRICT: '/api.district',
  API_WARD: '/api.ward',
};

export const api = {
  general: {
    getGeneralInfo: (id) => {
      return client.get(API_PREFIX.API_GENERAL + `/${1}`);
    },
  },

  branch: {
    getBranches: (params) => {
      return client.get(API_PREFIX.API_SETTING_BRANCH, {
        params: params,
      });
    },
    postBranch: (data) => {
      return client.post(API_PREFIX.API_SETTING_BRANCH, data);
    },
    putBranch: (data, id) => {
      return client.put(API_PREFIX.API_SETTING_BRANCH + `/${id}`, data);
    },
    getBranch: (id) => {
      return client.get(API_PREFIX.API_SETTING_BRANCH + `/${id}`);
    },
    deleteBranch: (id) => {
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
    getPositionList: (params) => {
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
    postShift: (bodyParams) => {
      return client.post(API_PREFIX.API_SETTING_SHIFT, { ...bodyParams });
    },
    getShiftList: (params) => {
      return client.get(API_PREFIX.API_SETTING_SHIFT, {
        params: params,
      });
    },
    getShift: (id) => {
      return client.get(API_PREFIX.API_SETTING_SHIFT + `/${id}`);
    },
    putShift: (bodyParams, id) => {
      return client.put(API_PREFIX.API_SETTING_SHIFT + `/${id}`, bodyParams);
    },
    deleteShift: (id) => {
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
