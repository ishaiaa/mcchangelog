let article = document.getElementById("article");
let title = document.getElementById("title");
let thumbnail = document.getElementById("thumbnail");
let label = document.getElementById("label");


function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("sidebarActive");
}

function selectArticle(id) {
    if ('URLSearchParams' in window) {
        var searchParams = new URLSearchParams(window.location.search);
        
        searchParams.set("id", id);
        window.history.pushState({}, "", `?id=${id}`)
    }


    loadArticle();
    if(window.innerWidth <= 600) {
        toggleSidebar();
    }
}

function loadArticle() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    article.innerHTML = ""
    title.innerHTML = "Loading Changelog..."

    if(id === null) {
        article.innerHTML = "No article ID specified"
    }
    else {
        console.log(id);
        fetch(`https://launchercontent.mojang.com/v2/javaPatchNotes/${id}.json`)
        .then(response=>response.json())
        .then(data=> {
            article.innerHTML = data.body;
            document.title = data.title;
            title.innerHTML = data.title;
            label.innerHTML = data.type;
            
            if(data.image) {
                thumbnail.src = `https://launchercontent.mojang.com${data.image.url}`;
                thumbnail.alt = data.image.title;
            }
            else {
                thumbnail.src = "fallback.jpg";
                thumbnail.alt = "Thumbnail";
            }
            
        })
        .catch(()=>{
            article.innerHTML = ""
            document.title = "Not Found :c";
            title.innerHTML = "Couldn't fetch changelog :("
            thumbnail.src = "fallback.jpg";
            thumbnail.alt = "Thumbnail";
            label.innerHTML = "NOT FOUND";
        })
    }
}

function loadVersionList() {
    let list = document.getElementById("versions");
    fetch("https://launchercontent.mojang.com/v2/javaPatchNotes.json")
    .then((response) => response.json())
    .then((data) => {

        data.entries.sort((a, b) => 
            Date.parse(b.date) - Date.parse(a.date)
        );

        data.entries.forEach((entry) => {
            let newElement = document.createElement("li");
            let pElement = document.createElement("p");
            pElement.innerHTML = entry.version;
            newElement.id = entry.id;
            newElement.addEventListener('click', () => {
                selectArticle(entry.id);
            })
            newElement.appendChild(pElement);

            list.appendChild(newElement);
        })
    })
}
loadVersionList() 
loadArticle();
