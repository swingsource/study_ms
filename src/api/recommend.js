import instance from '@/util/http'

/**
 * 获取推荐资源列表
 * @param params
 * @returns {AxiosPromise}
 */
export const getRecommendList = params => {
    return instance({
        url: '/api/resource/getResourceList',
        method: 'get',
        params
    })
}

/**
 * 添加资源
 * @param params
 * @returns {AxiosPromise}
 */
export const addRecommend = params => {
    return instance({
        url: '/api/resource/add',
        method: 'post',
        data: params
    })
}

/**
 * 删除资源
 * @param params
 * @returns {AxiosPromise}
 */
export const delRecommend = params => {
    return instance({
        url: '/api/resource/del',
        method: 'post',
        data: params
    })
}

/**
 * 审批通过
 * @param params
 * @returns {AxiosPromise}
 */
export const agree = params => {
    return instance({
        url: '/api/resource/agree',
        method: 'post',
        data: params
    })
}

/**
 * 审批不通过
 * @param params
 * @returns {AxiosPromise}
 */
export const reject = params => {
    return instance({
        url: '/api/resource/reject',
        method: 'post',
        data: params
    })
}
