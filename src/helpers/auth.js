export const setCookie = (cookieName, cookieValue, cookieExpire) => {
  const date = new Date();
  date.setTime(date.getTime() + cookieExpire * 24 * 60 * 60 * 1000);
  const expiryDate = `expires=${date.toUTCString()}`;
  document.cookie = `${cookieName}=${cookieValue};${expiryDate};path=/;`;
};

export const getCookie = (cookieSearchName) => {
  const cookieName = `${cookieSearchName}=`;
  const cookieArray = document.cookie.split(';');
  let cookieValue = '';
  cookieArray.forEach((ele) => {
    while (ele.charAt(0) === ' ') {
      ele = ele.substring(1);
    }
    if (ele.indexOf(cookieName) === 0) {
      cookieValue = ele.substring(cookieName.length, ele.length);
    }
  });
  return cookieValue;
};

export const deleteCookie = (cookieName) => {
  // eslint-disable-next-line max-len
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
