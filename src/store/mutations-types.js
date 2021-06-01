/* 这里存放里面的方法名称， 之后在mutations中定义方法名 就引用这里！！！
使用常量替代 Mutation 事件类型【https://vuex.vuejs.org/zh/guide/mutations.html】,这种风格在多人协同开发的大项目中用合适！！！ 
*/

export const GET_ADDR = 'get_addr' // 接受地址

export const GET_CATE = 'get_cate' // 接收分类

export const GET_SHOP = 'get_shop' // 接收商铺

export const GET_USER = 'get_user' // 获取用户信息

export const RESET_USER = 'reset_user' // 登出重置用户信息

export const MOCK_STORE = 'mock_store' // 通过mockjs拦截获得商铺商品数据

export const MOCK_RATING = 'mock_rating' // 通过mockjs拦截获得商铺评价数据

export const MOCK_INFO = 'mock_info' // 通过mockjs拦截获得商铺信息

export const Add_COUNT = "add_count" // 增加订单商品数目

export const DECREASE_COUNT = "decrease_count" // 小勺订单商品数目