const paramString = window.location.href.split('?')[1];
const queryString = new URLSearchParams(paramString);

let links = [];
let titles = [];
let descriptions = [];
let serviceNames = [];

for (let pair of queryString.entries()) {
    if (pair[0] === "links") {
        links = pair[1].split("|-|,");
    } else if (pair[0] === "titles") {
        titles = pair[1].split("|-|,");
    } else if (pair[0] === "descriptions") {
        descriptions = pair[1].split("|-|,");
    } else if (pair[0] === "serviceNames") {
        serviceNames = pair[1].split("|-|,");
    }
}

console.log(links);
console.log(titles);
console.log(descriptions);
console.log(serviceNames);

const length = Math.max(links.length, titles.length, descriptions.length, serviceNames.length);
console.log(length);

for (let i = 0; i < length; i++) {
    const item = document.createElement("div");
    item.className = "item";

    const serviceName = document.createElement("h2");
    if (i < length) // Safety procaution.
        serviceName.textContent = serviceNames[i];

    const description = document.createElement("p");
    if (i < length)
        description.textContent = descriptions[i];

    const separator = document.createElement("hr");

    item.appendChild(serviceName);
    item.appendChild(description);
    item.appendChild(separator);

    document.body.appendChild(item);
}


// var search = location.search.substring(1);
// const search2 = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
// console.log(search, search2);