import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import tabsStyles from '../../styles/aboutdocs/tabs.module.css'
import DocsCollapse from './DocsCollapse';
import ReactLoading from 'react-loading';

const CategoryTabs = ({ aboutdocs, loading }) => {

    const resumes = aboutdocs && aboutdocs.filter(doc => doc.categoryId === 2).sort((a, b) => a.id - b.id)
    const certificates = aboutdocs && aboutdocs.filter(doc => doc.categoryId === 3).sort((a, b) => a.id - b.id)
    const academics = aboutdocs && aboutdocs.filter(doc => doc.categoryId === 4).sort((a, b) => a.id - b.id)

    return (
        loading ?
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <ReactLoading type="spinningBubbles" color="aquamarine" />
            </div> :

            <div className={tabsStyles.docDetails}>
                <div className={tabsStyles.tabs}>
                    <Tabs>
                        <TabList>
                            <Tab>Resume</Tab>
                            <Tab>Certificates</Tab>
                            <Tab>Academics</Tab>
                        </TabList>

                        <TabPanel>
                            <h2>R<span>esumes</span></h2>
                            <DocsCollapse documents={resumes} />
                        </TabPanel>
                        <TabPanel>
                            <h2>C<span>ertificates</span></h2>
                            <DocsCollapse documents={certificates} />
                        </TabPanel>

                        <TabPanel>
                            <h2>A<span>cademics</span></h2>
                            <DocsCollapse documents={academics} />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
    )
}

export default CategoryTabs