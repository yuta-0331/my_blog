import { FC } from "react";
import { PostType } from "../../types";
import CategoryImageButton from "./CategoryImageButton";

type ArticleListProps = {
    articles: PostType[];
}

const ArticleList: FC<ArticleListProps> = (props) => {
   const { articles } = props
    return (
        <>
            {articles.map((article) => {
                const { id, title, categories, likes, createdAt } = article;
                return (
                    <div key={id}>
                        {title}
                        <CategoryImageButton categories={categories}/>
                    </div>
                )
            })}
        </>
    )
}
export default ArticleList;