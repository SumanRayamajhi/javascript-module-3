function createHeader(node, title) {
  const headerHTML = `<div class="text-center navbar mb-2 shadow-lg bg-neutral text-neutral-content rounded-box"> <div class="flex-1 px-2 mx-2"><span class="text-lg font-bold"> ${title} </span></div></div>`;
  const newDiv = document.createElement("div");
  newDiv.innerHTML = headerHTML;
  newDiv.classList.add("header");
  node.appendChild(newDiv);
}

export { createHeader };
