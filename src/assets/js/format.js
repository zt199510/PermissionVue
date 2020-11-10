
import axios from "axios";
export function getRefreshToken(param,NowToken) { // 刷新token 注意这里用到的service
    let params = {
      refreshToken:param,
      accessToken:NowToken
    }
    return axios.post('/api/Auth/RefreshToken/refresh-token',params)
      .then((res) => {
        return Promise.resolve(res.data)
      })
  }
  
  export function isRefreshTokenExpired(timestamp) {
    clearInterval(window.interval);
    window.interval = setInterval(()=>{
      timestamp=timestamp-1
      localStorage.setItem('resetTime',timestamp)
    },1000)
  }