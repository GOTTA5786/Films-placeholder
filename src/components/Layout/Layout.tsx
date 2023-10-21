import { Link, Outlet } from 'react-router-dom'
import styles from './Layout.module.css'


const Layout: React.FC = () => {
    return (
        <>
            <header className={styles.header}>
                <Link className={styles.link} to='/'>На главную</Link>
                <Link className={styles.link} to='/new-film'>Создать фильм</Link>
            </header>
            <Outlet/>
        </>
    )
}
export default Layout