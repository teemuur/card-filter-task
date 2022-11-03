const requestURL = 'https://jsonplaceholder.typicode.com/posts/?_start=0&_limit=7'
const searchBtn = document.querySelector('#searchBtn')
const hash = document.location.hash
const searchInput = document.querySelector('#searchInput')


function sendRequest(method, url) {
    return fetch(url).then(response => {
        return response.json()
    })
}


sendRequest('GET', requestURL)
    .then(data => addElement(data))
    .catch(err => console.log(err))


function addElement(data) {

    const parentDiv = document.createElement(`div`)
    parentDiv.classList = 'card-list'


    for (let i = 0; data.length > i; i++) {
        const newDiv = document.createElement(`div`)
        const titleText = document.createTextNode(`${data[i].title}`)
        const bodyText = document.createTextNode(`${data[i].body}`)
        const h2Text = document.createElement("h2")
        const para = document.createElement("p")
        const checkbox = document.createElement('input')


        newDiv.id = `item${i}`
        newDiv.classList = 'card'

        checkbox.type = 'checkbox'
        checkbox.name = 'name'
        checkbox.value = 'value'
        checkbox.id = `checklbox-${i}`

        para.appendChild(bodyText)
        h2Text.appendChild(titleText)
        newDiv.appendChild(h2Text)
        newDiv.appendChild(para)
        newDiv.appendChild(checkbox)
        parentDiv.appendChild(newDiv)
        
        checkbox.addEventListener('click', event => {
            changeCheckbox(newDiv)

        });


        const currentDiv = document.getElementById('div')
        document.body.insertBefore(parentDiv, currentDiv)
    }

    if (hash) {
        loadFromHash()
        
    }
}

searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchBtn.click();
    }
  }); 
    
function changeCheckbox(elem) {
    if (elem.classList.contains('card-on')) {
        elem.classList.add('card-off')
        elem.classList.remove('card-on')
    }
    else {
        elem.classList.remove('card-off')
        elem.classList.add('card-on')
    }
}

searchBtn.addEventListener('click', event => {
    searchTitle()

});


function searchTitle() {
    const searchInput = document.querySelector('#searchInput').value
    filter(searchInput)

}

function updateCardsHash(str) {
    document.location.hash = str.toString()
}

function loadFromHash() {
    filter(hash.substring(1))
}

function filter(context) {
    const cards = document.querySelectorAll('.card')
    const label = document.querySelectorAll('h2')

    updateCardsHash(context)

    for (let i = 0; i < cards.length; i++) {
        if (label[i].textContent.toUpperCase()
            .includes(context.toUpperCase())) {
            cards[i].classList.remove("is-hidden");
        } else {
            cards[i].classList.add("is-hidden");
        }
    }
}


