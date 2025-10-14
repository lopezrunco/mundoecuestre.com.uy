import { SITE_URL, ApiEndpoint } from "../config.js";
const URL: string = `${SITE_URL}${ApiEndpoint}`;

// const d: Document = document;

let currentPage: number = 1
// const categoryId: number = 3;
// const finalUrl: string = `${URL}?categories=${categoryIdToFetch}&per_page=${postsToFetch}&page${currentPage}`;
// const finalUrl: string = `${URL}?categories=${categoryIdToFetch}`;

import { renderData } from "./renderer.js";
import { Post } from "./interfaces/post.js";

export const fetchData = async (wrapperElement: HTMLElement) => {
  const rootElement = wrapperElement.querySelector<HTMLElement>(".root")
  const skeletonContainer = wrapperElement.querySelector<HTMLElement>(".skeleton")

  const dataPostsAttr = wrapperElement.getAttribute("data-posts");
  const dataCategoryAttr = wrapperElement.getAttribute("data-category-id");

  const postsToFetch: number = dataPostsAttr ? parseInt(dataPostsAttr, 10) : 30;
  const categoryIdToFetch: number = dataCategoryAttr ? parseInt(dataCategoryAttr, 10) : 1;

  const finalUrl: string = `${URL}?categories=${categoryIdToFetch}&per_page=${postsToFetch}&page${currentPage}`;

  try {
    const response = await fetch(finalUrl)
    console.log(response)

    if (!response.ok) throw new Error(`Error fetching the url ${finalUrl}`);
    
    const data: Post[] = await response.json()

    if (rootElement && skeletonContainer) {
      renderData(data, rootElement, skeletonContainer)
    } else {
      console.error("Root or skeleton element missing in: ", wrapperElement)
    }
  } catch (error) {
    console.error("Error fetching the data: ", error)
  }
};
