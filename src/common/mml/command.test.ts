import { Command, Parameter, Parameters } from "./command"
import { PrototypeType, VerbType, ParameterType, CommandType } from "./define"
import { PrototypeFromText, ParameterFromText, ParametersFromText, CommandFromText } from "./mediation"

// Class Parameter
interface ParameterTestType {
    name: string
    parameter: ParameterType
    expect: string
}
test("parameter ToString test", () => {
    const testCaseList: ParameterTestType[] = [
        {
            name: "normal upper string case",
            parameter: { name: "MCC", value: `"460"` },
            expect: `MCC="460"`,
        },
        {
            name: "normal lower string case",
            parameter: { name: "mcc", value: `"460"` },
            expect: `MCC="460"`,
        },
        {
            name: "normal upper enum case",
            parameter: { name: "FUNC", value: `YES` },
            expect: `FUNC=YES`,
        },
        {
            name: "normal lower enum case",
            parameter: { name: "func", value: `yes` },
            expect: `FUNC=YES`,
        },
    ]
    testCaseList.forEach(element => {
        const got = (new Parameter(element.parameter))
        expect(got.ToString()).toStrictEqual(element.expect)
    })
})
test("null parameter ToString", () => {
    const got = new Parameter()
    expect(got.ToString()).toStrictEqual("")
})

// Class Parameters
interface ParametersTestType {
    name: string
    parameters: ParameterType[]
    expect: string
}
test("parameters ToString test", () => {
    const testCaseList: ParametersTestType[] = [
        {
            name: "normal 1 parameter upper string case",
            parameters: [
                { name: "FOO", value: `"BAR"` },
            ],
            expect: `FOO="BAR"`,
        },
        {
            name: "normal 2 parameters string case",
            parameters: [
                { name: "BBB", value: `"foo"` },
                { name: "AAA", value: `"FOO"` },
            ],
            expect: `AAA="FOO", BBB="foo"`,
        },
        {
            name: "normal 3 parameters string case",
            parameters: [
                { name: "BBB", value: `"foo"` },
                { name: "AAA", value: `"FOO"` },
                { name: "ccc", value: `foo` },
            ],
            expect: `AAA="FOO", BBB="foo", CCC=FOO`,
        },
    ]
    testCaseList.forEach(element => {
        const got = (new Parameters(element.parameters))
        expect(got.ToString()).toStrictEqual(element.expect)
    })
})

// CommandToString
interface CommandToStringTestType {
    name: string
    command: CommandType
    expect: string
}
test("normal command string test case", () => {
    const testCaseList: CommandToStringTestType[] = [
        {
            name: "normal upper case",
            command: {
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
            },
            expect: `ADD MMEID: MCC="460", MMEC="01", MMEGI="8001", MNC="01";`,
        },
    ]
    testCaseList.forEach(element => {
        const command = new Command(element.command)
        expect(command.ToString()).toStrictEqual(element.expect)
    })
})