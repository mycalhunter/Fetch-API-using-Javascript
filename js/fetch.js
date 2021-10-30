// API URL
const url = 'https://randomuser.me/api/?results=25';

// Get 'authors' ul from DOM
const ul = document.getElementById('authors');

// create element to DOM
let createNode = (el) => document.createElement(el);

// append element to parent element - in this case, the Body
let append = (parent,el) => parent.appendChild(el);

// go to url and attempt to get contents of url
fetch(url)
    .then(response => response.json()) // get response in JSON from url
    .then(data => { // if response is 2xx
        let authors = data.results; // connect 'results' object from data to 'authors' variable
        authors.map(author => { // for each iteration of the 'results' object, map the content as 'author'

            // create elements for list item
            let li = createNode('li');
            let img = createNode('img');
            let p = createNode('p');
            let email = createNode('a');
            let location = createNode('p');
            let moreInfo = createNode('a');

            // assign values to list elements
            img.src = author.picture.medium;
            p.innerHTML = `${author.name.first} ${author.name.last}`;
            email.href = `mailto:${author.email}`;
            email.title = `${author.email}`;
            email.target = '_blank'
            email.innerHTML = 'Contact Us';
            location.innerHTML = `Loc: ${author.location.country}`;
            moreInfo.innerHTML = 'More Info';
            moreInfo.href = '#ComingSoon';

            // append complete list items to html ul element
            append(ul, li);
            append(li, img);
            append(li, p);
            append(li, email);
            append(li, location);
            append(li, moreInfo);   
        })
    })
    .catch(error => console.log(error)); // if response is 4xx-5xx