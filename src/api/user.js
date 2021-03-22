import instance from '@/util/http'

/**
 * 获取用户列表
 * @param 
 * @returns {AxiosPromise}
 */
export const getUserList = () => {
    return instance({
        url: '/api/user/getDate',
        method: 'get'
    })
}
