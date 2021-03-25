import instance from '@/util/http'

/**
 * 获取用户列表
 * @param
 * @returns {AxiosPromise}
 */
export const getUserList = (params) => {
    return instance({
        url: '/api/user/getUserList',
        method: 'get',
        params
    })
}

/**
 * 添加新用户
 * @param params
 * @returns {*}
 */
export const addUser = params => {
    return instance({
        url: '/api/user/add',
        method: 'post',
        data: params
    })
}

/**
 * 修改用户
 * @param params
 * @returns {*}
 */
export const updateUser = params => {
    return instance({
        url: '/api/user/update',
        method: 'post',
        data: params
    })
}

/**
 * 删除用户
 * @param params
 * @returns {*}
 */
export const delUser = params => {
    return instance({
        url: '/api/user/del',
        method: 'post',
        data: params
    })
}
