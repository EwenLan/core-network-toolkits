import "./index.css"
import { Alert, List, Space, Spin, Typography } from "antd"
import { useEffect, useState } from "react"
const { Title } = Typography

interface SoftwareBaseInfo {
    SoftwareVersion: string
    ProjectHome: string
    Author: string
    Email: string
    BuildDate: string
}

interface BackendVersionInfoType extends SoftwareBaseInfo {
    BaseGoVersion: string
}

interface FrontendVersionInfoType extends SoftwareBaseInfo {
    NodeJSVersion: string
}

interface InfoItem {
    title: string
    content: string
}

interface InfoListPropsType {
    title: string
    infoList: InfoItem[]
}

interface AsyncInfoListPropsType {
    isLoaded: boolean
    error: any
    title: string
    infoList: InfoItem[]
}

// FrontendVersionInfo
const FrontendVersion: FrontendVersionInfoType = {
    NodeJSVersion: "v16.14.2",
    SoftwareVersion: "0.7.6",
    ProjectHome: "https://github.com/EwenLan/core-network-toolkits",
    Author: "Ewen Lan",
    Email: "ewen_lan@outlook.com",
    BuildDate: "2022-07-17",
}

function InfoList(props: InfoListPropsType): JSX.Element {
    return (
        <>
            <List
                className="version-table"
                header={<div>{props.title}</div>}
                dataSource={props.infoList}
                bordered
                grid={{ gutter: 16, column: 3 }}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={item.title}
                            description={item.content}
                        />
                    </List.Item>
                )}
            />
        </>
    )
}

// FrontendVersionInfo
function FrontendVersionInfo(): JSX.Element {
    const versionInfo: InfoItem[] = [
        { title: "Base Node.js Version", content: FrontendVersion.NodeJSVersion },
        { title: "Software Version", content: FrontendVersion.SoftwareVersion },
        { title: "Build Date", content: FrontendVersion.BuildDate },
        { title: "Project Home", content: FrontendVersion.ProjectHome },
        { title: "Author", content: FrontendVersion.Author },
        { title: "Email", content: FrontendVersion.Email },
    ]
    return (
        <>
            <InfoList title="Frontend Version Info" infoList={versionInfo}></InfoList>
        </>
    )
}

function AsyncInfoList(props: AsyncInfoListPropsType): JSX.Element {
    if (props.error) {
        return <Alert
            message="Get Server Info Error"
            description={String(props.error)}
            type="error"
            showIcon
        />
    } else if (!props.isLoaded) {
        return <Spin />
    }
    return (
        <>
            <InfoList title="Backend Version Info" infoList={props.infoList} />
        </>
    )
}

// BackendVersionInfo
function BackendVersionInfo(): JSX.Element {
    const [err, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [infoList, setInfoList] = useState([] as InfoItem[])
    useEffect(() => {
        fetch("/api/version")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    const versionInfo = result as BackendVersionInfoType
                    var newInfoList: InfoItem[] = [
                        { title: "Base Go Version", content: versionInfo.BaseGoVersion },
                        { title: "Software Version", content: versionInfo.SoftwareVersion },
                        { title: "Build Date", content: versionInfo.BuildDate },
                        { title: "Project Home", content: versionInfo.ProjectHome },
                        { title: "Author", content: versionInfo.Author },
                        { title: "Email", content: versionInfo.Email },
                    ]
                    setInfoList(newInfoList)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }, [])
    return <AsyncInfoList isLoaded={isLoaded} error={err} title="Backend Version Info" infoList={infoList} />
}

export function About(): JSX.Element {
    return (
        <div className="about-page">
            <Title>About</Title>
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}></Space>
            <FrontendVersionInfo />
            <Space direction="vertical" size="middle" style={{ display: 'flex' }}></Space>
            <BackendVersionInfo />
        </div>
    )
}