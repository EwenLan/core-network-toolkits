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
        case VerbType.Ping:
            return VerbType.Ping
        case VerbType.List:
            return VerbType.List
        case VerbType.Display:
            return VerbType.Display
        default:
            return VerbType.Empty
    }
}

function GetFirstNonEmptyIndex(words: string[], startIndex: number): [number, string] {
    let i = startIndex
    for (; i < words.length; i++) {
        if (words[i] !== "") {
            return [i, words[i]]
        }
    }
    return [i, ""]
}

export function PrototypeFromText(prototypeText: string): PrototypeType {
    const trimedPrototypeText = prototypeText.toUpperCase().trim()
    const words = trimedPrototypeText.split(" ")
    let [firstIndex, firstWord] = GetFirstNonEmptyIndex(words, 0)
    let [, secondWord] = GetFirstNonEmptyIndex(words, firstIndex + 1)
    return {
        verb: VerbTypeFromString(firstWord),
        target: secondWord,
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