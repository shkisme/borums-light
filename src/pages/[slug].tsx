import Detail from "src/routes/Detail"
import { filterPosts } from "src/libs/utils/notion"
import { CONFIG } from "site.config"
import { NextPageWithLayout } from "../types"
import CustomError from "src/routes/Error"
import { getRecordMap, getPosts } from "src/apis"
import MetaConfig from "src/components/MetaConfig"
import { GetStaticProps } from "next"
import { queryClient } from "src/libs/react-query"
import { queryKey } from "src/constants/queryKey"
import { dehydrate } from "@tanstack/react-query"
import usePostQuery from "src/hooks/usePostQuery"
import { FilterPostsOptions } from "src/libs/utils/notion/filterPosts"

// 🚨 1. 노션 API 차단 방지용: 숨 고르기(딜레이) 함수
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const filter: FilterPostsOptions = {
  acceptStatus: ["Public", "PublicOnDetail"],
  acceptType: ["Paper", "Post", "Page"],
}

export const getStaticPaths = async () => {
  const posts = await getPosts()
  // 기존 로직은 유지하되, 리턴값만 수정합니다.
  const filteredPost = filterPosts(posts, filter)

  return {
    // 🚨 2. 빈 배열 반환: 빌드할 때 36개 페이지를 동시에 만드는 것을 막습니다.
    paths: [], 
    // 🚨 3. fallback을 'blocking'으로 설정하여 첫 접속 시 무사히 렌더링되게 합니다.
    fallback: "blocking", 
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  // 🚨 4. 혹시 모를 병렬 요청에 대비해 1~3초 사이로 무작위 대기합니다.
  const randomDelay = Math.floor(Math.random() * 2000) + 1000
  await delay(randomDelay)

  const slug = context.params?.slug

  const posts = await getPosts()
  const feedPosts = filterPosts(posts)
  await queryClient.prefetchQuery(queryKey.posts(), () => feedPosts)

  const detailPosts = filterPosts(posts, filter)
  const postDetail = detailPosts.find((t: any) => t.slug === slug)

  // 🚨 5. 만약 페이지 데이터를 못 찾았을 경우 빌드가 터지는 것을 방지합니다.
  if (!postDetail || !postDetail.id) {
    return { notFound: true }
  }

  const recordMap = await getRecordMap(postDetail.id)

  await queryClient.prefetchQuery(queryKey.post(`${slug}`), () => ({
    ...postDetail,
    recordMap,
  }))

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: CONFIG.revalidateTime,
  }
}

const DetailPage: NextPageWithLayout = () => {
  const post = usePostQuery()

  if (!post) return <CustomError />

  const image =
    post.thumbnail ??
    CONFIG.ogImageGenerateURL ??
    `${CONFIG.ogImageGenerateURL}/${encodeURIComponent(post.title)}.png`

  const date = post.date?.start_date || post.createdTime || ""

  const meta = {
    title: post.title,
    date: new Date(date).toISOString(),
    image: image,
    description: post.summary || "",
    type: post.type[0],
    url: `${CONFIG.link}/${post.slug}`,
  }

  return (
    <>
      <MetaConfig {...meta} />
      <Detail />
    </>
  )
}

DetailPage.getLayout = (page) => {
  return <>{page}</>
}

export default DetailPage