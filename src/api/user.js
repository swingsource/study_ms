import instance from '@/util/http'

/**
 * 获取用户列表
 * @param data
 * @returns {AxiosPromise}
 */
export const getUserList = () => {
    return instance({
        url: '/api/user/getDate2',
        method: 'get'
    })
}
