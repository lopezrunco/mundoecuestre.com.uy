import { SITE_URL, ApiEndpoint } from "../config.js";

const URL: string = `${SITE_URL}${ApiEndpoint}`;

import { renderData } from "./renderer.js";
import { Post } from "./interfaces/post.js";

export const fetchData = async (wrapperElement: HTMLElement) => {
  const rootElement = wrapperElement.querySelector<HTMLElement>(".root")
  const skeletonContainer = wrapperElement.querySelector<HTMLElement>(".skeleton")

  const dataPostsAttr = wrapperElement.getAttribute("data-posts");
  const dataCategoryAttr = wrapperElement.getAttribute("data-category-id");

  let isShowCategory = false

  if (dataCategoryAttr == "5") { isShowCategory = true }

  const postsToShow: number | null = dataPostsAttr ? parseInt(dataPostsAttr, 10) : null;
  const categoryIdToFetch: number = dataCategoryAttr ? parseInt(dataCategoryAttr, 10) : 1;

  const perPage = 100
  let page = 1
  let allPosts: Post[] = []
  let hasMore = true

  try {
    // Fetch all pages of posts.
    while (hasMore) {
      const url: string = `${URL}?categories=${categoryIdToFetch}&per_page=${perPage}&page${page}`
      const response = await fetch(url)

      if (!response.ok) throw new Error(`Error fetching the url ${url}`)

      const data: Post[] = await response.json()
      allPosts = allPosts.concat(data)

      const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1')
      page++
      hasMore = page <= totalPages
    }

    // Sort posts by "inicio_de_la_transmision" custom field.
    const sortedPosts = allPosts.sort((a, b) => {
      const dateA = new Date(a.acf.inicio_de_la_transmision).getTime()
      const dateB = new Date(b.acf.inicio_de_la_transmision).getTime()
      return dateB - dateA // Newest first.
    })

    // If postsToShow is not defined in the .php file, only keep the first N posts.
    const limitedPosts = postsToShow !== null 
      ? sortedPosts.slice(0, postsToShow) 
      : sortedPosts

    if (rootElement && skeletonContainer) {
      renderData(limitedPosts, rootElement, skeletonContainer, isShowCategory)
    } else {
      console.error("Root or skeleton element missing in: ", wrapperElement)
    }
  } catch (error) {
    console.error("Error fetching the data: ", error)
  }
};
