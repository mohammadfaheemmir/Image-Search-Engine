let searchBox = document.getElementById("search-box");
let searchButtton = document.getElementById("search-button");
let searchResultContainer = document.getElementById("search-result");
let showMore = document.getElementById("show-more");
const clientId = "h_AW4EXdqzkUVJtS-N9Kg1LGWB8zHlwUF35Sdt0LvCs";
let page = 1;
let keyword;
searchButtton.addEventListener("click", function () {
    page = 1;
    keyword = searchBox.value.toLowerCase();
    searchImages();
    searchBox.value = ""
});

showMore.addEventListener("click", function () {
    page++

    searchImages();
});
function searchImages() {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${clientId}&per_page=12`;
    fetch(url)
        .then(response => response.json())
        .then((imagesData) => {

            if (page === 1) {
                searchResultContainer.innerHTML = "";
            }


            imagesData.results.forEach((result) => {
                const imgContainer = document.createElement('div');
                let img = document.createElement("img");
                img.src = result.urls.small;
                searchResultContainer.appendChild(imgContainer);
                const imageLink = document.createElement('a')
                imageLink.href = result.links.html;
                imageLink.target = "_blank"
                let button = document.createElement('button')
                button.innerHTML = "Download"
                button.classList.add("btn")
                imageLink.appendChild(button)

                imgContainer.appendChild(img);
                imgContainer.appendChild(imageLink);
            })
            if (imagesData.total_pages > page) {
                showMore.classList.remove("hide");
            } else {
                showMore.classList.add("hide");
            }
        }
        )
}
