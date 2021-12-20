import Head from 'next/head'

export default function Meta({ keywords, description, title }) {
    
    return (

        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel='icon' href='favicon.ico' />
            <title>{title}</title>
        </Head>)
};

Meta.defaultProps = {
    keywords: 'Niyomwungeri, Ishimwe, Parmenide, Kigali, Software Developer, Elysium Group Ltd',
    description: 'Niyomwungeri Parmenide Ishimwe portfolio',
    title: 'My Portfolio'
}