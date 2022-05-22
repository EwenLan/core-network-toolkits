import React from 'react'
import { Link, useRoutes } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { Content, Header } from 'antd/lib/layout/layout'
import { ItemType } from 'antd/lib/menu/hooks/useItems'
import './App.css'
import { IndexRoutes } from './routes'

const headerLink: ItemType[] = [
    {
        key: "1",
        label: <Link to={'/home'}>Home</Link>,
    },
    {
        key: "2",
        label: <Link to={'/about'}>About</Link>
    },
]

function App() {
    return (
        <div className="App">
            <Layout className='app-layout'>
                <Header>
                    <Menu mode='horizontal' theme='dark' items={headerLink} defaultSelectedKeys={['1']} />
                </Header>
                <Content className='app-outer-content'>
                    <Layout className='site-layout-background app-inner-layout'>
                        {useRoutes(IndexRoutes)}
                    </Layout>
                </Content>
            </Layout>
        </div >
    )
}

export default App
