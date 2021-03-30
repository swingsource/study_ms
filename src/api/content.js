import instance from '@/util/http'

export const addContent = params => {
    return instance({
        url: '/api/content/add',
        method: 'post',
        data: params
    })
}
