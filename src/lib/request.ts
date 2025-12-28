import axios from 'axios';
import get from 'lodash.get';
import { getSession, signOut } from 'next-auth/react';
import qs from 'qs';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'indices' }),
});

request.interceptors.request.use(
  async function (config) {
    const session = await getSession();

    const token = get(session, 'accessToken', null);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    const locale: string | null = window.location?.pathname?.split('/')?.filter(Boolean)?.[0];
    if (locale) {
      config.headers['Accept-Language'] = locale;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
request.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      window.location.href = '/auth/login';
      await signOut({ redirect: false });
      return;
    }

    // const errorMessage = get(error, 'response.data.message', null);
    // if (!errorMessage) {
    //   const errors = get(error, 'response.data.errors', {});
    //   if (!isEmpty(errors))
    //     Object.values(errors).forEach((err) => Array.isArray(err) && toast.error(err[0]));
    //   else toast.error('Xatolik yuz berdi');
    // } else {
    //   toast.error(errorMessage);
    // }

    return Promise.reject(error);
  }
);

export default request;
