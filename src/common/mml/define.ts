export type VerbType = string

export enum ParameterValueType {
    Enum,
    String,
}

export interface TextType {
    ToString(): string
    GetKey(): string
    Sortable(): boolean
}

export interface ParameterType {
    name: string
    value: string
}

export interface ParameterInnerType extends ParameterType {
    valueType: ParameterValueType
}

export interface PrototypeType {
    verb: VerbType
    target: string
}

export interface CommandType {
    prototype: PrototypeType
    parameters: ParameterType[]
}

export type ScriptType = TextType[]
