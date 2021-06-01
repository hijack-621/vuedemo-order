/* 
vuex 异步修改state 的一些方法【通过异步调用 mutations中的方法！！！】,由于 要发异步请求，所以 定义的异步数据请求处理函数库也要引入！！！
*/
import {GET_ADDR, GET_CATE, GET_SHOP, GET_USER, RESET_USER, MOCK_INFO, MOCK_RATING, MOCK_STORE} from './mutations-types'
import {getPosition, getCateList, getShopList, getUserInfo, LoginOut, mockstores, mockratings, mockinfos} from '../api/handler' 
export default {
  async trigger_getPosition ({commit, state}){
    const geo = state.latitude + ',' + state.longitude
    const res = await getPosition(geo)
    if(res.code===0) { // 如果请求OK
      const position = res.data //这里跟 const 定义的变量名 要跟 mutation 中定义的 GET_ADDR 所指向的函数名的第二个参数名一致，
      commit(GET_ADDR, {position}) // 提交一个mutation 第一个参数为 mutations.js【或者mutations 属性】 里面与 GET_ADDR 对应的方法，第二个为传递的数据  
    }
  },
  async trigger_getCateList ({commit}) {
    const res = await getCateList()
    if(res.code===0) {
      const cate = res.data
      commit(GET_CATE, {cate})
    }
  },
  async trigger_getShopList ({commit, state}) {
    const res = await getShopList(state.latitude, state.longitude)
    if(res.code==0) {
      const shop = res.data
      commit(GET_SHOP, {shop})
    }
  },
  trigger_getUser ({commit}, userInfo) {
    commit(GET_USER, {userInfo})
  },

  async query_userInfo ({commit}) { // 定义查询用户信息，实现持久化登录，查询得到用户直接登陆
    const res = await getUserInfo()
    const userInfo = res
    if(res.code === 0 ) {
      commit(GET_USER, {userInfo})
    } 
  },
  async logout ({commit}) {
    const res = await LoginOut()
    if(res.code === 0) {
      commit(RESET_USER)
    }
  },
  async mockstore ({commit}, callback) {
    const res = await mockstores()
    if(res.code === 0) {
      const store = res.data
      commit(MOCK_STORE, {store})
      callback && callback() //callback  传了就执行 
    }
  },
  async mockrating ({commit}) {
    const res = await mockratings()
    if(res.code === 0) {
      const rating = res.data
      commit(MOCK_RATING, {rating})
    }
  },
  async mockinfo ({commit}) {
    const res = await mockinfos()
    if(res.code === 0) {
      const info = res.data
      commit(MOCK_INFO, {info})
    }
  },

}