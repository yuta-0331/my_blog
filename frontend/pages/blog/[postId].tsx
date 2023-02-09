import type { NextPage } from 'next';
import { useRouter } from "next/router";
import axios from "axios";
import Custom404 from '../404'
import { Loader } from "@mantine/core";
import { ArticleLayout } from "../../src/components/ArticleLayout";
import Layout from "../../src/components/Layout";
import { useEffect, useState } from "react";
import { PostType } from "../../types";

const ArticlePage: NextPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState<PostType | null>(null);
    //param postIdの利用
    const {postId} = router.query;
    useEffect(() => {
        //postIdが取得される前なら脱出
        if (!postId) return;
        setLoading(true);
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/post/blog/${postId}`)
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(true);
                setLoading(false);
            });
    }, [postId]);

    // /blog/categoryにアクセスされた場合も404を返す
    if (error || postId === 'category') return <Custom404/>
    if (loading) return <Loader/>
    if (!data) return null;

    try {
        const {id, title, categories, desc, image, likes, status, createdAt, updatedAt, comments} = data;
        return (
            <>
                <Layout title='ブログ' desc='ブログ詳細'>
                    <div>
                        <ArticleLayout
                            title={title}
                            categories={categories}
                            desc={desc}
                            comments={comments}
                            updatedAt={updatedAt}
                            status={status}
                            createdAt={createdAt}
                            id={id}
                            likes={likes}
                            image={image}
                        />
                    </div>
                </Layout>

            </>
        );
    } catch (err) {
        return <Custom404/>
    }
};

export default ArticlePage;
