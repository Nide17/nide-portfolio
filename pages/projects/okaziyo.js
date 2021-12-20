import Link from 'next/link'
import Meta from '../../components/Meta'

export default function okaziyo() {
    return (
        <div className='view-okaziyo'>
            <Meta title='Projects-Okaziyo' />

            <h1>Okaziyo</h1>
            <h5>
                <Link href="/">
                    <a>Back to home</a>
                </Link>
            </h5>
        </div>)
};
