import Tiptap from '@/components/edit/tiptap/Tiptap';

type Props = {
  params: {
    slug: string
  }
}

export default async function Home({ params }: Props) {

  return (
    <div className='bg-base-300 w-screen h-screen prose p-5 max-w-full'>
      <Tiptap id={params.slug} />
    </div>
  );
}

export async function generateStaticParams() {
  const postList = await fetch('https://just-blog.oss-cn-hangzhou.aliyuncs.com/ctw/info.json').then(res => res.json());

  return postList
    .filter((post: any) => post.status === "published")
    .map((info: any) => ({
      slug: info.uuid
    }));
}
