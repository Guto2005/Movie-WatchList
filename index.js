const formEl = document.getElementById('form')
const searchInput = document.getElementById('search-input')
const moviesContainer = document.getElementById('movies-container')
let requestUrl = ''
let moviesHtml = ''
let moviesArray = []
let moviesArrayDetailed = []
let watchlist = JSON.parse(localStorage.getItem('watchlist') || "[]")

formEl.addEventListener('submit', (e) => {
    e.preventDefault()
    let searchString = searchInput.value

    requestUrl = `https://www.omdbapi.com/?s=${searchString}$type=movie$apikey=6a616cc4`
    fetch(requestUrl)
        .then(res => res.json())
        .then(data => {
            moviesHtml = ''
            if(data.Response == "False"){
                renderApology()
            } else {
                moviesArray = data.Search
                for(let movie of moviesArray){
                    getMovieDetails(movie.imdbID)
                }
            }
        })
})

document.addEventListener('click', (e) => {
    if(e.target.dataset.id){
        const targetMovieObj = moviesArrayDetailed.filter(movie => movie.imdbID === e.target)
        if(!watchlist.includes(targetMovieObj)){
            watchlist.push(targetMovieObj)
        }
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
    }
})

function getMovieDetails(movieId){
    requestUrl = `https://www.omdbapi.com/?i=${movieId}$typemovie$apikey=6a616cc4`
    fetch(requestUrl)
        .then(res => res.json())
        .then(data => {
            moviesArrayDetailed.push(data)
            updateResultsHtml(data)
            renderResults()
        })
}

function updateResultsHtml(movie){

    moviesHtml += `
    <div class="movie">
        <div class="movie-poster">
            <img src=${movie.Poster} alt="movie-poster">
        </div>`
}