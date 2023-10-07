"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import aboutdocsStyles from '../../styles/aboutdocs/aboutdocs.module.css'
import CategoryTabs from '../../utils/aboutDocs/CategoryTabs'
import { server } from '../../config'

export default function AboutDocs() {

    const [aboutdocs, setAboutDocs] = useState([])

    useEffect(() => {
        fetch(`${server}/aboutDocs`)
            .then(res => res.json())
            .then(data => setAboutDocs(data.aboutDocs))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className={aboutdocsStyles.aboutdocs}>
            <div className={aboutdocsStyles.description}>
                <div className={aboutdocsStyles.myimage}>
                    <Image src="/images/NIDEiMAGE.JPG" alt="nideimage" width={280} height={280} />
                </div>

                <p>I am a full-stack web developer with 3+ years of experience in the industry of software development. I am an honest software developer having eager to learn and use new skills and the latest technologies.

                    I am comfortable working on small and big projects personally and with teams and usually striving for customer satisfaction.

                    I design and develop quality and highly responsive webpages with attractive user experience. I also develop highly scalable and secure backends for systems.</p>
                <div>
                    <b>I like:</b>

                    <ul>
                        <li>Providing customer satisfaction and memorable user experience(UX)</li>
                        <li>Developing responsive HTML/CSS and JavaScript web applications.</li>
                        <li>Developing optimal, high performance, and secure backend apps.</li>
                    </ul>
                </div>

                <div>Briefly, I approach projects strategically by tracking changes with Git, testing interfaces on a variety of devices to confirm as responsive, documenting, and maintaining the project before and after shipping or deployment.
                    <br />

                    <blockquote>Hope to work with you for your next project!</blockquote>
                </div>
            </div>
            <CategoryTabs aboutdocs={aboutdocs} />
        </div>)
};