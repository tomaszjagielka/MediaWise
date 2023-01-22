const paramString = window.location.href.split('?')[1];
const queryString = new URLSearchParams(paramString);

function checkAuthor() {    
    let links = [];
    let titles = [];
    let descriptions = [];
    let serviceNames = [];

    for (let pair of queryString.entries()) {
        console.log(pair[0], pair[1]);
    
        switch (pair[0]) {
            case "links":
                links = pair[1].split("|-|,");
                break;
            case "titles":
                titles = pair[1].split("|-|,");
                break;
            case "descriptions":
                descriptions = pair[1].split("|-|,");
                break;
            case "serviceNames":
                serviceNames = pair[1].split("|-|,");
                break;
        }
    }

    console.log(links);
    console.log(titles);
    console.log(descriptions);
    console.log(serviceNames);

    const length = Math.max(links.length, titles.length, descriptions.length, serviceNames.length);

    for (let i = 0; i < length; i++) {
        const item = document.createElement("div");
        item.className = "item";

        const serviceName = document.createElement("h2");
        if (i < length) // Safety precaution.
            serviceName.textContent = serviceNames[i];
        serviceName.className = "serviceName";

        const description = document.createElement("p");
        if (i < length)
            description.textContent = descriptions[i];
        description.className = "description";

        const separator = document.createElement("hr");

        item.appendChild(serviceName);
        item.appendChild(description);
        item.appendChild(separator);

        document.body.appendChild(item);
    }
}

switch (queryString.entries().next().value[1]) {
    case "checkAuthor":
        checkAuthor();
        break;
}

// if (queryString.entries().next()[0] === "checkAuthor") {
//     getAuthors();
// }

// var search = location.search.substring(1);
// const search2 = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
// console.log(search, search2);