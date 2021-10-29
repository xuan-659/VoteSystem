import axios from 'axios'




const config = {
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 6000 // request timeout
}

const _axios = axios.create(config);

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
    console.log(app.config);
  }
}
