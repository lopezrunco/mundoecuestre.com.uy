import { SITE_URL, ApiEndpoint } from "../config.js";
const URL: string = `${SITE_URL}${ApiEndpoint}`;

const d: Document = document;

import { getBroadcastModal } from "./utils/getBroadcastModal.js";
import { getImageUrl } from "./utils/get-image-url.js";
import { months } from "./utils/months.js";
import { copyUrl } from "./utils/copy-url.js";

export const createModal = () => {
    if (document.getElementById("modal")) return // Prevent duplicate modal creation.

    const modal: HTMLDivElement = d.createElement("div");
    modal.id = "modal";
    modal.classList.add("modal");
    modal.style.display = "none"; // Modal hidden inittialy.
  
    const modalContent: HTMLDivElement = d.createElement("div");
    modalContent.classList.add("modal-content");
  
    const closeBtn: HTMLSpanElement = d.createElement("span");
    closeBtn.classList.add("close-btn");
    closeBtn.innerHTML = "&times"; // Close button.
  
    const fullContentDiv: HTMLDivElement = d.createElement("div");
    fullContentDiv.id = "modal-full-content";
  
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(fullContentDiv);
    modal.appendChild(modalContent);
    d.body.appendChild(modal);
  
    // Add event listeners to close the modal.
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", (event: MouseEvent) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
};
  
const addModalListeners = () => {
    const modal: HTMLElement | null = d.getElementById("modal");
    const fullContentDiv: HTMLElement | null = d.getElementById("modal-full-content");

    d.querySelectorAll(".details-button").forEach((button) => {
        button.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
            // Fetch full content of the post.
            const postId: string | null = button.getAttribute("data-post-id");
            if (!postId) throw new Error("Post ID not found");

            const fullContentUrl: string = `${URL}/${postId}`;

            const response: Response = await fetch(fullContentUrl);
            if (response.ok) {
            const postData: any = await response.json();

            const title: string = postData.title.rendered;
            const location: string = postData.acf.ubicacion;
            const type: string = postData.acf.tipo_de_remate;
            const modality: string = postData.acf.modalidad;
            const breeder: string = postData.acf.cabana;
            const financing: string = postData.acf.financiacion;
            const fullContent: string = postData.content.rendered;

            const date: Date = new Date(postData.acf.inicio_de_la_transmision);
            const year: number = date.getFullYear();
            const month: string = months[date.getMonth() + 1];
            const day: number = date.getDate();

            if (fullContentDiv) {
                fullContentDiv.innerHTML = `
                                <div class="meta">
                                    <h2>${title}</h2>
                                    <p><i class="fa-solid fa-calendar-days me-2"></i> ${day} ${month} ${year}</p>
                                    <p>
                                    ${location ? `<b>Ubicación: </b> ${location}` : ''}
                                    ${type ? ` | <b>Tipo de remate: </b> ${type}` : ''}
                                    ${modality ? ` | <b>Modalidad: </b> ${modality}` : ''}
                                    ${breeder ? ` | <b>Cabaña: </b> ${breeder}` : ''}
                                    ${financing ? ` | <b>Financiación: </b> ${financing}` : ''}
                                    </p>
                                </div>
                                <div class="full-content">
                                    ${fullContent}
                                </div>
                            `;
            }
            if (modal) {
                modal.style.display = "flex";
            }
            } else {
            throw new Error(`Error fetching the url ${fullContentUrl}`);
            }
        } catch (error) {
            console.error("Error fetching full content: ", error);
        }
        });
    });
};

