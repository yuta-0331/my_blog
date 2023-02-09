import type { NextPage } from 'next';
import Head from 'next/head';
import axios from "axios";
import { GetServerSideProps } from "next";
import ArticleHeadingListLayout from "../src/components/ArticleHeadingListLayout";
import Pagination from '../src/components/Pagination';
//コンポーネント


export const getServerSideProps: GetServerSideProps<SSRProps> = async (context) => {
    //最新の記事を6件取得
    const allPostsData = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/post/${process.env.NEXT_PUBLIC_USER_ID}`,{
        data: {
            skip: 0,
            take: 6,
        }
    });
    const recentPostData = allPostsData.data
  return {
    props: {
        recentPostData
    },
  };
};

type SSRProps = {
  recentPostData: any
}

const Home: NextPage<SSRProps> = ({recentPostData}) => {
  return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/frontend/public/favicon.ico" />
        </Head>
          <ArticleHeadingListLayout recentPostData={recentPostData}/>
          <Pagination postsPerPage={12} totalPage={5}/>
      </>
  );
};

export default Home;