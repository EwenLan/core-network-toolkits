import { TitledFunction } from "../../templates/titledfunction"
import { Typography } from "antd"
const { Text } = Typography

export function Welcome() {
    return (
        <TitledFunction title="Welcome" content={<Text>Welcome</Text>} />
    )
}