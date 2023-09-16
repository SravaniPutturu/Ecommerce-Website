if (!localStorage.getItem("Cart")) {
  localStorage.setItem("Cart", "");
}

let mainDiv = document.querySelector("#product-details");
let selectedItem = JSON.parse(localStorage.getItem("Single Product"));
let all_products = JSON.parse(localStorage.getItem("All Items"));

var similarItems = all_products.filter(
  (ele) =>
    ele.category === selectedItem.category && ele.title !== selectedItem.title
);
let itemsArr = [selectedItem, ...similarItems];

let div = `
  <div class="singleProduct" >
    <div class="carousel" id="carousel-0">
      <img src="${itemsArr[0].image}" />
    </div>
    <div>
    <div class="product-details">
      <!-- Product Details -->
      <h3><u>${itemsArr[0].title}</u></h3>
      <h2>$ ${itemsArr[0].price}</h2>
      <select>
        <option>Select Size</option>
        <option>L</option>
        <option>M</option>
        <option>XL</option>
        <option>XXL</option>
      </select>
      <p>
        <span><input type="number"/></span>
        <button class="">Add To Cart</button>
      </p>
      <h3><u>Product Details</u></h3>
      <p>${itemsArr[0].description}</p>
    </div>
     <div class="carousel-navigation">
      <button class="carousel-prev-button"><i class="fas fa-chevron-left"></i></button>
      <button class="carousel-next-button"><i class="fas fa-chevron-right"></i></button>
     </div>
    </div>
  </div>
`;

mainDiv.innerHTML = div;

let currentIndex = 0;

// Function to update the product details and images
function updateProductDetails(index) {
  const product = itemsArr[index];
  const productDiv = document.querySelector(".singleProduct");
  const carousel = productDiv.querySelector(".carousel");
  const productDetails = productDiv.querySelector(".product-details");

  carousel.innerHTML = `<img src="${product.image}" />`;
  productDetails.innerHTML = `
    <h3><u>${product.title}</u></h3>
    <h2>$ ${product.price}</h2>
    <select>
      <option>Select Size</option>
      <option>L</option>
      <option>M</option>
      <option>XL</option>
      <option>XXL</option>
    </select>
    <p>
      <span><input type="number"/></span>
      <button>Add To Cart</button>
    </p>
    <h3><u>Product Details</u></h3>
    <p>${product.description}</p>
  `;
}

// Function to handle "Previous" button click
function showPreviousProduct() {
  if (currentIndex > 0) {
    currentIndex--;
    updateProductDetails(currentIndex);
  }

  // Hide the "Previous" button if the first item is visible
  if (currentIndex === 0) {
    document.querySelector(".carousel-prev-button").style.display = 'none';
  }

  // Always show the "Next" button after clicking "Previous"
  document.querySelector(".carousel-next-button").style.display = 'block';
}

// Function to handle "Next" button click
function showNextProduct() {
  if (currentIndex < itemsArr.length - 1) {
    currentIndex++;
    updateProductDetails(currentIndex);
  }

  // Hide the "Next" button if the last item is visible
  if (currentIndex === itemsArr.length - 1) {
    document.querySelector(".carousel-next-button").style.display = 'none';
  }

  // Always show the "Previous" button after clicking "Next"
  document.querySelector(".carousel-prev-button").style.display = 'block';
}


// Add event listeners for "Previous" and "Next" buttons
document
  .querySelector(".carousel-prev-button")
  .addEventListener("click", showPreviousProduct);
document
  .querySelector(".carousel-next-button")
  .addEventListener("click", showNextProduct);
