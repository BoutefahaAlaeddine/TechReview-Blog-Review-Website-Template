let ratingClass=document.querySelectorAll(".product .review-comments  .stars div  ");

Quality=[...ratingClass].slice(0,5);
price=[...ratingClass].slice(5,10);
service=[...ratingClass].slice(10,15);
let index=1;

function starColors(classes) {
  classes.forEach(element => {
    element.addEventListener("click", e => { 
      classes.forEach(e => e.classList.add('fa-regular'));
      classes.forEach(e => e.classList.remove('fa-solid'));

       index = classes.indexOf(e.target);
       e.target.parentElement.parentElement.querySelector("input").value=index+1;
      //  classes.slice(0,index+1).map((e)=>e.classList.remove('fa-regular'));
       classes.slice(0,index+1).map((e)=>e.classList.add('fa-solid'));
    });
  });
}

starColors(Quality);
starColors(price);
starColors(service);