import instance from '@/util/http'

export const addTeach = params => {
    return instance({
        url: '/api/teach/add',
        method: 'post',
        data: params
    })
}
