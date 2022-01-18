import React from 'react'
import documentsStyle from '../../styles/aboutdocs/documentsStyle.module.css'
import CategoryTabs from './CategoryTabs';

const Documents = (props) => {

    return (
        <div className={documentsStyle.docDetails}>
            <CategoryTabs />
        </div>
    )
}

export default Documents