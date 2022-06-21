import { QuickSortObjects } from "../sort/sort"
import { ScriptType } from "./define"

export class Script {
    commands: ScriptType
    constructor(commands?: ScriptType) {
        if (typeof (commands) == "undefined") {
            this.commands = []
            return
        }
        this.commands = commands.map((value) => Object.create(value))
    }
    ToString(): string {
        if (this.commands.length === 0) {
            return ""
        }
        let scriptText = this.commands[0].ToString()
        for (let i = 1; i < this.commands.length; i++) {
            scriptText += `\n${this.commands[i].ToString()}`
        }
        return scriptText
    }
    Clone(): Script {
        const newCommands = this.commands.map((value) => Object.create(value))
        return new Script(newCommands)
    }
    Sort() {
        const sortableCommands = this.commands.filter(v => v.Sortable() === true)
        this.commands = QuickSortObjects(sortableCommands) as ScriptType
    }
}