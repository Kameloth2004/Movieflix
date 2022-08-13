import axios from 'axios';
import qs from 'qs';

type LoginResponse = {
    
        access_token: String;
        token_type: String;
        refresh_token: String;
        expires_in: Number;
        scope: String;
        userName: String;
        userId: Number;
    
}

export const BASE_URL = 
'https://movieflix-devsuperior.herokuapp.com';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'myclientid';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'myclientsecret';

const tokenKey = 'authData'; 

type LoginData = {
    username: string;
    password: string;
}

export const requestBackendLogin = (loginData : LoginData ) => {
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
    }

    const data = qs.stringify({
        ...loginData,
        grant_type: 'password'
    });

    return axios({
        method: 'POST', 
        baseURL: BASE_URL, 
        url: '/oauth/token', 
        data, 
        headers,
    });
};

export const saveAuthData = (obj : LoginData) => {
    localStorage.setItem(tokenKey, JSON.stringify(obj));
}

export const getAuthData = () => {
    const str = localStorage.getItem(tokenKey) ?? '{}';
    return JSON.parse(str) as LoginResponse;
    
}
