// let favMovies = [
//     {
//       id: "1694415809280",
//       title: "spider-man",
//       releaseDate: "2005",
//     },
//     {
//       id: "1694415816447",
//       title: "spider-man-2",
//       releaseDate: "2010",
//     },
//     {
//       id: "1694415816450",
//       title: "spider-man-3",
//       releaseDate: "2015",
//     },
//   ];

let favMovies = [];

function makeMovieDiv(movie) {
  if (movie.isEdit) {
    const div = document.createElement("div");
    div.setAttribute("class", "movie-card");

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

    const button = document.createElement("button");
    button.innerText = "Update movie";

    button.addEventListener("click", function () {
      const newTitle = document.querySelector(`#edit-${movie.id}-name`).value;
      const newYear = document.querySelector(`#edit-${movie.id}-year`).value;

      const toUpdateIndex = favMovies.findIndex((m) => m.id == movie.id);
      if (toUpdateIndex != -1) {
        favMovies[toUpdateIndex]["title"] = newTitle;
        favMovies[toUpdateIndex]["releaseDate"] = newYear;
        favMovies[toUpdateIndex]["isEdit"] = false;
        updateMovieListUI();
        saveToLocalStorage();
      }
    });

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
function Form() {
  const form = document.querySelector("#add-movie-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.querySelector("#movie-name").value;
    const year = document.querySelector("#movie-year").value;

    if (!name || !year) {
      validateForm();
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
  });
}
function clear() {
  document.querySelector("#add-movie-form").reset();
}

function saveToLocalStorage() {
  const str = JSON.stringify(favMovies);
  localStorage.setItem("my-movie-list", str);
  localStorage.setItem("favMovies[toEditIndex]", str);
}

function getFromLocalStorage() {
  const str = localStorage.getItem("my-movie-list");
  if (!str) {
    favMovies = [];
  } else {
    favMovies = JSON.parse(str);
  }
}

function validateForm() {
  let x = document.forms["add-movie-form"]["movie-year"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}
// alternativemethod
//   function clear(){
//   var inputElement = document.getElementById("movie-name");
//   var inputElement2 = document.getElementById("movie-year");
//   inputElement2.value = "";
//   inputElement.value = "";

// }

getFromLocalStorage();
updateMovieListUI();
Form();
