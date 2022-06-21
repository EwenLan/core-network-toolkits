import { SortedType } from "./define"

function quickSortObjectsCore(objectList: SortedType[], startIndex: number, endIndex: number) {
    if (endIndex - startIndex < 1) {
        return
    }
    let currLeft = startIndex
    let currRight = endIndex
    let pivot = objectList[currLeft]
    while (currLeft < currRight) {
        while ((currRight > currLeft) && objectList[currRight].GetKey() >= pivot.GetKey()) {
            currRight -= 1
        }
        while ((currRight > currLeft) && objectList[currLeft].GetKey() <= pivot.GetKey()) {
            currLeft += 1
        }
        if (objectList[currLeft].GetKey() > objectList[currRight].GetKey()) {
            const temp = objectList[currLeft]
            objectList[currLeft] = objectList[currRight]
            objectList[currRight] = temp
        }
    }
    objectList[startIndex] = objectList[currLeft]
    objectList[currLeft] = pivot
    quickSortObjectsCore(objectList, startIndex, currLeft - 1)
    quickSortObjectsCore(objectList, currRight + 1, endIndex)
}

export function QuickSortObjects(objectList: SortedType[]): SortedType[] {
    if (objectList.length <= 1) {
        return objectList
    }
    let sortedList = objectList.slice()
    quickSortObjectsCore(sortedList, 0, sortedList.length - 1)
    return sortedList
}