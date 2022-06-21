import { PrototypeType, VerbType, ParameterType, CommandType } from "./define"
import { PrototypeFromText, ParameterFromText, ParametersFromText, CommandFromText } from "./mediation"

// PrototypeFromText
interface PrototypeTestType {
    name: string
    prototypeText: string
    expect: PrototypeType
}
test("normal prototype test case", () => {
    const testCaseList: PrototypeTestType[] = [
        {
            name: "normal upper case",
            prototypeText: "ADD MMEID",
            expect: {
                verb: VerbType.Add,
                target: "MMEID",
            }
        },
        {
            name: "normal lower case",
            prototypeText: "add mmeid",
            expect: {
                verb: VerbType.Add,
                target: "MMEID",
            }
        }
    ]
    testCaseList.forEach(element => {
        const prototype = PrototypeFromText(element.prototypeText)
        expect(prototype).toStrictEqual(element.expect)
    })
})

// ParameterFromText
interface ParameterTestType {
    name: string
    parameterText: string
    expect: ParameterType
}
test("normal parameter test case", () => {
    const testCaseList: ParameterTestType[] = [
        {
            name: "normal upper case",
            parameterText: `MCC="460"`,
            expect: {
                name: "MCC",
                value: `"460"`,
            }
        },
        {
            name: "upper case with space at end",
            parameterText: `MCC="460"  `,
            expect: {
                name: "MCC",
                value: `"460"`,
            }
        },
        {
            name: "upper case with space at begin",
            parameterText: `  MCC="460"`,
            expect: {
                name: "MCC",
                value: `"460"`,
            }
        },
        {
            name: "upper case with space at both directions",
            parameterText: `  MCC="460"   `,
            expect: {
                name: "MCC",
                value: `"460"`,
            }
        },
        {
            name: "upper case with space around equal",
            parameterText: `MCC = "460"`,
            expect: {
                name: "MCC",
                value: `"460"`,
            }
        },
        {
            name: "upper case with space in the quote",
            parameterText: `MCC = " 460 "`,
            expect: {
                name: "MCC",
                value: `" 460 "`,
            }
        },
        {
            name: "lower case with spaces",
            parameterText: ` mcc = " 460 " `,
            expect: {
                name: "MCC",
                value: `" 460 "`,
            }
        },
    ]
    testCaseList.forEach(element => {
        const parameter = ParameterFromText(element.parameterText)
        expect(parameter).toStrictEqual(element.expect)
    })
})

// ParametersFromText
interface ParametersTestType {
    name: string
    parametersText: string
    expect: ParameterType[]
}
test("normal parameters test case", () => {
    const testCaseList: ParametersTestType[] = [
        {
            name: "normal upper case",
            parametersText: `MCC="460",MNC="01",MMEGI="8001",MMEC="01"`,
            expect: [
                { name: "MCC", value: `"460"` },
                { name: "MNC", value: `"01"` },
                { name: "MMEGI", value: `"8001"` },
                { name: "MMEC", value: `"01"` },
            ]
        }
    ]
    testCaseList.forEach(element => {
        const parameters = ParametersFromText(element.parametersText)
        expect(parameters).toStrictEqual(element.expect)
    })
})

// CommandFromText
interface CommandTestType {
    name: string
    commandText: string
    expect: CommandType
}
test("normal command test case", () => {
    const testCaseList: CommandTestType[] = [
        {
            name: "normal upper case",
            commandText: `ADD MMEID: MCC="460",MNC="01",MMEGI="8001",MMEC="01";`,
            expect: {
                prototype: {
                    verb: VerbType.Add,
                    target: "MMEID",
                },
                parameters: [
                    { name: "MCC", value: `"460"` },
                    { name: "MNC", value: `"01"` },
                    { name: "MMEGI", value: `"8001"` },
                    { name: "MMEC", value: `"01"` },
                ]
            }
        },
    ]
    testCaseList.forEach(element => {
        const command = CommandFromText(element.commandText)
        expect(command).toStrictEqual(element.expect)
    })
})