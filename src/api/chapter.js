import instance from '@/util/http'

/**
 * 添加目录
 * @param params
 * @returns {AxiosPromise}
 */
export const addChapter = params => {
    return instance({
        url: '/api/chapter/add',
        method: 'post',
        data: params
    })
}

/**
 * 获取目录列表
 * @param params
 * @returns {AxiosPromise}
 */
export const getChapterList = params => {
    return instance({
        url: '/api/chapter/getChapterList',
        method: 'get',
        params
    })
}

/**
 * 修改目录
 * @param params
 * @returns {AxiosPromise}
 */
export const updateChapter = params => {
    return instance({
        url: '/api/chapter/update',
        method: 'post',
        data: params
    })
}

/**
 * 删除目录
 * @param params
 * @returns {AxiosPromise}
 */
export const delChapter  = params => {
    return instance({
        url: '/api/chapter/del',
        method: 'post',
        data: params
    })
}
