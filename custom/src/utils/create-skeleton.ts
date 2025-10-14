export function createSkeleton(wrapperElement: HTMLElement) {
    const skeletonContainer = wrapperElement.querySelector(".skeleton");
    const numSkeletons = 4;

    if (!skeletonContainer) {
      console.error("Skeleton container not found in: ", wrapperElement)
      return
    }
  
    const createSkeletonItem = () => {
      const skeletonCol = document.createElement("div");
      skeletonCol.classList.add("col-lg-3");
  
      const skeleton = document.createElement("div");
      skeleton.classList.add("skeleton");
  
      const skeletonImage = document.createElement("div");
      skeletonImage.classList.add("skeleton-image", "animated-background");
  
      const skeletonText1 = document.createElement("div");
      skeletonText1.classList.add("skeleton-text", "animated-background");
  
      const skeletonText2 = document.createElement("div");
      skeletonText2.classList.add("skeleton-text", "animated-background");
      skeletonText2.style.width = "80%";
  
      const skeletonText3 = document.createElement("div");
      skeletonText3.classList.add("skeleton-text", "animated-background");
      skeletonText3.style.width = "60%";
  
      const skeletonText4 = document.createElement("div");
      skeletonText4.classList.add("skeleton-text", "animated-background");
      skeletonText4.style.width = "40%";
  
      skeleton.appendChild(skeletonImage);
      skeleton.appendChild(skeletonText1);
      skeleton.appendChild(skeletonText2);
      skeleton.appendChild(skeletonText3);
      skeleton.appendChild(skeletonText4);
  
      skeletonCol.appendChild(skeleton);
  
      return skeletonCol;
    };
  
    const skeletonRow = document.createElement("div");
    skeletonRow.classList.add("row");
  
    for (let i = 0; i < numSkeletons; i++) {
      skeletonRow.appendChild(createSkeletonItem());
    }
  
    const skeletonContainerDiv = document.createElement("div");
    skeletonContainerDiv.classList.add("container");
    skeletonContainerDiv.appendChild(skeletonRow);
  
    skeletonContainer.appendChild(skeletonContainerDiv);
  }
  