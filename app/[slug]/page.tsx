import React from "react";
import tw from "tailwind-styled-components";
import Link from "next/link";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const info = await fetch(`https://just-blog.oss-cn-hangzhou.aliyuncs.com/ctw/${params.slug}/index.json`).then(res => res.json());

  return {
    title: info?.title,
    viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover",
  }
}

export default async function Post({ params }: Props) {
  const info = await fetch(`https://just-blog.oss-cn-hangzhou.aliyuncs.com/ctw/${params.slug}/index.json`).then(res => res.json());
  const textContent = await fetch(`https://just-blog.oss-cn-hangzhou.aliyuncs.com/ctw/${params.slug}/index.txt`).then(res => res.text());

  console.log(textContent);


  const getDate = () => {
    if (!info?.publishTime) return null;
    var today = new Date(info.publishTime);

    var day = today.getDate();
    var month = today.getMonth() + 1;
    var year = today.getFullYear();

    return year + "-" + month + "-" + day;
  }

  return (
    <>
      <MainSC>
        <div className='w-full flex justify-end items-center pt-5 pr-10'>
          <Link href={`/edit/${params.slug}`} className="no-underline">
            <button className="btn">Edit</button>
          </Link>
        </div>
        <ContentSC>
          <EditContainerSC>
            <TimeSC>
              <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
              <span className="ml-3">{getDate()}</span>
            </TimeSC>
            <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: textContent }}></div>
          </EditContainerSC>
        </ContentSC>
      </MainSC>
    </>
  )
}

const MainSC = tw.main`
min-h-screen
flex
bg-white
dark:bg-zinc-900
flex-col
`

const ContentSC = tw.div`
w-full
max-w-7xl
mx-auto
relative
`

const EditContainerSC = tw.div`
  mx-auto
  max-w-2xl
  px-5
  sm:mt-20
  mt-10
  pb-20
`
const TimeSC = tw.time`
  order-first 
  flex 
  items-center 
  text-base 
  text-zinc-400 
  dark:text-zinc-500
  mb-6
`

export async function generateStaticParams() {
  const postList = await fetch('https://just-blog.oss-cn-hangzhou.aliyuncs.com/ctw/info.json').then(res => res.json());

  return postList
    .filter((post: any) => post.status === "published")
    .map((info: any) => ({
      slug: info.uuid
    }));
}
