// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

let paramString = window.location.href.split('?')[1];
let queryString = new URLSearchParams(paramString);

let links = [];
let titles = [];
let descriptions = [];

for (let pair of queryString.entries()) {
    if (pair[0] === "links") {
        links = pair[1].split("|-|,");
    } else if (pair[0] === "titles") {
        titles = pair[1].split("|-|,");
    } else if (pair[0] === "descriptions") {
        descriptions = pair[1].split("|-|,");
    }

   console.log("Key is: " + pair[0]);
   console.log("Value is: " + pair[1]);
}

console.log(links);
console.log(titles);
console.log(descriptions);

// var search = location.search.substring(1);
// const search2 = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
// console.log(search, search2);