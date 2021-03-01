import client from './client';

const AccountApi = {
  getAccounts(params) {
    return new Promise((resolve, reject) => {
      client
        .get('/merchant', { params })
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default AccountApi;
