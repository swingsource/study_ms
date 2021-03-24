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
