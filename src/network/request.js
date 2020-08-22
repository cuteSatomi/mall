import axios from 'axios';
import {BASEURL} from './requestconfig/zzx'

export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    baseURL: BASEURL,
    timeout: 10000,
  });

  //2.axios的拦截器
  //2.1.请求拦截的作用
  instance.interceptors.request.use(config =>{
    return config;
  },error => {

  });

  //2.2.相应拦截
  instance.interceptors.response.use(res=>{
    return res.data;
  },error => {
    console.log(error);
  });

  //3.发送真正的网络请求
  return instance(config);
}
