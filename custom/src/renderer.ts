import { SITE_URL, ApiEndpoint } from "../config.js";
const URL: string = `${SITE_URL}${ApiEndpoint}`;

const d: Document = document;
const rootElement: HTMLElement | null = d.getElementById("root");
const skeletonContainer = document.getElementById("skeleton");

import { getBroadcastModal } from "./utils/getBroadcastModal.js";
import { getImageUrl } from "./utils/get-image-url.js";
import { months } from "./utils/months.js";
import { copyUrl } from "./utils/copy-url.js";

export const createModal = () => {
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

export const renderData = async (data: any[]) => {
    // Check the existence of the neccesary HTML elements.
    if (!rootElement || !skeletonContainer) {
        console.error('Required HTML elements not found.')
        if (!rootElement) console.error('Root element not found.')
        if (!skeletonContainer) console.error('Skeleton container element not found.')
        return
    }

    if (data.length <= 0) {
        skeletonContainer.innerHTML = '';
        rootElement.innerHTML = '<div class="no-events-msj"><p>En este momento, no hay contenido cargado.<br/>Por favor, intente nuevamente más tarde.<div>'
        return
    }

    // Filter out posts already finished.
    // const posts = data.filter(post => new Date(post.acf.fin_de_la_transmision) > new Date())
    const posts = data

    // Sort the posts by start date.
    posts.sort((postA, postB) => {
        const dateA = new Date(postA.acf.inicio_de_la_transmision);
        const dateB = new Date(postB.acf.inicio_de_la_transmision);

        // return dateA.getTime() - dateB.getTime();
        return dateB.getTime() - dateA.getTime();
    })

    let postsWrapper = d.createElement("div");
    postsWrapper.classList.add("posts-wrapper");

    const broadcastingWrapper = d.createElement("div");
    broadcastingWrapper.classList.add("broadcasting-wrapper");

    // Clean the skeleton.
    rootElement.innerHTML = ''

    for (const post of posts) {
        const currentDate = new Date();
        const startDate = new Date(post.acf.inicio_de_la_transmision);
        const endDate = new Date(post.acf.fin_de_la_transmision);

        // Deduce if the event is live right now:
        // First condition returns FALSE when the event has NOT started.
        // First condition returns TRUE when the event started.
        // Second condition returns TRUE when the event has NOT finished.
        // Second condition returns FALSE when the event has finished, converting
        // the all the condition to FALSE.
        const broadCasting = startDate < currentDate && currentDate < endDate;

        const postUrl: string = post.link;
        const title: string = post.title.rendered;
        const imageUrl: string = await getImageUrl(post);
        const location: string = post.acf.ubicacion;
        const type: string = post.acf.tipo_de_remate;
        const modality: string = post.acf.modalidad;
        const breeder: string = post.acf.cabana;
        const financing: string = post.acf.financiacion;
        const broadcastLink: string = post.acf.enlace_transmision;
        const preofferLink: string = post.acf.enlace_a_preoferta;

        const year: number = startDate.getFullYear();
        const month: string = months[startDate.getMonth() + 1];
        const day: number = startDate.getDate();
        const time: string = startDate.toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit', hour12: false })

        const singlePostWrapper = d.createElement("div");
        singlePostWrapper.classList.add("single-post-wrapper");

        const detailsButton: string = post.content.rendered
        ? `<a href="#" class="btn btn-outline details-button" data-post-id="${post.id}">
                Ver detalles <i class="fa-solid fa-chevron-right"></i>
            </a>`
        : "";

        const broadcastButton: string = broadcastLink
        ? `<a href="${broadcastLink}" target="_blank" class="btn btn-${broadCasting ? 'primary' : 'outline'}">
            ${broadCasting ? "En vivo ahora" : "Enlace transmisión"} 
            <i class="fa-solid fa-video"></i></a>`
        : "";

        const preofferButton: string = preofferLink
        ? `<a href="${preofferLink}" target="_blank" class="btn btn-outline">
                Preofertar <i class="fa-solid fa-gavel"></i>
            </a>`
        : "";

        const copyUrlButton: string = postUrl
        ? `<button class="copy-url-button" data-url="${postUrl}">
                <i class="fa-regular fa-copy"></i>
            </button>`
        : "";

        singlePostWrapper.innerHTML = `
            <div class="item-wrapper">
                <div class="image-wrapper">
                    <img src="${imageUrl}" alt="Imagen de ${title}" />
                    ${copyUrlButton}
                    <div class="metadata-wrapper">
                        <span>${day}</span>
                        <span>${month}</span>
                        <span>${year}</span>
                        <span>${time}</span>
                    </div>
                </div>
                <div class="info-wrapper">
                    <h3>${title}</h3>
                    <p>
                        ${location ? `<b>Ubicación: </b> ${location} <br>` : ''}
                        ${type ? `<b>Tipo de remate: </b> ${type} <br>` : ''}
                        ${modality ? `<b>Modalidad: </b> ${modality} <br>` : ''}
                        ${breeder ? `<b>Cabaña: </b> ${breeder} <br>` : ''}
                        ${financing ? `<b>Financiación: </b> ${financing}` : ''}
                    </p>
                    ${detailsButton}
                    ${broadcastButton}
                    ${preofferButton}
                </div>
            </div>`;

        postsWrapper.appendChild(singlePostWrapper);

        if (broadCasting && broadcastLink) {
            broadcastingWrapper.innerHTML = `${getBroadcastModal(broadcastLink, title)}`
        }
    }
    if (rootElement) {
        rootElement.appendChild(broadcastingWrapper)
        rootElement.appendChild(postsWrapper);
    }
    skeletonContainer.innerHTML = '';

    addModalListeners();

    d.querySelectorAll('.copy-url-button').forEach(button => {
        button.addEventListener('click', () => {
            const url = button.getAttribute('data-url');
            if (url) { copyUrl(url) }
        })
    })
};