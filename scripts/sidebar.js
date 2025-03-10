import { getListOfEpisodes } from "./api.js";

async function createSidebar(node, containerName, linkCallback) {
  let page = 1;
  const episodes = await getListOfEpisodes(page);
  page = page + 1;
  const buttonId = "load-more-button";
  const listId = "list-id-to-append-more-episodes";
  const episodesHTML = episodes.map(
    (episode) => `<li>
                    <a id="link-${episode.id}">Episode ${episode.id} </a>
                  </li>
  `
  );
  const html = `<div class="py-4 artboard artboard-demo bg-base-200">
    <div class="flex" id="${containerName}">
      <div class="flex-1">
        <ul class="menu p-4 shadow-lg bg-base-100 rounded-box" id=${listId}>
          <li class="menu-title"></li>
          <p class="text-2xl ... bg-gray-200 p-4 font-bold...">Episodes list</p>
            
          </li>
          ${episodesHTML.join("")}
        </ul>
        <button class="btn btn-outline mt-62"id=${buttonId}>Load More</button>
      </div>
    </div
  </div>
  `;
  const newDiv = document.createElement("div");
  newDiv.innerHTML = html;
  node.appendChild(newDiv);

  const button = document.getElementById(buttonId);
  episodes.forEach((episode) => {
    console.log(`link-${episode.id}`);
    const episodeLink = document.getElementById(`link-${episode.id}`);
    episodeLink.onclick = () => {
      linkCallback(episode.id);
    };
  });

  button.onclick = async () => {
    const episodes = await getListOfEpisodes(page);

    if (episodes && episodes.length > 0) {
      page = page + 1;
      const episodesHTML = episodes.map(
        (episode) =>
          `<a class="pointer-events-auto border border-red-500 focus:border-blue-500 ... p-3 m-3 font-semibold" id="link-${episode.id}">Episode ${episode.id} </a>`
      );
      episodesHTML.forEach((episodeHTML) => {
        const list = document.getElementById(listId);
        const listItem = document.createElement("li");
        listItem.innerHTML = episodeHTML;
        list.appendChild(listItem);
      });

      episodes.forEach((episode) => {
        const episodeLink = document.getElementById(`link-${episode.id}`);
        episodeLink.onclick = () => {
          linkCallback(episode.id);
        };
      });
    }
  };
}

export { createSidebar };
