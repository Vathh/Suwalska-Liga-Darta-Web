/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://localhost:7051',
  headers: {
    "Content-Type": "application/json"
  }
});

export default {  
  logIn: (login, password) =>
    instance({
      method: 'POST',
      url: '/api/account/login',
      data : {
        "Login" : login,
        "Password" : password
      }
    }),
  stockTimeSeries: (symbol) =>
    instance({
        'method':'GET',
        'url':'/query',
        'params': {
            'outputsize':'compact',
            'datatype':'json',
            'function':'TIME_SERIES_DAILY_ADJUSTED',
            'symbol': symbol.toUpperCase()
        },
    })
}

