import axios from 'axios';

import { message } from 'antd';

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
    baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/243364' : ''
})

const serviceLogin = axios.create({
    baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/243364' : ''
})

service.interceptors.request.use((config) => {
    config.data = Object.assign({}, config.data, {
        // authToken: window.localStorage.getItem('authToken')
        authToken: 'asdasdjoidsjfilkjskl'
    })
    return config
})

service.interceptors.response.use((resp) => {
    // console.log(resp)
    if(resp.data.code === 200) {
        return resp.data.data
    } else {
        message.error(resp.data.errMsg)
    }
})

export const getArticles = (offset, limited) => {
    return service.post('/api/v1/articleList', {offset, limited})
}

// 通过id删除文章
export const deleteArticle = (id) => {
    return service.post(`/api/v1/articleDelete/:${id}`)
}

export const articleDetail = (id) => {
    return service.post(`/api/v1/article/:${id}`)
}

// 修改文章
export const articleEdit = (params) => {
    const { id, ...data } = params;
    return service.post(`/api/v1/articleEdit/:${id}`, {...data})
}

// export const deleteArticle = (id) => {
//     return service.post(`/api/v1/articleDelete/:${id}`)
// }

export const getarticleChart = () => {
    return service.post(`/api/v1/articleAmount`)
}

// 获取通知列表
export const getNotifications = () => {
    return service.post('/api/v1/notifications')
}

export const loginApi = (params) => {
    return serviceLogin.post('/api/v1/login', params)
}