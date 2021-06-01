import Mock from 'mockjs'
import data from './data.json'

// 使用mockjs 向外分发三个接收，分别得到 data.jon 中不同属性里的数据
// 只要通过这个url 发送ajax请求，就会被mockjs拦截处理，得到第二个参数给定的数据
Mock.mock('/mockstore', { code: 0, data: data.goods})

Mock.mock('/mockrating', { code: 0, data: data.ratings})

Mock.mock('/mockinfo', { code: 0, data: data.info})