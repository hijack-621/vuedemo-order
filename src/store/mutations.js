/* 同步修改state的 一些方法 */
import Vue from 'vue'
import {GET_ADDR, GET_CATE, GET_SHOP, GET_USER, RESET_USER, MOCK_STORE, MOCK_RATING, MOCK_INFO, Add_COUNT, DECREASE_COUNT} from './mutations-types'
export default {
  [GET_ADDR] (state, {position}) { // 第一个参数就是vuex的Store实例！！！
    state.Position = position 
  },
  [GET_CATE] (state, {cate}) {
    state.CateList = cate
  },
  [GET_SHOP] (state, {shop}) {
    state.ShopList = shop
  },
  [GET_USER] (state, {userInfo}) {
    Object.assign(state.userInfo, userInfo)
  },
  [RESET_USER] (state) {
    state.userInfo = {}
  },
  [MOCK_STORE] (state, {store}) {
    state.store = store
  },
  [MOCK_RATING] (state, {rating}) {
    state.rating = rating
  },
  [MOCK_INFO] (state, {info}) {
    state.store_info = info
  },
  [Add_COUNT] (state, {food}) {
   if(!food.count || food.count ==0){
     Vue.set(food, 'count', 1)
   }else {
     food.count++
   }
  },
  [DECREASE_COUNT] (state, {food}) {
    if(food.count>0){
      food.count--
    }
  },
  
}