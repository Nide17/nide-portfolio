import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import tabsStyles from '../../styles/aboutdocs/tabs.module.css'
import DocsCollapse from './DocsCollapse';
import ReactLoading from 'react-loading';

const CategoryTabs = ({ aboutdocs, loading }) => {

    const resumes = aboutdocs && aboutdocs.filter(doc => doc.categoryId === 2).sort((a, b) => a.title.localeCompare(b.title))
    const certificates = aboutdocs && aboutdocs.filter(doc => doc.categoryId === 3).sort((a, b) => a.title.localeCompare(b.title))
    const academics = aboutdocs && aboutdocs.filter(doc => doc.categoryId === 4).sort((a, b) => a.title.localeCompare(b.title))

    return (
        loading ?
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <ReactLoading type="spinningBubbles" color="aquamarine" />
            </div> :

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