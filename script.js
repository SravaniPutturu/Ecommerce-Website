const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav = document.getElementById("navbar");
const all = document.getElementById("all");
const mens = document.getElementById("mens");
const womens = document.getElementById("womens");
const jewellery = document.getElementById("jewellery");
const electronics = document.getElementById("electronics");
const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchBtn");
const product = document.querySelector(".product");
// const signup = document.querySelector('.signup')
// const signin = document.querySelector('.signin')
// const shop = document.querySelector('.shop')


// localStorage.clear()

if (bar) {
  bar.addEventListener("click", () => {
    nav.classList.add("active");
  });
}

if (close) {
  close.addEventListener("click", () => {
    nav.classList.remove("active");
  });
}
var all_products = [];
var mens_products = [];
var womens_products = [];
var jewelery_products = [];
var electronic_products = [];

// Data fetching
async function fetch_data() {
  await fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((i) => {
        all_products.push(i);
        if (i.category == "men's clothing") {
          mens_products.push(i);
        } else if (i.category == "women's clothing") {
          womens_products.push(i);
        } else if (i.category == "jewelery") {
          jewelery_products.push(i);
        } else {
          electronic_products.push(i);
        }
      });
      // Call the function to append products after fetching data
      appendAllProducts(all_products);
      localStorage.setItem("All Items", JSON.stringify(all_products));
    })
    .catch((error) => console.error(error));
}

fetch_data();

const appendAllProducts = () => {
  appendProducts(all_products);
};

// clearing container after click any button.
const clearProductContainer = () => {
  const container = document.querySelector(".product-container");
  container.innerHTML = ""; // Clear the container by setting its inner HTML to an empty string
};

const categoryProcessing = (arr) => {
  clearProductContainer();
  appendProducts(arr);
};

searchBtn.addEventListener("click", () => {
  let input = searchInput.value.trim().toLowerCase();
  let arr = all_products.filter((ele) =>
    ele.category.toLowerCase().includes(input)
  );
  console.log(arr.length);

  if(arr.length === 0){
    let container = document.querySelector(".product-container");
    container.innerHTML = `<h3>Not found !!!</h3>`
    return;
  }

  clearProductContainer();
  categoryProcessing(arr);
});

all.addEventListener("click", () => {
  categoryProcessing(all_products);
  console.log(all_products);
});

mens.addEventListener("click", () => {
  categoryProcessing(mens_products);
});
womens.addEventListener("click", () => {
  categoryProcessing(womens_products);
});
electronics.addEventListener("click", () => {
  categoryProcessing(electronic_products);
});
jewellery.addEventListener("click", () => {
  categoryProcessing(jewelery_products);
});

// appending products to container
const appendProducts = (arr) => {
  let container = document.querySelector(".product-container");

  arr.forEach((item, index) => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    let name = document.createElement("p");
    let rating = document.createElement("div");
    let price = document.createElement("p");

    img.src = item.image;
    name.innerText = `${item.title.slice(0, 25)}...`;

    const setRating = (rate) => {
      console.log(rate);
      let div = document.createElement("div");
      let maxStar = 5;
      for (let i = 1; i <= maxStar; i++) {
        let star = document.createElement("i");

        star.classList.add("fa-star", i <= rate ? "fas" : "far"); // Use "far" for outline stars

        div.appendChild(star);
      }
      return div;
    };

    price.innerHTML = `<div class="cart">Price: $${
      item.price
    } <div onclick = 'handleCart(event, ${item.id})'><i class="fas fa-shopping-cart"></i></div></div>`; // Added price display

    div.appendChild(img);
    div.appendChild(name);
    div.appendChild(setRating(Math.floor(item.rating.rate)));
    div.appendChild(price);

    div.classList.add("product");

    container.appendChild(div);

    div.addEventListener("click", () => {
      // single item for s-product
      let sProduct = localStorage.setItem(
        "Single Product",
        JSON.stringify(item)
      );
      window.location.href = "./s-product/s-product.html";
    });
  });
};



// let  checkUserSignIn = ()=> {
//   return localStorage.getItem("LogginUser") === "" ? false : true;
// }
// let checkUser

// document.addEventListener("DOMContentLoaded", function () {

//   if(checkUserSignIn()){
//     signin.style.display = "block"
//   }
// });



function redirectToSignUp() {
  window.location.href = './Login/index.html';
}