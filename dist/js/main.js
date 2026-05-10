//elements
const scrollToTop=document.querySelector(".scroll-to-top")
, navbar = document.querySelector("header")
, links = document.querySelectorAll("header .navbar .navbar-nav li a")
, mode = document.querySelector(".upper-nav input[type='checkbox']")
, rating = document.querySelectorAll(".stars");


//mode lite & dark
let colors = localStorage.getItem("mode-color");


if (colors !== null) {
  ["--light-color", "--light-color-2", "--dark-color"].forEach(
    (modeColor, index) => {
      document.documentElement.style.setProperty(
        modeColor,
        colors.split(",")[index]
      );
    }
  );
  var isDark = localStorage.getItem("mode-checked");
  isDark == "true" ? (mode.checked = true) : (mode.checked = false);
}



mode.addEventListener("click", (e) => {
  if (e.target.checked == true) {
    document.documentElement.style.setProperty("--light-color", "#161f38");
    document.documentElement.style.setProperty("--light-color-2", "#0b223f");
    document.documentElement.style.setProperty("--dark-color", "#ffff");

    localStorage.setItem("mode-color", ["#161f38", "#0b223f", "#ffff"]);
    localStorage.setItem("mode-checked", true);
  } else {
    document.documentElement.style.setProperty("--light-color", "#ffff");
    document.documentElement.style.setProperty("--light-color-2", "#f8f8f8");
    document.documentElement.style.setProperty("--dark-color", "#161f38");
    localStorage.setItem("mode-color", ["#ffff", "#f8f8f8", "#161f38"]);
    localStorage.setItem("mode-checked", false);
  }
});

//Add Active Class On Navbar Link And Remove From Siblings
links.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    e.target.parentElement.parentElement
      .querySelectorAll(".active")
      .forEach((element) => {
        element.classList.remove("active");
      });
    e.target.classList.add("active");
  });
});




//stars rating
function starsRating(rating) {
  if (rating.innerHTML !== "") {
    rating.innerHTML = "";
  }
  rating.forEach((element) => {
    star = element.dataset.rating;
    restRating = 5 - star;
    for (let i = 0; i < star - (star % 1); i++) {
      let fulStar = document.createElement("i");
      fulStar.className = "fa-solid fa-star";
      element.appendChild(fulStar);
    }
    if (restRating > 0) {
      if (restRating % 1 > 0) {
        let halfStar = document.createElement("i");
        halfStar.className = "fa-solid fa-star-half-stroke";
        element.appendChild(halfStar);

        restRating = restRating - (restRating % 1);
        for (let i = 0; i < restRating; i++) {
          let emptyStar = document.createElement("i");
          emptyStar.className = "fa-regular fa-star";
          element.appendChild(emptyStar);
        }
      } else {
        for (let i = 0; i < restRating; i++) {
          let emptyStar = document.createElement("i");
          emptyStar.className = "fa-regular fa-star";
          element.appendChild(emptyStar);
        }
      }
    }
  });
}
starsRating(rating);