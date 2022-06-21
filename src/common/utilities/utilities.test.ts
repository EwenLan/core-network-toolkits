import { SplitComma } from "./utilities"

// SplitComma
interface SplitCommaTestType {
    name: string
    sentenseWithComma: string
    expected: string[]
}
test("normal split comma", () => {
    const testCaseList: SplitCommaTestType[] = [
        {
            name: "normal empty sentense case",
            sentenseWithComma: "",
            expected: [""]
        },
        {
            name: "normal sentense case",
            sentenseWithComma: `MCC="460",MNC="01",MMEGI="8001",MMEC="01";`,
            expected: [`MCC="460"`, `MNC="01"`, `MMEGI="8001"`, `MMEC="01";`]
        },
        {
            name: "comma in quotes",
            sentenseWithComma: `MCC="460,",MNC="01",MMEGI="8001",MMEC="01";`,
            expected: [`MCC="460,"`, `MNC="01"`, `MMEGI="8001"`, `MMEC="01";`]
        },
    ]
    testCaseList.forEach(element => {
        const subSentenses = SplitComma(element.sentenseWithComma)
        expect(subSentenses).toStrictEqual(element.expected)
    })
})