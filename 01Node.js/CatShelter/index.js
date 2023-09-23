
const http = require('http');
const homeHtml = require("./views/home/index");
const siteCss = require("./content/styles/site.js");
const addBreedHtml = require("./views/addBreed.js");
const addCatHtml = require("./views/addCat.js");
const catTemplate = require("./views/home/catTemplate.js");
const port = 5555;

const cats = [
    {
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFKNy8gbF-BTTkX1SXa4bYLgSauMitVgTn9g&usqp=CAU',
        name: 'Kotka1',
        breed: 'StreetCat',
        description: 'Very cute!'
    },
    {
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt_0wBzrZp-zXlH2FrnzNK-nN_HDE0HarEwA&usqp=CAU',
        name: 'Kotka2',
        breed: 'StreetCat2',
        description: 'Very cute!2'
    },
    {
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX4X7XltQOdg-5G35VVVRtEY0gkVcWFmueYQ&usqp=CAU',
        name: 'Kotka3',
        breed: 'StreetCat3',
        description: 'Very cute!3'
    },
    {
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqqPgFJbOJkjTbu5OirAFYOfE51hGxOrJ1wA&usqp=CAU',
        name: 'Kotka4',
        breed: 'StreetCat4',
        description: 'Very cute!4'
    }
]

const server = http.createServer((req, res) => {
    const { url } = req;
    console.log(url);

    if (url === '/') {
        const imageUrlPattern = /{{imageUrl}}/g;
        const namePattern = /{{name}}/g;
        const breedPattern = /{{breed}}/g;
        const descriptionPattern = /{{description}}/g;

        const catHtml = cats.map((cat) => catTemplate.replace(imageUrlPattern, cat.imageUrl)
            .replace(namePattern, cat.name)
            .replace(breedPattern, cat.breed)
            .replace(descriptionPattern, cat.description));

        const homeHtmlTemplate = homeHtml.replace('{{cats}}', catHtml)
        res.writeHead(200, {
            "Content-Type": "text/html",
        });

        res.write(homeHtmlTemplate);

    } else if (url === '/content/styles/site.css') {
        res.writeHead(200, {
            "Content-Type": "text/css"
        });

        res.write(siteCss)
    } else if (url === '/cats/add-breed') {

        res.writeHead(200, {
            "Content-Type": "text/html",
        });

        res.write(addBreedHtml);
    } else if (url === '/cats/add-cat') {
        res.writeHead(200, {
            "Content-Type": "text/html",
        });

        res.write(addCatHtml);
    }
    
    res.end();
});

server.listen(port, () => console.log(`Server is running on ${port}!`));
