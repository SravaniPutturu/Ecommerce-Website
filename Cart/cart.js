let tbody = document.getElementById("tbody");
let storage = JSON.parse(localStorage.getItem("All Items"));
let cartItems = [];
let totalPayment = 0;

const saveCartItemsToLocalStorage = (cartItems) => {
  localStorage.setItem("CartItems", JSON.stringify(cartItems));
};

const loadCartItemsFromLocalStorage = () => {
  const cartItemsJson = localStorage.getItem("CartItems");
  return cartItemsJson ? JSON.parse(cartItemsJson) : [];
};

let handleRemove = (id) => {
  cartItems = cartItems.filter((ele) => ele.id !== id);
  saveCartItemsToLocalStorage(cartItems);
  renderElements(cartItems);
  // Remove the item from localStorage as well
  removeFromCartLocalStorage(id);
};

const loadCartIdsFromLocalStorage = () => {
  const cartIdsJson = localStorage.getItem("Cart");
  return cartIdsJson ? JSON.parse(cartIdsJson) : [];
};

const removeFromCartLocalStorage = (id) => {
  let cartIds = loadCartIdsFromLocalStorage();
  cartIds = cartIds.filter((cartId) => cartId !== id);
  localStorage.setItem("Cart", JSON.stringify(cartIds));
};

let handleItemCount = (id, assignment,quantity) => {
  // Check if the assignment is -1 and the quantity is already 0, then remove the item
  if (quantity === 1 && assignment === -1) {
    handleRemove(id);
    renderTotal();
    return; 
  }
  cartItems = cartItems.map((ele) =>
    ele.id === id ? { ...ele, quantity: ele.quantity + assignment } : ele
  );

  totalPayment = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  saveCartItemsToLocalStorage(cartItems);
  renderElements(cartItems);
  renderTotal();
};

const renderElements = (cartItems) => {
  const uniqueItems = [];

  // Loop through cartItems and add unique items to uniqueItems array
  cartItems.forEach((item) => {
    // Check if the item already exists in uniqueItems based on its id
    const existingItem = uniqueItems.find(
      (uniqueItem) => uniqueItem.id === item.id
    );

    // If it doesn't exist, add it to uniqueItems
    if (!existingItem) {
      uniqueItems.push(item);
    }
  });

  let data = uniqueItems.map((item) => {
    let quantity = item.quantity;
    let subtotal = quantity * item.price;
    let title = item.title.split(" ").slice(0, 3).join(" ");
    return `
      <tr>
        <td><i class="far fa-times-circle" onclick='handleRemove(${
          item.id
        })'></i></td>
        <td><img src="${item.image}" alt="${item.title}" /></td>
        <td class='title'>${title}</td>
        <td>$${item.price}</td>
        <td><button class="minus" onclick="handleItemCount(${item.id},${-1},${quantity})">-</button>${quantity}<button class="plus" onclick="handleItemCount(${item.id},${1},${quantity})">+</button></td>
        <td>${subtotal}</td>
      </tr>
    `;
  });

  tbody.innerHTML = data.join("");
};

const handleCart = (e, id) => {
  e.stopPropagation();

  // Initialize cartIds properly
  let cartIds = [];

  try {
    // Parse "Cart" data from localStorage
    const cartData = localStorage.getItem("Cart");
    if (cartData) {
      cartIds = JSON.parse(cartData);
    }
  } catch (error) {
    // Handle the error if data is not valid JSON
    console.error("Error parsing Cart data:", error);
  }

  // id getting -1 means -1 not existed; it's just for loading purposes.
  if (id !== -1) {
    cartIds.push(id);
  }

  localStorage.setItem("Cart", JSON.stringify(cartIds));

  getProductById = (productId) => storage.find((item) => item.id === productId);
  cartItems = cartIds.map((id) => {
    const product = getProductById(id);
    product.quantity = cartIds.filter((cartId) => cartId === id).length; // Calculate quantity
    return product;
  });

  saveCartItemsToLocalStorage(cartItems);

  renderElements(cartItems);
};

const renderTotal = () => {
  // Create a new row for the total amount
  const totalRow = document.createElement("tr");

  // Create a cell for the total amount
  const totalCell = document.createElement("td");
  totalCell.innerHTML = `<h3>Total : </h3>`; // You can customize the label if needed
  totalCell.colSpan = 5;
  // Create another cell for the actual total amount
  const totalAmountCell = document.createElement("td");
  totalPayment = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  totalAmountCell.innerHTML = `<h3>${totalPayment.toFixed(2)}</h3>`;
  totalAmountCell.classList.add("total");

  // Append the cells to the total row
  totalRow.appendChild(totalCell);
  totalRow.appendChild(totalAmountCell);

  // Find the table body and append the total row to it
  const tableBody = document.getElementById("tbody");
  tableBody.appendChild(totalRow);
};

document.addEventListener("DOMContentLoaded", (e) => {
  cartItems = loadCartItemsFromLocalStorage();
  if(cartItems.length === 0){
      let cart = document.getElementById('cart')  
      
      cart.innerHTML = `<h4><u><a href="../shop.html">Click to start shopping</a></u></h4>`
  }
  renderElements(cartItems);
  renderTotal();
});
