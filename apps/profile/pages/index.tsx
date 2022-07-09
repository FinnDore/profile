import styles from './index.module.scss';
export default function index() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>FINN DORE</h1>
            <h1 className={styles['sub-title']}>🚧 Coming Soon 🚧</h1>
        </div>
    );
}
