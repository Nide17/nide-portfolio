import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import tabsStyles from '../../styles/aboutdocs/tabs.module.css'
import DocsCollapse from './DocsCollapse';

const CategoryTabs = ({ aboutdocs }) => {

    const resumes = aboutdocs && aboutdocs.filter(doc => doc.categoryId === 2)
    const certificates = aboutdocs && aboutdocs.filter(doc => doc.categoryId === 3)
    const academics = aboutdocs && aboutdocs.filter(doc => doc.categoryId === 4)

    return (
        <div className={tabsStyles.docDetails}>
            <div className={tabsStyles.tabs}>
                <Tabs>
                    <TabList>
                        <Tab>Resumes</Tab>
                        <Tab>Certificates</Tab>
                        <Tab>Academics</Tab>
                    </TabList>

                    <TabPanel>
                        <h2>A<span>ll Resumes</span></h2>
                        <DocsCollapse documents={resumes} />
                    </TabPanel>
                    <TabPanel>
                        <h2>A<span>ll Certificates</span></h2>
                        <DocsCollapse documents={certificates} />
                    </TabPanel>

                    <TabPanel>
                        <h2>A<span>ll Academics</span></h2>
                        <DocsCollapse documents={academics} />
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}

export default CategoryTabs