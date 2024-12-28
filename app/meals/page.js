import Link from 'next/link';
import styles from './css/page.module.css';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meal';
import { Suspense } from 'react';
import MealsLoadingPage from './loading';

async function Meals () {
    const meals = await getMeals();
    return <MealsGrid meals={meals} />;
}

export default function MealsPage () {

    return (
        <>
            <header className={styles.header}>
                <h1>
                    Delicious meals, created{' '}
                    <span className={styles.highlight}>by you</span>
                </h1>
                <p>Choose your favorite recipe and cook it by yourself. It is easy and fun.</p>
                <p className={styles.cta}>
                    <Link href='/meals/share'>
                        Share Your Favorite Recipe
                    </Link>
                </p>
            </header>
            <main className={styles.main}>
                <Suspense fallback={<MealsLoadingPage />}>
                    <Meals />
                </Suspense>
            </main>
        </>
    );
}