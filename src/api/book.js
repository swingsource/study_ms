import instance from '@/util/http'

/**
 * 获取书籍列表
 * @param params
 * @returns {AxiosPromise}
 */
export const getBookList = params => {
    return instance({
        url: '/api/book/getBookList',
        method: 'get',
        params
    })
}

/**
 * 添加书籍
 * @param params
 * @returns {AxiosPromise}
 */
export const addBook = params => {
    return instance({
        url: '/api/book/add',
        method: 'post',
        data: params
    })
}

/**
 * 修改书籍
 * @param params
 * @returns {AxiosPromise}
 */
export const updateBook = params => {
    return instance({
        url: '/api/book/update',
        method: 'post',
        data: params
    })
}

/**
 * 删除书籍
 * @param params
 * @returns {AxiosPromise}
 */
export const delBook = params => {
    return instance({
        url: '/api/book/del',
        method: 'post',
        data: params
    })
}
