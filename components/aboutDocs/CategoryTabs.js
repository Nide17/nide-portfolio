import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import tabsStyles from '../../styles/aboutdocs/tabs.module.css'
import DocsCollapse from './DocsCollapse';

const CategoryTabs = () => {
    return (
        <div className={tabsStyles.tabs}>
            <Tabs>
                <TabList>
                    <Tab>Resumes</Tab>
                    <Tab>Certificates</Tab>
                    <Tab>Academics</Tab>
                </TabList>

                <TabPanel>
                    <h2>A<span>ll Resumes</span></h2>
                    <DocsCollapse />
                </TabPanel>
                <TabPanel>
                    <h2>A<span>ll Certificates</span></h2>
                    <DocsCollapse />
                </TabPanel>

                <TabPanel>
                    <h2>A<span>ll Academics</span></h2>
                    <DocsCollapse />
                </TabPanel>
            </Tabs>
        </div>
    )
}

export default CategoryTabs