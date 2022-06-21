export function SplitComma(sentense: string): string[] {
    let commaIndexes: number[] = [-1]
    let quoteMask = false
    for (let i = 0; i < sentense.length; i++) {
        switch (sentense.charAt(i)) {
            case "\"":
                quoteMask = !quoteMask
                break
            case ",":
                if (!quoteMask) {
                    commaIndexes.push(i)
                }
                break
        }
    }
    commaIndexes.push(sentense.length)
    let subSentenses: string[] = []
    for (let i = 0; i < commaIndexes.length - 1; i++) {
        subSentenses.push(sentense.substring(commaIndexes[i] + 1, commaIndexes[i + 1]))
    }
    return subSentenses
}