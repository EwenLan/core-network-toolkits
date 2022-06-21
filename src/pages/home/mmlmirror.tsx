import { Button } from "antd"
import TextArea from "antd/lib/input/TextArea"
import React, { useState } from "react"
import { ScriptTypeFromText } from "../../common/mml/mediation"
import { Script } from "../../common/mml/script"
import { TitledFunction } from "../../templates/titledfunction"
import { KeyValuePair, KeyValuePairDirection } from "./common"

export function MMLMirror() {
    return (
        <TitledFunction title="MML Mirror" content={<MMLMirrorApp />} />
    )
}

function MMLMirrorApp() {
    const [configurationSection, setConfigurationSection] = useState("")
    const [formattedScript, setFormattedScript] = useState("")
    const handleInputConfigurationSection = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setConfigurationSection(e.target.value)
    }
    const handleClick = () => {
        const inputScript = new Script(ScriptTypeFromText(configurationSection))
        inputScript.Sort()
        setFormattedScript(inputScript.ToString())
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
            <KeyValuePair title="Formatted Script" value={
                <TextArea allowClear={true} value={formattedScript} contentEditable={true} />}
                direction={KeyValuePairDirection.vertical}
            />
        </>
    )
}