import instance from '../util/http'

/**
 * 获取评论列表
 * @param params
 * @returns {AxiosPromise}
 */
export const getCommentList = params => {
    return instance({
        url: '/api/comment/getCommentList',
        method: 'get',
        params
    })
}

/**
 * 添加评论
 * @param params
 * @returns {AxiosPromise}
 */
export const addComment = params => {
    return instance({
        url: '/api/comment/add',
        method: 'post',
        data: params
    })
}

/**
 * 删除评论
 * @param params
 * @returns {AxiosPromise}
 */
export const delComment = params => {
    return instance({
        url: '/api/comment/del',
        method: 'post',
        data: params
    })
}
