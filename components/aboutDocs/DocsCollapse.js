import React, { useState } from 'react'
import { Collapse } from "react-collapse";
import classNames from "classnames";
import documentsStyle from '../../styles/aboutdocs/documentsStyle.module.css'
import Link from 'next/link'

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
                    <i className="fas fa-angle-up" /> -
                </span>
            );
        } else {
            return (
                <span>
                    <i className="fas fa-angle-down" /> +
                </span>
            );
        }
    }

    let content;
    const { activeIndex } = state;
    const posts = [
        {
            id: "1",
            title: "Dev related",
            message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            id: "2",
            title: "Non dev related",
            message:
                "Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Eu lobortis elementum nibh tellus molestie nunc non."
        }
    ];


    if (props.loading) {
        content = "Loading...";
    } else {
        content = posts.map((post, index) => {

            return (
                <li key={index}>

                    <div className={documentsStyle.titleToggler}>
                        <h3>{post.title}</h3>
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
                            {/* {post.message} */}
                            <p>My detailed resume</p>

                            <h6><i>Dev CV</i></h6>
                            <small>Provider</small>

                            <div className={documentsStyle.docsLinks}>
                                <button>
                                    <Link href="https://github.com/Nide17/hortiprice"><a>
                                        Download
                                    </a></Link>
                                </button>

                                <button>
                                    <Link href="http://hortiprice.herokuapp.com/"><a>
                                        Verify
                                    </a></Link>
                                </button>
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