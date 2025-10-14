import { createSkeleton } from "./utils/create-skeleton.js";
import { createModal } from "./renderer.js";
import { fetchData } from "./fetcher.js";

document.addEventListener("DOMContentLoaded", () => {
  createModal();
  
  document.querySelectorAll<HTMLElement>(".post-module").forEach(wrapper => {
    createSkeleton(wrapper)
    fetchData(wrapper);
  })
});
