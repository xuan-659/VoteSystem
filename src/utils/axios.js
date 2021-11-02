import axios from 'axios'




const config = {
  baseURL: 'http://47.113.227.55:8080/',
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  headers: {
    'Content-Type': 'application/json'
    },
  timeout: 6000 // request timeout
}

export const _axios = axios.create(config);

_axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  response => {
    // Do something with response data
    return response;
  },
  error => {
    // Do something with response error
    // if(error.message.includes('timeout'))
    // this.$message({
    //   message:'连接超时',
    //   type:'error'
    // })
    return Promise.reject(error);
  }
);

_axios.interceptors.request.use(
    config => {
      // Do something before request is sent
      return config;
    },
    error => {
      // Do something with request error
      return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    response => {
      // Do something with response data
      return response;
    },
    error => {
      // Do something with response error
      // if(error.message.includes('timeout'))
      // this.$message({
      //   message:'连接超时',
      //   type:'error'
      // })
      return Promise.reject(error);
    }
);



export default {
  install: (app,options) => {
    app.config.globalProperties.$axios = _axios;
  }
}
