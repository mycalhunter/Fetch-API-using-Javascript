// API URL
const url = 'https://randomuser.me/api/?results=28';
document.getElementById("url").href = url;
document.getElementById("url").innerHTML = url;

// Get 'authors' ul from DOM
let ul = document.getElementById('authors');

// create element to DOM
let createNode = (el) => document.createElement(el);

// append element to parent element - in this case, the Body
let append = (parent, el) => parent.appendChild(el);

// go to url and attempt to get contents of url
fetch(url)
    .then(response => response.json()) // convert response to JSON format
    .then(data => { // if response is 2xx, connect json data
        let authors = data.results; // connect 'results' object from data to 'authors' variable
        authors.map(author => {
            // create elements for list item
            let li = createNode('li');
            let img = createNode('img');
            let p = createNode('p');
            let email = createNode('a');
            let location = createNode('p');

            // set author image src - Large | Medium | Thumbnail
            img.src = author.picture.medium;

            // Author Name
            p.innerHTML = `${author.name.first} ${author.name.last}`;

            // Author Email
            email.href = `mailto:${author.email}`;
            email.title = `${author.email}`;
            email.target = '_blank';
            email.innerHTML = 'Contact Author';

            // Author Location
            location.innerHTML = `Loc: ${author.location.country}`;
            location.classList.add('pill');

            // append complete list items to html ul element
            append(ul, li);
            append(li, img);
            append(li, p);
            append(li, email);
            append(li, location);
        })
    })
    .catch(error => console.log(error)); // if response is 4xx-5xx

