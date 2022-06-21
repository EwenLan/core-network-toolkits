import { SplitComma } from "../utilities/utilities"
import { Command, PlainText } from "./command"
import { PrototypeType, ParameterType, CommandType, VerbType, ScriptType } from "./define"

const colonSplitedSections = 2
const scriptSplitter = "\n"
const commentStarter = "/"

function VerbTypeFromString(verbText: string): VerbType {
    switch (verbText) {
        case VerbType.Add:
            return VerbType.Add
        case VerbType.Modify:
            return VerbType.Modify
        case VerbType.Remove:
            return VerbType.Remove
        case VerbType.Set:
            return VerbType.Set
        default:
            return VerbType.Empty
    }
}

export function PrototypeFromText(prototypeText: string): PrototypeType {
    const trimedPrototypeText = prototypeText.toUpperCase().trim()
    const [verb, target] = trimedPrototypeText.split(" ")
    return {
        verb: VerbTypeFromString(verb),
        target: target,
    }
}

export function ParameterFromText(parameterText: string): ParameterType {
    const [name, value] = parameterText.split("=").map((value) => value.trim())
    return {
        name: name.toUpperCase(),
        value: value,
    }
}

export function ParametersFromText(parametersText: string): ParameterType[] {
    return SplitComma(parametersText).map((value) => ParameterFromText(value))
}

export function CommandFromText(commandText: string): CommandType {
    const trimedCommandText = commandText.trim().replace(/;$/, "")
    const [prototypeText, parametersText] = trimedCommandText.split(":", colonSplitedSections)
    return {
        prototype: PrototypeFromText(prototypeText),
        parameters: ParametersFromText(parametersText),
    }
}

export function ScriptTypeFromText(scriptText: string): ScriptType {
    const rows = scriptText.split(scriptSplitter)
    let newScripts: ScriptType = []
    rows.forEach((v) => {
        if (v.startsWith(commentStarter) || v.trim() === "") {
            newScripts.push(new PlainText(v))
        } else {
            newScripts.push(new Command(CommandFromText(v)))
        }

    })
    return newScripts
}