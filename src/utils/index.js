/* eslint-disable no-useless-escape */
// import countries from './country.json';

const obj = {
  formatDateTime(value) {
    const _value = new Date(value);
    const date = `${_value.getDate() < 10 ? '0' + _value.getDate() : _value.getDate()}/${
      _value.getMonth() + 1 < 10 ? '0' + (_value.getMonth() + 1) : _value.getMonth() + 1
    }/${_value.getFullYear()}`;
    const time = `${_value.getHours() < 10 ? '0' + _value.getHours() : _value.getHours()}:${
      _value.getMinutes() < 10 ? '0' + _value.getMinutes() : _value.getMinutes()
    }`;
    return `${time} ${date}`;
  },
  formatDate(value) {
    const _value = new Date(value);
    const date = `${_value.getDate() < 10 ? '0' + _value.getDate() : _value.getDate()}/${
      _value.getMonth() + 1 < 10 ? '0' + (_value.getMonth() + 1) : _value.getMonth() + 1
    }/${_value.getFullYear()}`;
    return date;
  },
  timeSince(date) {
    let seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return `${interval} năm trước`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return `${interval} tháng trước`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return `${interval} ngày trước`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return `${interval} giờ trước`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return `${interval} phút trước`;
    }
    return `${Math.floor(seconds)} giây trước`;
  },
  createHandle(str) {
    if (str) {
      str += '';
      str = str.trim();
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
      str = str.replace(/đ/g, 'd');
      str = str.replace(/\,/g, '-');
      str = str.replace(/\./g, '-');
      str = str.replace(/\!/g, '-');
      str = str.replace(/\?/g, '-');
      str = str.replace(/\~/g, '-');
      str = str.replace(/\ /g, '-');
      str = str.replace(/\|/g, '-');
      str = str.replace(/\./g, '-');
      str = str.replace(/\"/g, '-');
      str = str.replace(/\'/g, '-');
      str = str.replace(/\-\-+/g, '-');
      str = str.replace(/\s+/g, '-');
      str = str.replace(/[^\w\-]+/g, '');
      str = str.replace(/\-\-+/g, '-');
      str = str.replace(/^-+/, '');
      str = str.replace(/-+$/, '');
      if (str.slice(-1) === '-') str = str.substring(0, str.length - 1);
    }
    return str;
  },
  getBase64Image(url) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL('image/png')); // Or at whatever offset you like
      };
      img.crossOrigin = 'anonymous';
      img.src = url;
    });
  },
};

export default obj;
