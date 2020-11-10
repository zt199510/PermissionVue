
import axios from "axios";
import qs from "qs";

import { Message} from 'element-ui';
import { getRefreshToken, isRefreshTokenExpired} from '@/assets/js/format';
window.isReresh = false;
const service = axios.create({
  baseURL: "/turn/", 
  timeout: 5000,
  withCredentials: true,
   headers: {
     "Content-Type": "application/json,text/html,application/xhtml+xml,application/xml;charset=UTF-8"
   }
});

if (process.env.NODE_ENV === "development") {
  service.baseURL='/turn/'
 }else {
  service.baseURL='https://localhost:5001/';//http://47.106.71.73:5000/swagger/index.html
 }

service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('Authorization')) {
      config.headers.Authorization ="Bearer "+ localStorage.getItem('Authorization');
    }
    return config;
  },
  (error) => {
    return Promise.reject();
  }
);
service.interceptors.response.use(response => {
  let resetTime= localStorage.getItem('resetTime');
  //let resetTime= 1210;
  if (localStorage.getItem('Authorization')){
    isRefreshTokenExpired(resetTime)
    if(resetTime<1200){
      if(!window.isReresh){
         
        let refresh_token =  localStorage.getItem("RefreshToken");
        let NowToken =  localStorage.getItem("Authorization");
        getRefreshToken(refresh_token,NowToken).then(res => {
          window.isReresh = false;
          localStorage.setItem("Authorization", res.access_token);
          localStorage.setItem("RefreshToken", res.RefreshToken);
          localStorage.setItem("resetTime",res.resetTime);
          isRefreshTokenExpired(res.resetTime);// 重新获取的token有效时间
        }).catch(err => {});
      }
    }else window.isReresh = false;
  }
  //接收到响应数据并成功后的一些共有的处理，关闭loading等
   if (response.status === 200) {
      return response.data;
    } else {
      Promise.reject();
    }
}, error => {
  
   /***** 接收到异常响应的处理开始 *****/
  if (error && error.response) {
    // 1.公共错误处理
    // 2.根据响应码具体处理
    
    switch (error.response.status) {
      case 400:
        error.message = '错误请求'
        break;
      case 401:
        if(error.response.headers.tokenexpired===true){
          error.message = '访问令牌过期'
         
          break;
        }else{
          error.message = '未授权，请重新登录'
          localStorage.clear();
          window.location.href='/';
          window.interval=null;
          //this.$router.push("/log");
        }
        break;
      case 403:
        error.message = '拒绝访问'
        break;
      case 404:
        error.message = '请求错误,未找到该资源'
        break;
      case 405:
        error.message = '请求方法未允许'
        break;
      case 408:
        error.message = '请求超时'
        break;
      case 500:
        error.message = '服务器端出错'
    
        break;
      case 501:
        error.message = '网络未实现'
        break;
      case 502:
        error.message = '网络错误'
        break;
      case 503:
        error.message = '服务不可用'
        break;
      case 504:
        error.message = '网络超时'
        break;
      case 505:
        error.message = 'http版本不支持该请求'
        break;
      default:
        error.message = `连接错误${error.response.status}`
    }
  } else {
    // 超时处理
    if (qs.stringify(error).includes('timeout')) {
      Message.error('服务器响应超时，请刷新当前页')
    }
    error.message('连接服务器失败')
  }

  Message.error(error.message)

  /***** 处理结束 *****/
  //如果不需要错误处理，以上的处理过程都可省略
  return Promise.reject(error.response)
})

export default service;