import { Abi } from "viem"

export const removeQuotes = (jsonObject: any): Array<any> => {
  if (Array.isArray(jsonObject)) {
    // 如果是数组，则递归处理数组中的每个元素
    return jsonObject.map(removeQuotes)
  } else if (typeof jsonObject === 'object' && jsonObject !== null) {
    // 如果是对象，则递归处理对象的每个属性
    const updatedObject: any = {}
    for (const key in jsonObject) {
      const value = jsonObject[key]
      const updatedKey = key.replace(/\"/g, '')
      updatedObject[updatedKey] = removeQuotes(value)
    }
    return updatedObject
  } else {
    // 其他类型直接返回
    return jsonObject
  }
}