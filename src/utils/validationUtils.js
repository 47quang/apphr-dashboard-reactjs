export const VALIDATION_TYPE = {
  PHONE_NUMBER: 'PHONE_NUMBER',
  POSITIVE_NUMBER: 'POSITIVE_NUMBER',
  IP_V4_ADDRESS: 'IP_V4_ADDRESS',
};
export const getRegexExpression = (validationType) => {
  switch (validationType) {
    case VALIDATION_TYPE.PHONE_NUMBER:
      return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[\d]*$/;
    case VALIDATION_TYPE.POSITIVE_NUMBER:
      return /^\d+$/;
    case VALIDATION_TYPE.IP_V4_ADDRESS:
      return /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/;
    default:
      return '';
  }
};
