import { Command } from "./command"
import { CommandType, VerbType } from "./define"
import { Script } from "./script"

// ScriptToString
interface ScriptToStringTestType {
    name: string
    commands: CommandType[]
    expect: string
}
test("normal command string test case", () => {
    const testCaseList: ScriptToStringTestType[] = [
        {
            name: "normal upper case",
            commands: [
                {
                    // SET NE:NENAME="CloudUSN";
                    prototype: { verb: VerbType.Set, target: "NE" },
                    parameters: [{ name: "NENAME", value: `"CloudUSN"` }],
                },
                {
                    // SET NTPSYSTEMCFG:ISAUTHENABLE=TRUE; 
                    prototype: { verb: VerbType.Set, target: "NTPSYSTEMCFG" },
                    parameters: [{ name: "ISAUTHENABLE", value: "TRUE" }],
                },
                {
                    // ADD NTPUCASTCFG:IPV4ADDR="10.11.193.245",TYPE=Server,KEYID=12,
                    // ISPREFERRED=TRUE, ADDRFAMILY=IPv4, MAXPOLLINTERVAL=10, MINPOLLINTERVAL=3, 
                    // ISPREEMPT=TRUE, ISBURST=TRUE, ISIBURST=TRUE, PORTNUMBER=123;
                    prototype: { verb: VerbType.Add, target: "NTPUCASTCFG" },
                    parameters: [
                        { name: "IPV4ADDR", value: `"10.11.193.245"` },
                        { name: "TYPE", value: "Server" },
                        { name: "KEYID", value: "12" },
                        { name: "ISPREFERRED", value: "TRUE" },
                        { name: "ADDRFAMILY", value: "IPv4" },
                        { name: "MAXPOLLINTERVAL", value: "10" },
                        { name: "MINPOLLINTERVAL", value: "3" },
                        { name: "ISPREEMPT", value: "TRUE" },
                        { name: "ISBURST", value: "TRUE" },
                        { name: "ISIBURST", value: "TRUE" },
                        { name: "PORTNUMBER", value: "123" },
                    ],
                },
            ],
            expect: `SET NE: NENAME="CloudUSN";\n` +
                `SET NTPSYSTEMCFG: ISAUTHENABLE=TRUE;\n` +
                `ADD NTPUCASTCFG: ADDRFAMILY=IPV4, IPV4ADDR="10.11.193.245", ` +
                `ISBURST=TRUE, ISIBURST=TRUE, ISPREEMPT=TRUE, ISPREFERRED=TRUE, ` +
                `KEYID=12, MAXPOLLINTERVAL=10, MINPOLLINTERVAL=3, PORTNUMBER=123, TYPE=SERVER;`
        },
    ]
    testCaseList.forEach(element => {
        const command = new Script(element.commands)
        expect(command.ToString()).toStrictEqual(element.expect)
    })
})

// ScriptSort
interface ScriptSortTestType {
    name: string
    commands: CommandType[]
    expect: Command[]
}
test("normal command sort test case", () => {
    const testCaseList: ScriptSortTestType[] = [
        {
            name: "normal upper case",
            commands: [
                {
                    // SET NE:NENAME="CloudUSN";
                    prototype: { verb: VerbType.Set, target: "NE" },
                    parameters: [{ name: "NENAME", value: `"CloudUSN"` }],
                },
                {
                    // SET NTPSYSTEMCFG:ISAUTHENABLE=TRUE; 
                    prototype: { verb: VerbType.Set, target: "NTPSYSTEMCFG" },
                    parameters: [{ name: "ISAUTHENABLE", value: "TRUE" }],
                },
                {
                    // ADD NTPUCASTCFG:IPV4ADDR="10.11.193.245",TYPE=Server,KEYID=12,
                    // ISPREFERRED=TRUE, ADDRFAMILY=IPv4, MAXPOLLINTERVAL=10, MINPOLLINTERVAL=3, 
                    // ISPREEMPT=TRUE, ISBURST=TRUE, ISIBURST=TRUE, PORTNUMBER=123;
                    prototype: { verb: VerbType.Add, target: "NTPUCASTCFG" },
                    parameters: [
                        { name: "IPV4ADDR", value: `"10.11.193.245"` },
                        { name: "TYPE", value: "Server" },
                        { name: "KEYID", value: "12" },
                        { name: "ISPREFERRED", value: "TRUE" },
                        { name: "ADDRFAMILY", value: "IPv4" },
                        { name: "MAXPOLLINTERVAL", value: "10" },
                        { name: "MINPOLLINTERVAL", value: "3" },
                        { name: "ISPREEMPT", value: "TRUE" },
                        { name: "ISBURST", value: "TRUE" },
                        { name: "ISIBURST", value: "TRUE" },
                        { name: "PORTNUMBER", value: "123" },
                    ],
                },
            ],
            expect: [
                new Command({
                    prototype: { verb: VerbType.Add, target: "NTPUCASTCFG" },
                    parameters: [
                        { name: "IPV4ADDR", value: `"10.11.193.245"` },
                        { name: "TYPE", value: "Server" },
                        { name: "KEYID", value: "12" },
                        { name: "ISPREFERRED", value: "TRUE" },
                        { name: "ADDRFAMILY", value: "IPv4" },
                        { name: "MAXPOLLINTERVAL", value: "10" },
                        { name: "MINPOLLINTERVAL", value: "3" },
                        { name: "ISPREEMPT", value: "TRUE" },
                        { name: "ISBURST", value: "TRUE" },
                        { name: "ISIBURST", value: "TRUE" },
                        { name: "PORTNUMBER", value: "123" },
                    ],
                }),
                new Command({
                    prototype: { verb: VerbType.Set, target: "NE" },
                    parameters: [{ name: "NENAME", value: `"CloudUSN"` }],
                }),
                new Command({
                    prototype: { verb: VerbType.Set, target: "NTPSYSTEMCFG" },
                    parameters: [{ name: "ISAUTHENABLE", value: "TRUE" }],
                }),
            ]
        },
    ]
    testCaseList.forEach(element => {
        const script = new Script(element.commands)
        const newScript = script.Clone()
        newScript.Sort()
        expect(newScript.commands).toStrictEqual(element.expect)
    })
})