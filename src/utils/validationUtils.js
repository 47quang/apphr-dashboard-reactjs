export const VALIDATION_TYPE = {
  PHONE_NUMBER: "PHONE_NUMBER",

};
export const getRegexExpression = (validationType) => {
  switch (validationType) {
    case VALIDATION_TYPE.PHONE_NUMBER:
      return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[\d]*$/;

    default:
      return "";
  }
};
