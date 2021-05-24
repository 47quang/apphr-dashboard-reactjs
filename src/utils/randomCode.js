export const generateCode = (n, up = true, type = 'LetterOrDigit') => {
  n = n || 6;
  let text = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  if (type === 'Letter') {
    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  } else if (type === 'Digit') {
    possible = '0123456789';
  }
  for (let i = 0; i < n; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  if (up) {
    text = text.toUpperCase();
  }
  return text;
};
