export enum VerbType {
    Empty = "",
    Add = "ADD",
    Modify = "MOD",
    Set = "SET",
    Remove = "RMV",
}

export enum ParameterValueType {
    Enum,
    String,
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