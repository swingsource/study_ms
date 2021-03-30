// 把一维数组按照每组个数拆分为二维数组
export const groupArray = (arr, grounpNum) => {
  return Array
    .from(Array(Math.ceil(arr.length / grounpNum)))
    .map((_, i) => {
      return arr.slice(grounpNum * i, grounpNum * (i + 1))
    })
}

// 前端分页方法
export const fePagination = (originList, pageSize, pageNum) => {
    return originList.slice(pageSize * (pageNum - 1), pageSize * pageNum)
}

// spider result: list => tree
export const spiderListToTree = (targetList) => {
    // 根据 chapter_level_two_parent_id 字段将数组转为二维数组
    const fieldList = []
    targetList.forEach(item => {
        fieldList.push(item.chapter_level_two_parent_id)
    })
    //// fieldList 去重
    const fieldListSingle = Array.from(new Set(fieldList))
    //// 根据 fieldListSingle 中的 chapter_level_two_parent_id 将原数组转成二维
    /// 这样得到的每个子数组都是同一父节点下的子节点了
    const targetList2d = []
    fieldListSingle.forEach(level2Id => {
        const tempList = []
        targetList.forEach(item => {
            if (item.chapter_level_two_parent_id === level2Id) {
                tempList.push(item)
            }
        })
        targetList2d.push(tempList)
    })

    // 将二维数组转换为tree
    const resultList = []
    targetList2d.forEach(list => {
        const tempObj = {}
        // parent node
        tempObj.parentId = 0
        tempObj.name = list[0]['chapter_level_one_name']
        tempObj.parentSortIndex = list[0]['parent_sort_index']
        tempObj.children = []
        list.length && list.forEach(item => {
            const obj = {}
            obj.sortIndex = item.sort_index
            obj.name = item.chapter_level_two_name
            obj.content = item.book_content
            tempObj.children.push(obj)
            // 子数组按照sortIndex排序
            tempObj.children.sort((a, b) => {
                return a.sortIndex - b.sortIndex
            })
        })
        resultList.push(tempObj)
        // 数组按照parentSortIndex排序
        resultList.sort((a, b) => {
            return a.parentSortIndex - b.parentSortIndex
        })
    })
    return resultList
}
