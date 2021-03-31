import instance from '@/util/http'

/**
 * 添加教程
 * @param params
 * @returns {AxiosPromise}
 */
export const addTeach = params => {
    return instance({
        url: '/api/teach/add',
        method: 'post',
        data: params
    })
}

/**
 * 获取教程列表
 * @param params
 * @returns {AxiosPromise}
 */
export const getTeachList = params => {
    return instance({
        url: '/api/teach/getTeachList',
        method: 'get',
        params
    })
}

/**
 * 修改教程
 * @param params
 * @returns {AxiosPromise}
 */
export const updateTeach = params => {
    return instance({
        url: '/api/teach/update',
        method: 'post',
        data: params
    })
}

/**
 * 删除教程
 * @param params
 * @returns {AxiosPromise}
 */
export const delTeach = params => {
    return instance({
        url: '/api/teach/del',
        method: 'post',
        data: params
    })
}
