import instance from '@/util/http'

export const upload = params => {
    return instance({
        url: '/api/upload',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: params
    })
}
