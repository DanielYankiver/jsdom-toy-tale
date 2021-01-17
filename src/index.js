let addToy = false;
getAllToys()

// document.addEventListener("DOMContentLoaded", () => {
const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyFormContainer.style.display = "block";
  } else {
    toyFormContainer.style.display = "none";
  }
});
// });

// //********** ^^ THEIR CODE ^^ ************/

// //********** CODE ALONG ************/


// //********** Grab Elements off the DOM ************/

const toyDiv = document.querySelector('#toy-collection')
const toyForm = document.querySelector('.add-toy-form')

// //********** Event Listeners **********************/

toyForm.addEventListener('submit', grabFormInputs)

toyDiv.addEventListener('click', increaseLike)


// //********** Network Request (Fetch) **************/

function getAllToys() {
  fetch("http://localhost:3000/toys")
    .then(res => res.json())
    .then(toyArray => createToyDivs(toyArray))
}

function createToyInDatabase(toyObj) {
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(toyObj),
  })
    .then(res => res.json())
    .then(slapToyOnDom)
}

function updateToyInDatabase(toyId, likesObj) {
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(likesObj),
  })
}


// //****** Manipulating the Dom and Logic  **********/

function createToyDivs(toyArray) {
  toyArray.forEach(toy => {
    toyDiv.innerHTML += `
      <div class="card" data-id=${toy.id}>
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p data-likes=${toy.likes}>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
      </div>
      `
  })
}

function slapToyOnDom(toy) {
  toyDiv.innerHTML += `
  <div class="card" data-id=${toy.id}>
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p data-likes=${toy.likes}>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>
  `
}


function grabFormInputs(event) {
  event.preventDefault()
  // debugger
  const name = event.target.name.value
  const img = event.target.image.value

  toyObj = {
    name: name,
    image: img,
    likes: 0
  }

  createToyInDatabase(toyObj)

}

function increaseLike(e){
  // debugger
  // if (e.target.className === "like-btn")
  if (e.target.matches('button.like-btn')){
    //  Find Current Value
    const pTag = e.target.parentElement.querySelector('p')
    let currentLikes = parseInt(pTag.dataset.likes)
    //  increase current by 1 
    let nextLikes = currentLikes + 1 
    //  Add the new value dom
    pTag.innerText = `${nextLikes} Likes`
    pTag.dataset.likes = nextLikes
    //  send patch request --- do fetch above in the right section ^^  
    const likesObj = {likes: nextLikes}
    const toyId = pTag.parentElement.dataset.id
    updateToyInDatabase(toyId, likesObj)
  }
}















// //********** MY CODE  ************/
// /********* GLOBAL SCOPE BEGINS HERE *********/

// function loadToys() {
//   const toysURL = "http://localhost:3000/toys"
//   fetch(toysURL)
//     .then(response => response.json())
//     .then(data => {
//       data.forEach(toyObject => renderToy(toyObject))
//     })
// }



// const collectionDiv = document.querySelector('#toy-collection')

// function renderToy(toyObject) {
//   const toyDiv = document.createElement('div')
//   toyDiv.classList.add('card')
//   collectionDiv.append(toyDiv)

//   const toyName = document.createElement('h2')
//   toyName.classList.add('toy-name')
//   // toyDiv.appendChild(toyName)
//   toyName.innerText = toyObject.name

//   const toyImage = document.createElement('img')
//   toyImage.classList.add('toy-avatar')
//   toyImage.src = toyObject.image
//   toyImage.alt = `Photo of ${toyObject.name}`
//   // toyDiv.appendChild(toyImage)

//   const toyLikes = document.createElement('p')
//   toyLikes.classList.add('toy-likes')
//   // toyDiv.appendChild(toyLikes)
//   toyLikes.innerText = toyObject.likes

//   const likeBtn = document.createElement('button')
//   likeBtn.classList.add('like-btn')
//   likeBtn.dataset.id = 'likes'
//   likeBtn.textContent = "Like!"
//   // toyDiv.appendChild(likeBtn)

//   toyDiv.append(toyName, toyImage, toyLikes, likeBtn)

// }


// // toyObject.dataset.id = toyObject.id

// const toyForm = document.querySelector('.add-toy-form')
// toyForm.addEventListener("submit", handleToyFormSubmit)

// function handleToyFormSubmit(event) {
//   // Step 0: always prevent default for form submit events
//   event.preventDefault()

//   const newToyObject = {
//     name: event.target.name.value,
//     image: event.target.image.value,
//     likes: 0
//   };

//   fetch('http://localhost:3000/toys', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newToyObject),
//   })
//     .then(response => response.json())
//     .then(newToyObject => {
//       console.log("Toy submitted!")
//       // rendertoy(newToyObject)
//     })

//   event.target.reset()
// }



// /****** LIKE BUTTON  *******/

// const likeButton = document.querySelector('.like-btn')

// likeButton.addEventListener('click', function (event) {
//   if (event.target.dataset.id === "likes") {
//     const button = event.target

//     // traverse the DOM to find elements we care about, relative to the button
//     const card = button.closest(".card")
//     const id = card.dataset.id
//     // traverse the DOM to find elements we care about, relative to the button
//     const likeCount = card.querySelector(".toy-likes")
//     // get the donation amount from the DOM
//     const likeCount = parseInt(likeP.textContent)
//     // optimistic rendering!
//     // donationCountSpan.textContent = donationCount + 10 
//     fetch(`http://localhost:3000/toys${id}`, {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         donations: donationCount + 10
//       }),
//     })
//       .then(response => response.json())
//       .then(updateToy => {
//         console.log('Success:', updateAnimal);


//         // update the DOM
//         // pessimistic rendering!
//         donationCountSpan.textContent = updatedAnimal.donations
//       })

//   }

// })

