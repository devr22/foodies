import styles from './css/loading.module.css';

export default function MealsLoadingPage () {
    return (
        <p className={styles.loading}>fetching meals...</p>
    );
}