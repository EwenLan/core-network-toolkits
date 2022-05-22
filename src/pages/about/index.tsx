import "./index.css"
import { Typography } from "antd"
const { Title, Text } = Typography

export function About(): JSX.Element {
    return (
        <div className="about-page">
            <Title>About</Title>
            <Text>
                This is a template of single page application which using the technology of React and Antd.
                It provides 2 layers of navigation and helps you to make different function on different pages.
            </Text>
        </div>
    )
}