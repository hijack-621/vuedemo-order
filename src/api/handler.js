//处理get/post数据请求

import ajax from './ajax'
const BASE = '/api'

//[1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)
export const getPosition = (geohash) => ajax(`${BASE}/position/${geohash}`)

// [2、获取食品分类列表](#2获取食品分类列表)
export const getCateList = () => ajax(`${BASE}/index_category`)

// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)
export const getShopList = (latitude, longitude) => ajax(`${BASE}/shops`, { latitude, longitude })

// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)
export const getSearch = (geohash, keywords) => ajax(`${BASE}/search_shops`, { geohash, keywords })

// [5、获取一次性验证码](#5获取一次性验证码)
export const getCaptcha = () => ajax(`${BASE}/captcha`)

// [6、用户名密码登陆](#6用户名密码登陆)
export const LoginInByAP = (username, pwd, captcha) => ajax(`${BASE}/login_pwd`, { username, pwd, captcha}, 'POST')

// [7、发送短信验证码](#7发送短信验证码)
export const SendMes = (phone) => ajax(`${BASE}/sendcode`, { phone })

// [8、手机号验证码登陆](#8手机号验证码登陆)
export const LoginInByPhone = ({phone, code}) => ajax(`${BASE}/login_sms`, { phone, code }, 'POST')

// [9、根据会话获取用户信息](#9根据会话获取用户信息)
export const getUserInfo = () => ajax(`${BASE}/userinfo`)

// [10、用户登出](#10用户登出)
export const LoginOut = () => ajax(`${BASE}/logout`)

export const mockstores = () => ajax('/mockstore')

export const mockratings = () => ajax('/mockrating')

export const mockinfos = () => ajax('/mockinfo')