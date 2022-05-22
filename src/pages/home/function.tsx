import { TitledFunction } from "../../templates/titledfunction"
import { Typography } from "antd"
const { Text } = Typography

export function Func() {
    return (
        <TitledFunction title="Function" content={<Text>Function</Text>} />
    )
}