import instance from '@/util/http'

/**
 * 添加内容
 * @param params
 * @returns {AxiosPromise}
 */
export const addContent = params => {
    return instance({
        url: '/api/content/add',
        method: 'post',
        data: params
    })
}

/**
 * 根据teachId 和 chapterId 获取内容
 * @param params
 * @returns {AxiosPromise}
 */
export const getContent = params => {
    return instance({
        url: '/api/content/getContent',
        method: 'get',
        params
    })
}

export const updateContent = params => {
    return instance({
        url: '/api/content/update',
        method: 'post',
        data: params
    })
}
