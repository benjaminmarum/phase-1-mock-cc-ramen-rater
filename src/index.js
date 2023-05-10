// write your code here
document.addEventListener('DOMContentLoaded', () => {

    let currentId = 1;
    let maxId = 0;
    let allData = [];

    // function initalize() {
    //     let currentId = 1;
    //     let allData = [];
    //     createButton();
    // };


    // Basic Get request (Read)
    fetch('http://localhost:3000/ramens')
        .then((r) => r.json())
        .then((ramens) => {
            allData = ramens;
            allData.forEach((ramen) => 
            {
                addRamen(ramen);
                maxId = maxId + 1;
            }
            ); 
            createButton();
        })

    //Adds a menu
    function addRamen(menu) {
        //console.log(menu)
        const menuItems = document.querySelector("#ramen-menu");
        const img = document.createElement("img")
        img.src = menu.image
        menuItems.append(img);

        //event
        img.addEventListener('click', (event) => {
            // console.log(event)
            // console.log(event.target)
            currentId = menu.id
            renderDish(menu)
        })

    }


    function renderDish(dish) {
        const ramenDetails = document.getElementById("ramen-detail");

        const currentImage = document.querySelector(".detail-image");
        const currentName = document.querySelector(".name");
        const currentRest = document.querySelector(".restaurant");

        const currentRating = document.querySelector("#rating-display");
        const currentComment = document.querySelector("#comment-display");


        // const currentDes = document.querySelector("#dish-description");
        // const currentPrice = document.querySelector("#dish-price");

        const img = document.createElement("img");
        const ramenName = document.createElement("h2")
        const ramenRest = document.createElement("h3")
        const ramenRating = document.createElement("span")
        const ramenComment = document.createElement("span")
        // const dishDescription = document.createElement("p")
        // const dishPrice = document.createElement("h3")

        img.src = dish.image
        img.id = 'ramen-image'
        img.className = 'detail-image'
        ramenName.textContent = dish.name
        ramenName.className = 'name'
        ramenRest.textContent = dish.restaurant
        ramenRest.className = 'restaurant'

        ramenRating.textContent = dish.rating
        ramenRating.id = 'rating-display'

        ramenComment.textContent = dish.comment
        ramenComment.id = 'comment-display'

        //ramenName.id = "ramen-name"
        // dishDescription.textContent = dish.description
        // dishDescription.id = "dish-description"
        // dishPrice.textContent = `$ ${dish.price}`;
        // dishPrice.id = "dish-price";


        // console.log(currentRating)
        // console.log(ramenRating)
        // function nodeReplacement(el) {
        // ramenDetails.replaceChild(img, currentImage)
        // ramenDetails.replaceChild(ramenName, currentName)
        // ramenDetails.replaceChild(ramenRest, currentRest)
        // ramenDetails.replaceChild(ramenRating, currentRating)
        // ramenDetails.replaceChild(ramenComment, currentComment)
        // };

        ramenDetails.replaceChild(img, currentImage)
        ramenDetails.replaceChild(ramenName, currentName)
        ramenDetails.replaceChild(ramenRest, currentRest)

        currentRating.replaceWith(ramenRating)
        currentComment.replaceWith(ramenComment)

        // ramenDetails.replaceChild(ramenRating, currentRating)
        // ramenDetails.replaceChild(ramenComment, currentComment)

        //dishTextDiv.replaceChild(dishDescription, currentDes)
        // dishTextDiv.replaceChild(dishPrice, currentPrice)

        //dishImage.src = dish.image;
        // console.log(dishSection)
        // console.log(dishImage)
        // console.log(img)
    };



    function createButton() {
        const form = document.querySelector("#new-ramen")
        console.log(form)
        newId = maxId + 1;

        //submit event
        form.addEventListener('submit', (event) => {
            event.preventDefault()

            console.log(event)
            console.log(event.target)

            const newRamen = {
                id: newId,
                name: document.querySelector("#new-name").value,
                restaurant: document.querySelector("#new-restaurant").value,
                image: document.querySelector("#new-image").value,
                rating: document.querySelector("#new-rating").value,
                comment: document.querySelector("#new-comment").value,
            };

            renderDish(newRamen)
            postRamen(newRamen)

            // Post
            function postRamen(ramen) {
                fetch('http://localhost:3000/ramens', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(ramen)
                })
                    .then((r) => r.json())
                    .then((ramen) => addRamen(ramen))
            }

        })
    }
})