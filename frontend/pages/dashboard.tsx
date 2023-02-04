import type { NextPage } from "next";
import { useRouter } from "next/router";
import axios from 'axios';
import { UserInfo } from "../src/components/UserInfo";
import { useQueryClient } from "@tanstack/react-query";
import Layout from "../src/components/Layout";
import {LogoutIcon} from "@heroicons/react/solid";
import {ArticlePostsForm} from "../src/components/ArticlePostsForm";

const Dashboard: NextPage = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const logout = async () => {
        queryClient.removeQueries(['user'])
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
        await router.push('/login');
    }
    return (
        <>
            <Layout title='ダッシュボード' desc='ダッシュボードです'>
                <aside className=''>
                    <ul>
                        <li>記事作成</li>
                        <li>下書き一覧</li>
                        <li>記事一覧</li>
                        <li>コメント一覧</li>
                        <li>
                            <LogoutIcon
                                className='mb-6 h-6 w-6 cursor-pointer text-blue-500'
                                onClick={logout}
                            />
                        </li>
                    </ul>
                </aside>
                <ArticlePostsForm />
                {/*<LogoutIcon*/}
                {/*   className='mb-6 h-6 w-6 cursor-pointer text-blue-500'*/}
                {/*   onClick={logout}*/}
                {/*/>*/}
                {/*<button onClick={(e) => {*/}
                {/*    e.preventDefault();*/}
                {/*    router.push('/draftList')*/}
                {/*}}>下書き一覧</button>*/}
                <UserInfo />
            </Layout>
        </>
    )
}

export default Dashboard;