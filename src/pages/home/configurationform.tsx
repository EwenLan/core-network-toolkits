import { Button } from "antd"
import TextArea from "antd/lib/input/TextArea"
import React, { useState } from "react"
import { TitledFunction } from "../../templates/titledfunction"
import { KeyValuePair, KeyValuePairDirection } from "./common"

const configurationSeparator = "\n"

export function ConfigurationForm() {
    return (
        <TitledFunction title="Configuration Form" content={<ConfigurationFormApp />} />
    )
}

function ConfigurationFormApp() {
    const [configurationSection, setConfigurationSection] = useState("")
    const handleInputConfigurationSection = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setConfigurationSection(e.target.value)
    }
    const handleClick = () => {
    }
    return (
        <>
            <KeyValuePair title="Configuration Section" value={
                <TextArea allowClear={true}
                    onChange={handleInputConfigurationSection}
                />}
                direction={KeyValuePairDirection.vertical}
            />
            <KeyValuePair title="Operation" value={<Button children="Convert" type="primary" onClick={handleClick} />} />
        </>
    )
}