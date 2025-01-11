import tw from "tailwind-styled-components"
import Link from "next/link";


export default async function Home() {
  const posts = await getStaticProps();

  async function getStaticProps() {
    const allPostList = await fetch('https://just-blog.oss-cn-hangzhou.aliyuncs.com/ctw/info.json').then(res => res.json());
    const postList = allPostList.filter(post => post.status === "published");
    console.log(postList);

    const postsInfoPromise = postList.map(post => fetch(`https://just-blog.oss-cn-hangzhou.aliyuncs.com/ctw/${post.id}/index.json`).then(res => res.json()));
    const postsInfo = await Promise.all(postsInfoPromise);

    return postList.map((post, index) => ({
      ...post,
      postInfo: postsInfo[index]
    }))
  }

  const getDate = (post) => {
    if (!post.publishTime) return null;
    var today = new Date(post.publishTime); // 获取当前日期和时间

    var day = today.getDate(); // 获取日
    var month = today.getMonth() + 1; // 获取月，注意月份是从0开始的，所以需要+1
    var year = today.getFullYear(); // 获取年

    return year + "-" + month + "-" + day;
  }

  return (
    <MainSC>
      <div className='w-full flex justify-end items-center pt-5 pr-10'>
        <Link href={`/edit`} className="no-underline">
          <button className="btn">New</button>
        </Link>
      </div>
      <ContentSC>
        <ListContainerTW>
          {
            posts[0] && <Link href={`/${posts[0].id}`} className="no-underline">
              <FistLineItemTW>
                <ImageContainerTW className="sm:h-96 sm:w-3/5">
                  <ImageTW src={posts[0]?.postInfo?.cover} />
                </ImageContainerTW>
                <FirstAiticleInfoTW>
                  <FirstTitleTW>{posts[0]?.fileName}</FirstTitleTW>
                  <SummaryTW>{posts[0]?.postInfo?.summary}</SummaryTW>
                  <TimeSC>
                    {getDate(posts[0])}
                  </TimeSC>
                </FirstAiticleInfoTW>
              </FistLineItemTW>
            </Link>
          }
          {
            posts[1] && <SecondLineItemTW>
              <Link href={`/${posts[1].id}`} className="no-underline">
                <ImageContainerTW className="sm:h-64">
                  <ImageTW src={posts[1]?.postInfo?.cover} />
                </ImageContainerTW>
                <AiticleInfoTW>
                  <TitleTW>{posts[1]?.title}</TitleTW>
                  <SummaryTW>{posts[1]?.postInfo?.summary}</SummaryTW>
                  <TimeSC>
                    {getDate(posts[1])}
                  </TimeSC>
                </AiticleInfoTW>
              </Link>

            </SecondLineItemTW>
          }
          {
            posts[2] && <SecondLineItemTW>
              <Link href={`/${posts[2].id}`} className="no-underline">
                <ImageContainerTW className="sm:h-64">
                  <ImageTW src={posts[2]?.postInfo?.cover} />
                </ImageContainerTW>
                <AiticleInfoTW>
                  <TitleTW>{posts[2]?.title}</TitleTW>
                  <SummaryTW>{posts[2]?.postInfo?.summary}</SummaryTW>
                  <TimeSC>
                    {getDate(posts[2])}
                  </TimeSC>
                </AiticleInfoTW>
              </Link>

            </SecondLineItemTW>
          }

          {
            posts.slice(3).map(post => (
              <LineItemTW>
                <Link href={`/${post.id}`} className="no-underline">
                  <ImageContainerTW>
                    <ImageTW src={post?.postInfo?.cover} />
                  </ImageContainerTW>
                  <AiticleInfoTW>
                    <TitleTW>{post.title}</TitleTW>
                    <SummaryTW>{post?.postInfo?.summary}</SummaryTW>
                    <TimeSC>
                      {getDate(post)}
                    </TimeSC>
                  </AiticleInfoTW>
                </Link>
              </LineItemTW>

            ))
          }
        </ListContainerTW>
      </ContentSC>
    </MainSC>
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
mx-auto
prose
max-w-7xl
`

const ListContainerTW = tw.div`
mt-8
sm:mt-12
px-5
flex
flex-wrap
justify-between
`;

const FistLineItemTW = tw.div`
  w-full
  flex
  flex-col
  sm:flex-row
`;

const SecondLineItemTW = tw.div`
w-full
mt-2
sm:mt-16
sm:w-[calc(50%-1rem)]
`;

const LineItemTW = tw.div`
w-full
mt-2
sm:mt-16
sm:w-[calc(33%-1rem)]
`;

const AiticleInfoTW = tw.div`
flex-1
mt-4
`;

const FirstAiticleInfoTW = tw(AiticleInfoTW)`
  sm:pl-10
  sm:mt-0
`;

const TitleTW = tw.div`
font-bold
text-xl
sm:text-2xl 
text-zinc-950 
dark:text-zinc-50
`

const FirstTitleTW = tw(TitleTW)`
text-2xl
sm:text-3xl 
`

const TimeSC = tw.time`
  order-first 
  flex 
  items-center 
  text-zinc-400 
  dark:text-zinc-500
  mt-2
  mb-6
  text-sm
`

const ImageContainerTW = tw.div`
w-full 
h-48
rounded-xl
bg-black
overflow-hidden
`

const ImageTW = tw.img`
w-full
h-full
  object-contain
  object-center
`

const SummaryTW = tw.div`
  mt-4
`

// const MainSC = tw.main`
// min-h-screen
// flex
// bg-zinc-50
// dark:bg-black
// `

// const ContentSC = tw.div`
// w-full
// max-w-7xl
// mx-auto
// ring-1
// bg-white
// dark:bg-zinc-900
// ring-zinc-100
// dark:sm:ring-zinc-300/20
// `