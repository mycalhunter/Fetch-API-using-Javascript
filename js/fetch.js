// API URL
const url = 'https://randomuser.me/api/?results=100';

// Get 'authors' ul from DOM
const ul = document.getElementById('authors');
const modal = document.getElementById('modal');
const body = document.querySelector('body');

// create element to DOM
// function createNode(el) { return document.createElement(el); }
let createNode = (el) => document.createElement(el);

// append element to parent element - in this case, the Body
// function append(parent, el) { return parent.appendChild(el); }
let prepend = (parent, el) => parent.prepend(el);
let append = (parent, el) => parent.appendChild(el);

// go to url and attempt to get contents of url
fetch(url)
    .then(response => response.json()) // get response in JSON from url
    .then(data => { // if response is 2xx, connect json data
        
        let authors = data.results; // connect 'results' object from data to 'authors' variable
        let header = createNode('h1');

        let countryList = [];
        authors.map(countries => {
            if(!countryList.includes(countries.location.country))
            countryList.push(countries.location.country);
        })
        console.log(countryList);

        // For each Country
        for (i = 0; i < countryList.length; i++) {

            // Prepend header above Authors
            prepend(body, header);

            // For each Author retrieved from response
            authors.map(author => {
                if (author.location.country === countryList[i]) {
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
                    location.innerHTML = `Loc: ${author.location.city}, ${author.location.country}`;

                    // append complete list items to html ul element
                    header.innerHTML = author.location.country;
                    append(ul, li);
                    append(li, img);
                    append(li, p);
                    append(li, email);
                    append(li, location);
                }
            })
        }
    })
    .catch(error => console.log(error)); // if response is 4xx-5xx

