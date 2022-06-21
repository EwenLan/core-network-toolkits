import { QuickSortObjects } from "../sort/sort"
import { Command } from "./command"
import { CommandType } from "./define"

export class Script {
    commands: Command[]
    constructor(commands?: CommandType[]) {
        if (typeof (commands) == "undefined") {
            this.commands = []
            return
        }
        this.commands = commands.map((value) => new Command(value))
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
        const newCommands = this.commands.map((value) => value.ExportCommandType())
        return new Script(newCommands)
    }
    Sort() {
        this.commands = QuickSortObjects(this.commands) as Command[]
    }
}