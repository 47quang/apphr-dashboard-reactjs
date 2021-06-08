export const VALIDATION_TYPE = {
  PHONE_NUMBER: 'PHONE_NUMBER',
  POSITIVE_NUMBER: 'POSITIVE_NUMBER',
  BSS_ID: 'BSS_ID',
  FILE_NAME: 'FILE_NAME',
};
export const getRegexExpression = (validationType) => {
  switch (validationType) {
    case VALIDATION_TYPE.PHONE_NUMBER:
      return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[\d]*$/;
    case VALIDATION_TYPE.POSITIVE_NUMBER:
      return /^\d+$/;
    case VALIDATION_TYPE.BSS_ID:
      return /([0-9a-fA-F]{2}([:]|$)){6}/;
    case VALIDATION_TYPE.FILE_NAME:
      return /[0-9a-zA-Z_]{1}/;
    default:
      return '';
  }
};
