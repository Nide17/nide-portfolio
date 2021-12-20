import Link from 'next/link'
import Meta from '../../components/Meta'

export default function quizblog() {

    return (
        <div className='view-quizblog'>
            <Meta title='Projects-Quiz Blog Rwanda' />

            <h1>Quiz Blog Rwanda</h1>
            <h5>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h5>
        </div>)
};
