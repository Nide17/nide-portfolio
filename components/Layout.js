import Meta from './Meta'
import Navbar from './Navbar'
import Footer from './Footer'
import styles from '../styles/layout.module.css'

export default function Layout({ children }) {

    return (
        <>
            <Meta />
            <div className={styles.container}>
                <Navbar />
                {children}
                <Footer />
            </div>
        </>)
};
