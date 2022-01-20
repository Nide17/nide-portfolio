import React, { useState } from 'react'
import { Collapse } from "react-collapse";
import classNames from "classnames";
import documentsStyle from '../../styles/aboutdocs/documentsStyle.module.css'
import Link from 'next/link'
import Image from 'next/image'

const DocsCollapse = (props) => {

    const [state, setState] = useState({
        activeIndex: null
    })

    const toggleClass = (index, e) => {
        setState({ activeIndex: state.activeIndex === index ? null : index });
    }

    const moreLess = (index) => {
        if (state.activeIndex === index) {
            return (
                <span>
                    <Image src="/images/minus.svg" alt='collapse' width={20} height={20} />
                </span>
            );
        } else {
            return (
                <span>
                    <Image src="/images/plus.svg" alt='expand' width={20} height={20} />
                </span>
            );
        }
    }

    let content;
    const { activeIndex } = state;

    if (props.loading) {
        content = "Loading...";
    } else {
        content = props.documents.map((doc, index) => {

            return (
                <li key={index}>

                    <div className={documentsStyle.titleToggler}>
                        <h3>{doc.title}</h3>
                        <button
                            className="btn btn-primary btn-xs"
                            onClick={() => toggleClass(index)}
                        >
                            {moreLess(index)}
                        </button>
                    </div>

                    <Collapse isOpened={activeIndex === index}>
                        <div
                            className={classNames("alert alert-info msg", {
                                show: activeIndex === index,
                                hide: activeIndex !== index
                            })}
                        >
                            <div className={documentsStyle.collapseContent}>
                                <p>{doc.category.title} | <i>{doc.subcategory.title}</i></p>
                                <small>Provided by {doc.provider}</small>

                                <div className={documentsStyle.docsLinks}>
                                    {doc.awsLink &&
                                        <button><Link href={doc.awsLink}><a>Download</a></Link></button>}

                                    {doc.credentialLink &&
                                        <button><Link href={doc.credentialLink}><a>Verify</a></Link></button>}
                                </div>
                            </div>

                        </div>
                    </Collapse>
                </li>
            );
        });
    }

    return (<ul className={documentsStyle.docsList}>{content}</ul>)
}

export default DocsCollapse