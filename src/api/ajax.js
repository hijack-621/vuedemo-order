/* 
usage：发送异步请求；
return:
*/
import axios from 'axios'
export default function ajax(url, data = {}, type = 'GET') {
    return new Promise((resolve, reject) => {
        let promise
        if (type == 'GET') {
            let paramstr = '';
            Object.keys(data).forEach(item => {
                paramstr += item + '=' + data[item] + '&'
            })
            if (paramstr !== '') {
                paramstr = paramstr.substring(0, paramstr.lastIndexOf('&'));
                url = url + '?' + paramstr
            }
            promise = axios.get(url); //axios 请求返回一个promise对象！！！
        } else { //发送post请求
            promise = axios.post(url, data);
        }
        promise.then(response => {
                resolve(response.data)
            }).catch(error => {
                reject(error)
            }) //错误处理
    })

}