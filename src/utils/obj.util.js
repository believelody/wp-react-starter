export const compare2Obj = (a, b) => Object.entries(a).toString() === Object.entries(b).toString()

export const objValues = obj => Object.values(obj)
export const objKeys = obj => Object.keys(obj)
export const objEntries = obj => Object.entries(obj)

export const recursiveChildren = obj => {
    return objValues(obj).map(item => item?.children ? recursiveChildren(item) : item)
}

export const recursiveParent = (obj) => {
    return objValues(obj).map(item => item?.parent ? recursiveParent(item) : item)
}