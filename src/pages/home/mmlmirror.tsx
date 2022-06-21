import { Button, Row, Upload } from "antd"
import TextArea from "antd/lib/input/TextArea"
import { RcFile } from "antd/lib/upload"
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
    const [downloadDisable, setDownloadDisable] = useState(true)
    const handleInputConfigurationSection = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setConfigurationSection(e.target.value)
    }
    const handleClick = () => {
        const inputScript = new Script(ScriptTypeFromText(configurationSection))
        inputScript.Sort()
        setFormattedScript(inputScript.ToString())
        setDownloadDisable(false)
    }
    const handleUploadFile: ((file: RcFile) => boolean) = (file) => {
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = (res) => {
            if (res.target) {
                setConfigurationSection(res.target.result as string)
            }
        }
        return false
    }
    const downloadFormattedFile = () => {
        const downloadLink = document.createElement("a")
        downloadLink.download = "Formatted Script.txt"
        const blob = new Blob([formattedScript])
        downloadLink.href = URL.createObjectURL(blob)
        downloadLink.click()
    }
    return (
        <>
            <KeyValuePair title="Configuration Section" value={
                <Upload action="" accept="plain/text" beforeUpload={handleUploadFile} showUploadList={false}>
                    <Button children="Upload" />
                </Upload>
            }
                direction={KeyValuePairDirection.horizontal}
            />
            <KeyValuePair title="" value={
                <TextArea allowClear={true}
                    onChange={handleInputConfigurationSection} rows={6}
                    value={configurationSection}
                />}
                direction={KeyValuePairDirection.vertical}
            />
            <KeyValuePair title="Operation" value={
                <Row>
                    <Button children="Convert" type="primary" onClick={handleClick} />
                    <Button children="Download" onClick={downloadFormattedFile} disabled={downloadDisable} />
                </Row>
            } />
            <KeyValuePair title="Formatted Script" value={
                <TextArea allowClear={true} value={formattedScript} rows={6} />}
                direction={KeyValuePairDirection.vertical}
            />
        </>
    )
}