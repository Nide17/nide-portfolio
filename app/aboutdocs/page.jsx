"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import aboutdocsStyles from '../../styles/aboutdocs/aboutdocs.module.css'
import CategoryTabs from './CategoryTabs'
import { server } from '../../config'

export default function AboutDocs() {

    const [aboutdocs, setAboutDocs] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`${server}/aboutDocs`)
            .then(res => res.json())
            .then(data => setAboutDocs(data.aboutDocs))
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className={aboutdocsStyles.aboutdocs}>
            <div className={aboutdocsStyles.description}>
                <div className={aboutdocsStyles.myimage}>
                    <Image src="/images/NIDEiMAGE.JPG" alt="nideimage" width={280} height={280} />
                </div>
                <p>
                    I am an experienced Full-Stack Software Engineer with over 4 years of industry experience, with both front-end and back-end development professional skills. I excel in utilizing a diverse range of technologies, including Node/Express, Flask, SpringBoot, MongoDB, PostgreSQL, React.js, Redux, Next.js, Bootstrap, Tailwind and more. Besides, I am also skilled in Data Analysis and IT Engineering, leveraging my analytical skills and IT expertise to provide valuable insights and technical assistance within organizations.
                </p>

                <div>
                    My commitment to continuous learning is shown by having acquired a Scrum Master™ certification and 10+ other engineering certificates.
                    <br />
                    <br />
                    This allows me to consistently deliver innovative and efficient solutions that meet or exceed evolving business needs while ensuring the smooth operation of IT systems.
                    <br />
                    <blockquote style={{ color: "aquamarine" }}>
                        I hope to work with you for your next project!
                    </blockquote>
                </div>
            </div>
            <CategoryTabs aboutdocs={aboutdocs} loading={loading} />
        </div>)
};