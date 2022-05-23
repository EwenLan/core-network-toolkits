import { Col, Input, InputNumber, Row } from "antd"
import { useState } from "react"
import { TitledFunction } from "../../templates/titledfunction"
import { Typography } from "antd"
const { Text } = Typography

const nriStartedBitPosition = 24n
const nriBitMask = 0x00ffffffn

export function PTMSIDecoder() {
    return (
        <TitledFunction title="PTMSI Decoder" content={<PTMSIDecoderApp />} />
    )
}

interface decodeInputPropsType {
    ptmsi: bigint
    nriLength: bigint
}


// DD1B4053 => 3
// F41C9A07 => 3
function PTMSIDecoderApp() {
    const [ptmsi, setPtmsi] = useState(0n)
    const [nriLength, setNRILength] = useState(5n)
    return (
        <div>
            <Row align="middle" gutter={[64, 64]}>
                <Col flex="120px">
                    <Text>PTMSI</Text>
                </Col>
                <Col flex="auto">
                    <Input placeholder="Hexadecimal PTMSI" onChange={(e) => {
                        setPtmsi(BigInt(e.target.value))
                    }}></Input>
                </Col>
            </Row>
            <Row align="middle" gutter={[64, 64]}>
                <Col flex="120px">
                    <Text>NRI Length</Text>
                </Col>
                <Col flex="auto">
                    <InputNumber defaultValue={5} min={1} max={10} onChange={(e) => {
                        setNRILength(BigInt(e))
                    }} />
                </Col>
            </Row>
            <DecodeResult ptmsi={ptmsi} nriLength={nriLength} />
        </div>
    )
}

function DecodeResult(props: decodeInputPropsType) {
    const shiftSteps = nriStartedBitPosition - props.nriLength
    console.log(`nri len: ${props.nriLength}`)
    console.log(`ptmsi: ${props.ptmsi}`)
    const maskedPtmsi = props.ptmsi & nriBitMask
    console.log(`masked ptmsi: ${maskedPtmsi.toString()}`)
    const nri = maskedPtmsi >> shiftSteps
    console.log(`nri: ${nri.toString()}`)
    return (
        <p>{JSON.stringify(nri)}</p>
    )
}