let favMovies = [
    {
      id: "1694415809280",
      title: "spider-man",
      releaseDate: "2005",
    },
    {
      id: "1694415816447",
      title: "spider-man-2",
      releaseDate: "2010",
    },
    {
      id: "1694415816450",
      title: "spider-man-3",
      releaseDate: "2015",
    },
  ];
  
  function makeMovieDiv(movie) {
    
    const div = document.createElement("div");
    div.setAttribute("class", "movie-card");
    const id = `movie-${movie["id"]}`;
    div.setAttribute("id", id);
   
    const h2 = document.createElement("h2");
    h2.innerText = movie["title"];
    const h3 = document.createElement("h3");
    h3.innerText = movie["releaseDate"];
    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Clear";
    deleteBtn.addEventListener("click", function () {
      removeMovie(movie["id"]);
    });
    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(deleteBtn);
    return div;
  }
  function removeMovie(movieId) {
    console.log("Deleting ", movieId);
    
    const filteredArray = favMovies.filter((movie) => movie.id != movieId);
    favMovies = filteredArray;
    updateMovieListUI();
  }
  function addMovie(movie) {
    favMovies.push(movie);
    updateMovieListUI();
  }
  function appendToApp(movieDiv) {
    const app = document.querySelector("#app");
    app.appendChild(movieDiv);
  }
  function clearApp() {
    const app = document.querySelector("#app");
    app.innerHTML = "";
  }
  function updateMovieListUI() {
    clearApp();
    for (let i = 0; i < favMovies.length; i++) {
      const movieDiv = makeMovieDiv(favMovies[i]);
      appendToApp(movieDiv);
    }
  }
  function Form() {
    const form = document.querySelector("#add-movie-form");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const name = document.querySelector("#movie-name").value;
      const year = document.querySelector("#movie-year").value;
      
    
      const movie = {
        id: new Date().getTime(),
        title: name,
        releaseDate: year,
      };
      addMovie(movie);
      clear(); 
    });
  }
  



  function clear()
  {
    document.querySelector("#add-movie-form").reset()  ;
}
  // alternativemethod
//   function clear(){
//   var inputElement = document.getElementById("movie-name");
//   var inputElement2 = document.getElementById("movie-year");
//   inputElement2.value = "";
//   inputElement.value = "";
  
   

// }

updateMovieListUI();
Form();
  
  
  
