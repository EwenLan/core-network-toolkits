import { QuickSortObjects } from "../sort/sort"
import { CommandType, ParameterInnerType, ParameterType, ParameterValueType, PrototypeType, TextType, VerbType } from "./define"


const emptyPrototype: PrototypeType = {
    verb: "",
    target: "",
}

const emptyParameter: ParameterInnerType = {
    name: "",
    value: "",
    valueType: ParameterValueType.String,
}

export class Prototype implements PrototypeType {
    verb: VerbType
    target: string
    constructor(prototype?: PrototypeType) {
        if (typeof (prototype) == "undefined") {
            this.verb = emptyPrototype.verb
            this.target = emptyPrototype.target
            return
        }
        this.verb = prototype.verb
        this.target = prototype.target
    }
    ToString(): string {
        if (this.verb === "") {
            return this.target
        }
        return `${this.verb} ${this.target}`
    }
}

export class Parameter implements ParameterInnerType {
    valueType: ParameterValueType
    name: string
    value: string
    constructor(parameter?: ParameterType) {
        if (typeof (parameter) == "undefined") {
            this.name = emptyParameter.name
            this.value = emptyParameter.value
            this.valueType = emptyParameter.valueType
            return
        }
        this.name = parameter.name.toUpperCase()
        this.valueType = ParameterValueType.Enum
        let value = parameter.value.trim()
        if (value.startsWith(`"`) && value.endsWith(`"`)) {
            this.valueType = ParameterValueType.String
        }
        if (this.valueType === ParameterValueType.String) {
            this.value = value.substring(1, value.length - 1)
        } else {
            this.value = value.toUpperCase()
        }
    }
    GetKey(): string {
        return this.name
    }
    GetValueString(): string {
        switch (this.valueType) {
            case ParameterValueType.String:
                return `"${this.value}"`
            default:
                break
        }
        return `${this.value}`
    }
    ToString(): string {
        if (this.name === "") {
            return ""
        }
        return `${this.name}=${this.GetValueString()}`
    }
    ExportParameterType(): ParameterType {
        return {
            name: this.name,
            value: this.GetValueString(),
        }
    }
}

export class Parameters {
    parameters: Parameter[]
    constructor(parameters?: ParameterType[]) {
        if (typeof (parameters) == "undefined") {
            this.parameters = []
            return
        }
        const parametersInner = parameters.map((value) => new Parameter(value))
        this.parameters = QuickSortObjects(parametersInner) as Parameter[]
    }
    ToString(): string {
        if (this.parameters.length === 0) {
            return ""
        }
        let parametersString = this.parameters[0].ToString()
        for (let i = 1; i < this.parameters.length; i++) {
            parametersString += `, ${this.parameters[i].ToString()}`
        }
        return parametersString
    }
}

export class Command implements TextType {
    prototype: Prototype
    parameters: Parameters
    constructor(command?: CommandType) {
        if (typeof (command) == "undefined") {
            this.prototype = new Prototype()
            this.parameters = new Parameters()
            return
        }
        this.prototype = new Prototype(command.prototype)
        this.parameters = new Parameters(command.parameters)
    }
    ToString(): string {
        return `${this.prototype.ToString()}: ${this.parameters.ToString()};`
    }
    GetKey(): string {
        return this.ToString()
    }
    ExportCommandType(): CommandType {
        return {
            prototype: {
                verb: this.prototype.verb,
                target: this.prototype.target,
            },
            parameters: this.parameters.parameters.map((v) => v.ExportParameterType())
        }
    }
    Sortable(): boolean {
        return true
    }
}

export class PlainText implements TextType {
    text: string
    constructor(s: string) {
        this.text = s
    }
    ToString(): string {
        return this.text
    }
    GetKey(): string {
        return this.text
    }
    Sortable(): boolean {
        return false
    }
}