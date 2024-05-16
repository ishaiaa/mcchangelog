const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

let sidebar = document.getElementById("sidebar");
let sidebarOn=false;
function toggleSidebar() {
    sidebarOn = !sidebarOn;
    console.log(sidebarOn)
    sidebar.style.left = sidebarOn ? "-700px" : "0";
}

if(id === null) {
    console.log("rip")
}
else {
    console.log(id);
    fetch(`https://launchercontent.mojang.com/v2/javaPatchNotes/${id}.json`).then(response=>response.json())
    .then(data=> {
        document.body.innerHTML += data.body;
        document.title = data.title;
    })
}