//Variables
const itemsTweets = document.getElementById('lista-tweets');

//Event Listeners
eventListeners();

function eventListeners() {
  // Envia formulario
  document.querySelector('#formulario').addEventListener('submit', newTweet);

  
  //Borrar Tweets
  itemsTweets.addEventListener('click', deleteTweets);

  // Contendio al cargar
  document.addEventListener('DOMContentLoaded', localStorageReady);

}

//Funciones

//Añadir Twet
function newTweet(e) {
  e.preventDefault();

  // Leer valor
  const itemTweet = document.getElementById('tweet').value;
  const alertLabel = document.getElementById('alert-textarea');

  if ( itemTweet == '' ) {

    alertLabel.innerText = 'Debe de ingresar un valor';
    alertLabel.classList.add('alert-error');

  } else {
    alertLabel.classList.remove('alert-error');

    // Botón borrar
    const btnDelete = document.createElement('a');
    btnDelete.classList = 'borrar-tweet';
    btnDelete.innerText = 'X'
  
    //Crear elemento - Añadir contenido
    const li = document.createElement('li');
    li.innerText = itemTweet;
    li.appendChild(btnDelete);
    itemsTweets.appendChild(li);
  
    addToLocalStorage(itemTweet);
  
    const clearTextArea = document.getElementById('tweet').value='';
  }



}

// Eliminar tweet
function deleteTweets (e) {
  e.preventDefault();
  if (e.target.className === 'borrar-tweet') {
    e.target.parentElement.remove();
    deleteTweetLocalStorage(e.target.parentElement.innerText)
  }
}

// Agregar al localstorage
function addToLocalStorage(tweet) {
  let tweets;
  tweets = getTweetsLocalStorage();

  //Añadir nuevo tweet
  tweets.push(tweet);

  // De string a arreglo
  localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Mostrar localStorage al cargar
function localStorageReady() {
  let tweets;
  tweets = getTweetsLocalStorage();

  tweets.forEach(item => {
    const btnDelete = document.createElement('a');
    btnDelete.classList = 'borrar-tweet';
    btnDelete.innerText = 'X'

    //Crear elemento - Añadir contenido
    const li = document.createElement('li');
    li.innerText = item;
    li.appendChild(btnDelete);
    itemsTweets.appendChild(li);
  });
}

// Retornar elementos en arreglo
function getTweetsLocalStorage() {
  let tweets;

  // Revisar valores
  if (localStorage.getItem('tweets') === null ) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem('tweets'));
  }

  return tweets;
}

function deleteTweetLocalStorage(tweet) {
  let tweets;
  let tweetBorrado;
  // así se obtiene el tweet a borrar y cortado 
  tweetBorrado = tweet.substring(0, tweet.length - 1)

  tweets = getTweetsLocalStorage(); 

  tweets.forEach(function(tweet, index){
      if(tweetBorrado === tweet) {
          tweets.splice(index, 1)
      }
  })

  localStorage.setItem('tweets', JSON.stringify(tweets))
}