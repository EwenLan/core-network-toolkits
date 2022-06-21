import { SortedType } from "./define"
import { QuickSortObjects } from "./sort"

// QuickSortObjects
class SortTestType implements SortedType {
    key: string
    constructor(key: string) {
        this.key = key
    }
    GetKey(): string {
        return this.key
    }
}
test("sort normal objects", () => {
    const objectList = [
        new SortTestType("c"),
        new SortTestType("b"),
        new SortTestType("a"),
        new SortTestType("e"),
        new SortTestType("d"),
    ]
    const sortedObjects = QuickSortObjects(objectList)
    expect(sortedObjects).toStrictEqual([
        new SortTestType("a"),
        new SortTestType("b"),
        new SortTestType("c"),
        new SortTestType("d"),
        new SortTestType("e"),
    ]
    )
})