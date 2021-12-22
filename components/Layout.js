import Meta from './Meta'
import Navbar from './Navbar'
import styles from '../styles/layout.module.css'

export default function Layout({ children }) {

    return (
        <>
            <Meta />
            <div className={styles.container}>
                <Navbar />
                {children}
            </div>
        </>)
};
