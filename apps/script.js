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
  if (movie.isEdit) {
    const div = document.createElement("div");
    div.setAttribute("class", "movie-card");

      //Creating input section by using the java script

    const nameInput = document.createElement("input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("name", `edit-${movie.id}-name`);
    nameInput.setAttribute("placeholder", "Enter movie name");
    nameInput.setAttribute("id", `edit-${movie.id}-name`);
    nameInput.setAttribute("value", movie.title);

    const yearInput = document.createElement("input");
    yearInput.setAttribute("type", "number");
    yearInput.setAttribute("name", `edit-${movie.id}-year`);
    yearInput.setAttribute("placeholder", "Enter movie year");
    yearInput.setAttribute("id", `edit-${movie.id}-year`);
    yearInput.setAttribute("value", movie.releaseDate);

    //creating button by using java script

    const button = document.createElement("button");
    button.innerText = "Update movie";

    //Update the card
    button.addEventListener("click", function () {
      const newTitle = document.querySelector(`#edit-${movie.id}-name`).value;
      const newYear = document.querySelector(`#edit-${movie.id}-year`).value;
      if (!newTitle || !newYear) {
        alert("Enter all fields");
      } else {
        if (newYear > new Date().getFullYear() ) {
          alert("enter correct year");
        } else if (newYear < 1895) {
          alert("enter correct year");
        } else {
      const toUpdateIndex = favMovies.findIndex((m) => m.id == movie.id);
      if (toUpdateIndex != -1) {
        favMovies[toUpdateIndex]["title"] = newTitle;
        favMovies[toUpdateIndex]["releaseDate"] = newYear;
        favMovies[toUpdateIndex]["isEdit"] = false;
        updateMovieListUI();
        saveToLocalStorage();
      }}
    }
    });
// appeding to the main div
    div.appendChild(nameInput);
    div.appendChild(yearInput);
    div.appendChild(button);

    return div;
  } else {
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

    const editBtn = document.createElement("button");
    editBtn.innerText = "Update";
    editBtn.addEventListener("click", function () {
      editMovie(movie["id"]);
    });

    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(deleteBtn);
    div.appendChild(editBtn);

    return div;
  }
}
function removeMovie(movieId) {
  const filteredArray = favMovies.filter((movie) => movie.id != movieId);
  favMovies = filteredArray;
  updateMovieListUI();
  saveToLocalStorage();
}

function editMovie(movieId) {
  console.log("Editing ", movieId);
  const toEditIndex = favMovies.findIndex((movie) => movie.id == movieId);
  if (toEditIndex != -1) {
    favMovies[toEditIndex]["isEdit"] = true;
    updateMovieListUI();
  }
}

function addMovie(movie) {
  favMovies.push(movie);
  updateMovieListUI();
  saveToLocalStorage();
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

// form
function Form() {
  const form = document.querySelector("#add-movie-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector("#movie-name").value;
    const year = document.querySelector("#movie-year").value;
    //passing argument
    validateForm(name , year)
    
  });
}
// function to clear the input tag after the submition
function clear() {
  document.querySelector("#add-movie-form").reset();
}
//save to local
function saveToLocalStorage() {
  const str = JSON.stringify(favMovies);
  localStorage.setItem("my-movie-list", str);
  localStorage.setItem("favMovies[toEditIndex]", str);
}
//get from local

function getFromLocalStorage() {
  const str = localStorage.getItem("my-movie-list");
  if (!str) {
   return favMovies;
  } else {
    favMovies = JSON.parse(str);
  }
}
//function for validation
function validateForm(name , year) {
  
  if (!name || !year) {
    alert("Enter all fields");
  } else {
    if (year > new Date().getFullYear() ) {
      alert("enter correct year");
    } else if (year < 1895) {
      alert("enter correct year");
    } else {
      const movie = {
        id: new Date().getTime(),
        title: name,
        releaseDate: year,
        isEdit: false,
      };
      addMovie(movie);
      clear();
    }
  }
}
// alternativemethod
//   function clear(){
//   var inputElement = document.getElementById("movie-name");
//   var inputElement2 = document.getElementById("movie-year");
//   inputElement2.value = "";
//   inputElement.value = "";

// }



//function call
getFromLocalStorage();
updateMovieListUI();
Form();
