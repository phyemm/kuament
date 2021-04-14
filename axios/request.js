
import axios from 'axios'
class Request {
  constructor() {
    // 允许验证
    // this.withCredentials = true;
    // console.log(process.env);
    this.$http = axios.create({
      baseURL: process.env.VUE_APP_BASE_API,
      timeout: 10000
    })
    // 配置拦截器
    this.setInterceptors(this.$http)
  }

  setInterceptors(instance) {

    instance.interceptors.request.use((config) => {
      // // 配置token
      // config.headers.AuthorizationToken = localStorage.getItem('AuthorizationToken') || '';
      // console.log(config);
      return config;
    }, err => Promise.reject(err));

    instance.interceptors.response.use((response) => {
      // TODO: 对响应结果预先处理
      return response;
    }, (err) => {
      if (err.response) { // 响应错误码处理
        switch (err.response.status) {
          case '403':
            // TODO: handler server forbidden error
            break;
            // TODO: handler other status code
          default:
            break;
        }
        return Promise.reject(err.response);
      }

      return Promise.reject(err);
    });
  }
  /**
   * GET
   * @param {*} url 
   * @param {*} param 
   */
  async get(url, param) {
    try {
      let res = await this.$http.get(url, {
        params: param
      })
      return res.data.Result
    } catch (error) {
      console.error(error)
    }

  }
  /**
   * POST
   * @param {*} url 
   * @param {*} param 
   */
  async post(url, param) {
    try {
      let res = await this.$http.post(url, param)
      return res.data.Result
    } catch (error) {
      console.error(error)
    }

  }
}
export default new Request()