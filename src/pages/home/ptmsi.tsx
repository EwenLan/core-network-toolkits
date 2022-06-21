import { Input, InputNumber } from "antd"
import React, { useState } from "react"
import { TitledFunction } from "../../templates/titledfunction"
import { KeyValuePair } from "./common"
import "./common.css"

const nriBitMask = 0x00ffffff
const allocatedByBitMask = 0xc0000000

const nriStartedBitPosition = 24
const allocatedByShiftBits = 30

export function PTMSIDecoder() {
    return (
        <TitledFunction title="PTMSI Decoder" content={<PTMSIDecoderApp />} />
    )
}

enum allocatedByOptions {
    VLR = "VLR",
    SGSN = "SGSN"
}

interface decodeInputPropsType extends React.HtmlHTMLAttributes<HTMLDivElement> {
    ptmsi: number
    nriLength: number
}


function PTMSIDecoderApp() {
    const [ptmsi, setPtmsi] = useState(0)
    const [nriLength, setNRILength] = useState(5)

    const handleInputPTMSI = (e: React.ChangeEvent<HTMLInputElement>) => {
        const valueStr = e.target.value.replaceAll(" ", "")
        setPtmsi(Number.parseInt(valueStr, 16))
    }
    const handleInputNriLength = (e: number) => {
        setNRILength(e)
    }

    return (
        <div>
            <KeyValuePair title="PTMSI" value={
                <Input placeholder="Hexadecimal PTMSI" onChange={handleInputPTMSI} />
            }
            />
            <KeyValuePair title="NRI Length" value={
                <InputNumber defaultValue={5} min={0} max={10} onChange={handleInputNriLength} />
            } />
            <DecodeResult ptmsi={ptmsi} nriLength={nriLength} />
        </div>
    )
}

function getAllocatedBy(ptmsi: number): allocatedByOptions {
    const allocatedByIndicator = (ptmsi & allocatedByBitMask) >>> allocatedByShiftBits
    return [
        allocatedByOptions.VLR,
        allocatedByOptions.VLR,
        allocatedByOptions.VLR,
        allocatedByOptions.SGSN,
    ][allocatedByIndicator]
}

function getNri(ptmsi: number, nriLength: number) {
    const shiftSteps = nriStartedBitPosition - nriLength
    const maskedPtmsi = ptmsi & nriBitMask
    return maskedPtmsi >>> shiftSteps
}

function DecodeResult(props: decodeInputPropsType) {
    return (
        <>
            <KeyValuePair title="Allocated By" value={getAllocatedBy(props.ptmsi)} />
            <KeyValuePair title="NRI" value={getNri(props.ptmsi, props.nriLength).toString()} />
        </>
    )
}

