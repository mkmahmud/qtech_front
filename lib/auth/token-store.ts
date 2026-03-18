import Cookies from "js-cookie";

const TOKEN_KEY = "access_token";

export const getAccessToken = () => {
    return Cookies.get(TOKEN_KEY);
};

export const setAccessToken = (token: string) => {
    // Expires in 7 days, secure: true is recommended for production
    Cookies.set(TOKEN_KEY, token, { expires: 7, sameSite: 'strict' });
};

export const clearAccessToken = () => {
    Cookies.remove(TOKEN_KEY);
};