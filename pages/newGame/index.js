// import axios from "axios"
// import { useEffect, useState } from "react";
import categories from "../../utils/categories";
import QuizItem from '../../components/QuizItem';
import styled from 'styled-components';

// const BrowseCategories = ({ children }) => {
//   // const [categoryData, setCategoryData] = useState([]);
//     useEffect(() => {
//       axios
//         .get("https://opentdb.com/api_category.php")
//         .then((response) => {
//           const categoryList = response.data.trivia_categories
//           console.log(categoryList)
//           const categoryTitle = categoryList.map(({id, name}) => {
//             return (
//               <p key={id}> 
//                 {name}
//               </p>
//             )
//           })
//           // setCategoryData(categoryList);
//         })
//         .catch((error) => {
//           console.log("error", error);
//         });
//   }, [])

//   return ( 
//     <div>
//       <h1>List of Categories</h1>
//       <p>Each category will be one single block</p>
//       {/* <BrowseCategories>{}</BrowseCategories> */}

//     </div>
//   );
// }

// export default BrowseCategories;

const QuizItemListWrap = styled.section`
    background-color: var(--main-bg-color);
    padding: 55px 15px;
    h2 {
        font-size: 30px;
        text-transform: capitalize;
        text-align: center;
        margin-bottom: 45px;
    }
    @media screen and (max-width:480px) {
      h2{
          font-size: 28px;
      }
    }
`

const QuizItemListing = styled.section`
    display: flex;
    flex-wrap: wrap;
    > div {
        margin: 0 10px 20px 10px;
        width: calc(33.33333% - 20px);
    }
    @media screen and (max-width:768px) {
        flex-direction: column;
        > div {
            width: 100%;
            margin: 0 0 25px 0;
        } 
    }
`

const BrowseQuizzes = (props) => {
  const categoryList = Object.keys(categories);
  console.log(`categoryList`, categoryList)
  const categoryItems = categoryList.map( (item) => ( <QuizItem key={Number(item)} title={categories[Number(item)].title} categoryId={Number(item)} /> ) );
  console.log(`categoryItems`, categoryItems)
  console.log(`props`,props)
  return(
      <>
          <QuizItemListWrap>
              <div className="wrapper">
                  <h2>Select any quiz category</h2>
                  <QuizItemListing>
                    {categoryItems}
                  </QuizItemListing>
              </div>
          </QuizItemListWrap>
      </>
  )
}

export default BrowseQuizzes;