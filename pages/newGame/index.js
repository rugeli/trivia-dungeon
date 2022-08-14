// import axios from "axios"
// import { useEffect, useState } from "react";
import categories from "../../utils/categories";
import QuizItem from '../../components/QuizItem';
import styles from '../../styles/Home.module.css'


const BrowseQuizzes = () => {
    const categoryList = Object.keys(categories);
    // console.log(`categoryList`, categoryList)
    const categoryItems = categoryList.map( (item) => ( <QuizItem key={Number(item)} title={categories[Number(item)].title} categoryId={Number(item)} /> ) );
    // console.log(`categoryItems`, categoryItems)
    // console.log(`props`,props)
    return(
        <>
            <section>
                <div>
                    <h2 className={styles.cate_page_title}>Select any quiz category</h2>
                    <section className={styles.cate_container}>
                        {categoryItems}
                    </section>
                </div>
            </section>
        </>
    )
}

export default BrowseQuizzes;