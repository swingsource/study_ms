import instance from '@/util/http'

export const addChapter = params => {
    return instance({
        url: '/api/chapter/add',
        method: 'post',
        data: params
    })
}