export const renderData = async (
  data: any[],
  rootElement: HTMLElement,
  skeletonContainer: HTMLElement,
  isShowCategory: boolean
) => {
  // Validation of root element and posts data.
  if (!rootElement || !skeletonContainer) {
    console.error('Required HTML elements not found.')
    return
  }

  if (data.length <= 0) {
    skeletonContainer.innerHTML = ''
    rootElement.innerHTML = '<div class="no-events-msj"><p>En este momento, no hay contenido cargado.<br/>Por favor, intente nuevamente más tarde.<div>'
    return
  }

  // Prepare and sort the posts.
  const posts = data.sort((a, b) => {
    const dateA = new Date(a.acf.inicio_de_la_transmision).getTime()
    const dateB = new Date(b.acf.inicio_de_la_transmision).getTime()
    return dateB - dateA
  })

  const d = document
  const broadcastingWrapper = d.createElement('div')
  broadcastingWrapper.classList.add('broadcasting-wrapper')

  // Clean skeleton.
  rootElement.innerHTML = ''
  skeletonContainer.innerHTML = ''

  // Generate unique carousel ID for the current instance.
  const carouselId = `carousel-${Math.random().toString(36).substr(2, 9)}`

  // Carousel containers.
  const carousel = d.createElement('div')
  carousel.id = carouselId
  carousel.classList.add('carousel', 'slide', 'd-md-none') // Only in mobile.

  const inner = d.createElement('div')
  inner.classList.add('carousel-inner')

  // Desktop wrapper.
  const postsWrapper = d.createElement('div')
  postsWrapper.classList.add('posts-wrapper')

  // Iterate the data and generate the posts.
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    const currentDate = new Date()
    const startDate = new Date(post.acf.inicio_de_la_transmision)
    const broadcastDay = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    )

    const showFrom = new Date(broadcastDay)
    showFrom.setHours(1, 0, 0, 0) // 1 AM

    const showUntil = new Date(broadcastDay)
    showUntil.setHours(23, 0, 0, 0) // 11 PM

    const broadCasting = currentDate >= showFrom && currentDate <= showUntil

    const postUrl: string = post.link
    const title = post.title.rendered
    const location = post.acf.ubicacion
    const type = post.acf.tipo_de_remate
    const modality = post.acf.modalidad
    const breeder = post.acf.cabana
    const financing = post.acf.financiacion
    const broadcastLink = post.acf.enlace_transmision
    const preofferLink = post.acf.enlace_a_preoferta

    const imageUrl = !isShowCategory
      ? await getImageUrl(post)
      : "/wp-content/themes/mundoecuestre/assets/images/mundo-ecuestre-show-thumb.png"

    const year = startDate.getFullYear()
    const month = months[startDate.getMonth() + 1]
    const day = startDate.getDate()
    const time = startDate.toLocaleTimeString("es-UY", { hour: "2-digit", minute: "2-digit", hour12: false })

    const detailsButton = post.content.rendered
      ? `<a href="#" class="btn btn-outline details-button" data-post-id="${post.id}">
            Ver detalles <i class="fa-solid fa-chevron-right"></i>
        </a>`
      : ""

    const broadcastButton = broadcastLink
      ? `<a href="${broadcastLink}" target="_blank" class="btn btn-${
          broadCasting && !isShowCategory ? "primary" : "outline"
        }">
          ${
            broadCasting && !isShowCategory
              ? "En vivo ahora"
              : isShowCategory
              ? "Ver programa"
              : "Ver transmisión"
          }
          <i class="fa-solid fa-video"></i>
        </a>`
      : ""

    const preofferButton = preofferLink
      ? `<a href="${preofferLink}" target="_blank" class="btn btn-outline">
            Preofertar <i class="fa-solid fa-gavel"></i>
        </a>`
      : ""

    const copyUrlButton = postUrl
      ? `<button class="copy-url-button" data-url="${postUrl}">
            <i class="fa-regular fa-copy"></i>
        </button>`
      : ""

    // HTML card.
    const postHTML = `
      <div class="item-wrapper">
        <div class="image-wrapper">
          <a href="${postUrl}">
            <img src="${imageUrl}" alt="Imagen de ${title}" class="d-block w-100"/>
          </a>
          ${copyUrlButton}
          <div class="metadata-wrapper">
            <span>${day}</span>
            <span>${month}</span>
            <span>${year}</span>
            <span>${isShowCategory ? "" : time}</span>
          </div>
        </div>
        <div class="info-wrapper">
          <h3>${title}</h3>
          <p>
            ${location ? `<b>Ubicación:</b> ${location}<br>` : ""}
            ${type ? `<b>Tipo de remate:</b> ${type}<br>` : ""}
            ${modality ? `<b>Modalidad:</b> ${modality}<br>` : ""}
            ${breeder ? `<b>Cabaña:</b> ${breeder}<br>` : ""}
            ${financing ? `<b>Financiación:</b> ${financing}` : ""}
          </p>
          ${detailsButton}
          ${broadcastButton}
          ${preofferButton}
        </div>
      </div>
    `

    // Desktop card.
    const singlePostWrapper = d.createElement("div")
    singlePostWrapper.classList.add("single-post-wrapper")
    singlePostWrapper.innerHTML = postHTML
    postsWrapper.appendChild(singlePostWrapper)

    // Mobile carousel item.
    const item = d.createElement("div")
    item.classList.add("carousel-item")
    if (i === 0) item.classList.add("active")
    item.innerHTML = postHTML
    inner.appendChild(item)

    if (!isShowCategory && broadCasting && broadcastLink) broadcastingWrapper.insertAdjacentHTML("beforeend", getBroadcastModal(broadcastLink, title))

    // Carousel controls.
    const prevBtn = `
      <a class="carousel-control-prev" role="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
        <i class="fa-solid fa-chevron-left position-arrow"></i>
      </a>
    `
    const nextBtn = `
      <a class="carousel-control-next" role="button" data-bs-target="#${carouselId}" data-bs-slide="next">
        <i class="fa-solid fa-chevron-right position-arrow"></i>
      </a>
    `

    carousel.appendChild(inner)
    carousel.insertAdjacentHTML("beforeend", prevBtn + nextBtn)

    // Append both desktop and mobile versions.
    if (!isShowCategory && broadcastingWrapper.children.length > 0) {
      rootElement.appendChild(broadcastingWrapper)
    }
    rootElement.appendChild(postsWrapper)
    rootElement.appendChild(carousel)

    // Modal + copy URL setup
    addModalListeners()
    d.querySelectorAll(".copy-url-button").forEach((button) => {
      button.addEventListener("click", () => {
        const url = button.getAttribute("data-url")
        if (url) copyUrl(url)
      })
  })
}}
