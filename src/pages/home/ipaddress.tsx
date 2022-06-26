import { Input } from "antd"
import { useState } from "react"
import { TitledFunction } from "../../templates/titledfunction"
import { KeyValuePair, KeyValuePairDirection } from "./common"

const hexadecimalIPAddressLength = 8
const hexadecimalIPMasks = [0xff000000, 0x00ff0000, 0x0000ff00, 0x000000ff]
const hexadecimalIPShift = [24, 16, 8, 0]
const hexadecimalIPArrayLen = 4

export function IPAddressFormat() {
    return (
        <TitledFunction title="IP Address Format" content={<IPAddressFormatApp />} />
    )
}

function IPAddressFormatApp() {
    const [dotDecimalIP, setDotDecimalIP] = useState("")
    const handleHexadecimal = (e: React.ChangeEvent<HTMLInputElement>) => {
        let hexadecimalIP = e.target.value.replace(" ", "").replace("0x", "")
        while (hexadecimalIP.length < hexadecimalIPAddressLength) {
            hexadecimalIP += "0"
        }
        console.log(hexadecimalIP)
        const hexadecimalIPValue = Number.parseInt(hexadecimalIP, 16)
        let hexadecimalIPSubSegements = new Array(hexadecimalIPArrayLen)
        for (let i = 0; i < hexadecimalIPArrayLen; i++) {
            hexadecimalIPSubSegements[i] = (hexadecimalIPValue & hexadecimalIPMasks[i]) >>> hexadecimalIPShift[i]
        }
        console.log(hexadecimalIPSubSegements)
        const dotDecimalIPAddress = `${hexadecimalIPSubSegements[0]}.${hexadecimalIPSubSegements[1]}.` +
            `${hexadecimalIPSubSegements[2]}.${hexadecimalIPSubSegements[3]}`
        setDotDecimalIP(dotDecimalIPAddress)
    }
    return (
        <>
            <KeyValuePair title="Hexadecimal IPv4 Address" value={<Input onChange={handleHexadecimal} />} direction={KeyValuePairDirection.vertical} />
            <KeyValuePair title="Dot-Decimal IPv4 Address" value={<Input value={dotDecimalIP} />} direction={KeyValuePairDirection.vertical} />
        </>
    )
}