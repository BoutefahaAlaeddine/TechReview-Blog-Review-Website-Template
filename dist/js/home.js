//element
const sortBtn = document.querySelector(".filter-menu").children
, sortItem = document.querySelector(".filter-item").children
, thumbnailImages = document.querySelectorAll(
  ".thumbnails .carousel li img"
),
block = document.querySelectorAll("section")
, masterImage = document.querySelector(".videos .master-img img")
, thumbnailsTrending = document.querySelector(".trending .thumbnails")
, carouselVideos = document.querySelector(".videos .thumbnails .carousel")
, firstCardVideosWidth = carouselVideos.querySelector(".card").offsetWidth
, carouselTrending = document.querySelector(
  ".trending .thumbnails .carousel"
),
 firstCardTrendingWidth =
  carouselTrending.querySelector(".card").offsetWidth;


//Smoothly Scroll To Element
links.forEach((ele) => {
  ele.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("." + e.target.dataset.scroll).scrollIntoView({
      behavior: "smooth",
    });
  });
});


window.onscroll = function () {
  //Sync Navbar Links With Sections
  block.forEach((element) => {
    if (window.pageYOffset > element.offsetTop - navbar.clientHeight) {
      var blockClass = element.classList.item(1);

      links.forEach((link) => {

        if (link.classList.item(2) == "active") {
          link.classList.remove("active");
        }
      });
      document
        .querySelector('.navbar li a[data-scroll="' + blockClass + '"]')
        .classList.add("active");
    }
  });

  //scroll up
  if (window.pageYOffset >= 1000) {
      scrollToTop.style.right = "5px";
  } else {
    scrollToTop.style.right = "-100%";
  }
};



//categories
for (let i = 0; i < sortBtn.length; i++) {
  sortBtn[i].addEventListener("click", function () {
    for (let j = 0; j < sortBtn.length; j++) {
      sortBtn[j].classList.remove("current");
    }

    this.classList.add("current");

    let targetData = this.getAttribute("data-target");

    for (let k = 0; k < sortItem.length; k++) {
      sortItem[k].classList.remove("active");
      sortItem[k].classList.add("delete");

      if (
        sortItem[k].getAttribute("data-item") == targetData ||
        targetData == "all"
      ) {
        sortItem[k].classList.remove("delete");
        sortItem[k].classList.add("active");
      }
    }
  });
}
// Thumbnails Gallery

function scrollImages(carousel, firstCardWidth, thumbnails = "") {
  const carouselChildrens = [...carousel.children];

  let isDragging = false,
    isAutoPlay = true,
    startX,
    startScrollLeft,
    timeoutId;

  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  carouselChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

  carouselChildrens.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
  carousel.classList.remove("no-transition");

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  if (thumbnails !== "") {
    const infiniteScroll = () => {
      if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      } else if (
        Math.ceil(carousel.scrollLeft) ===
        carousel.scrollWidth - carousel.offsetWidth
      ) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
      }

      clearTimeout(timeoutId);
      if (!thumbnails.matches(":hover")) autoPlay();
    };

    const autoPlay = () => {
      if (window.innerWidth < 800 || !isAutoPlay) return;
      timeoutId = setTimeout(
        () => (carousel.scrollLeft += firstCardWidth),
        2500
      );
    };
    autoPlay();
    carousel.addEventListener("scroll", infiniteScroll);
    thumbnails.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    thumbnails.addEventListener("mouseleave", autoPlay);
  }

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
}
scrollImages(carouselVideos, firstCardVideosWidth);
scrollImages(carouselTrending, firstCardTrendingWidth, thumbnailsTrending);

function editMasterImage(images) {
  images.forEach((image) => {
    image.addEventListener("click", function () {
      images.forEach((sibling) => {
        sibling.classList.remove("selected");
        sibling.parentElement.style.cssText =
          "border: 3px solid black; opacity: 0.6;";
      });

      const masterImageCaredInfo =
        masterImage.parentElement.querySelector(".card-info");
      const thumbnailsImageCaredInfo =
        this.parentElement.parentElement.querySelector(".card-info");

      //chang rating
      masterImageCaredInfo.innerHTML = thumbnailsImageCaredInfo.innerHTML;

      this.className = "selected";
      this.parentElement.style.cssText =
        "border: 3px solid #ad1f10;opacity: 1;";
      masterImage.style.display = "none";
      masterImage.src = this.src;
      masterImage.style.display = "block";
    });
  });
}
editMasterImage(
  document.querySelectorAll(".videos .thumbnails .carousel li img")
);
