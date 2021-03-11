// 把一维数组按照每组个数拆分为二维数组
export const groupArray = (arr, grounpNum) => {
  return Array
    .from(Array(Math.ceil(arr.length / grounpNum)))
    .map((_, i) => {
      return arr.slice(grounpNum * i, grounpNum * (i + 1))
    })
}
