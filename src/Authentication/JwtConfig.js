import Cookies from 'js-cookie'

export const getToken = () => {
    return Cookies.get('auth-cookie');
};

export const getHeaderToken = () => {
    return 'Bearer ' + Cookies.get('auth-cookie');
};