const shop = document.querySelector(".shop");
const cart = document.getElementById('product-in-cart');

let basket = JSON.parse(localStorage.getItem("ProductData")) || [];

let product = [{
  id: 'Sneakers',
  price: 125,
  productName: `<h1>Fall Limited Edition Sneakers</h1>`
}]



const generateShop = () => {
  return (shop.innerHTML = product.map((x) => {
    let { id, price, productName } = x;
    let search = basket.find((x) => x.id === id) || [];
    return `
  <div id="product-${id}" class="product-description">
    <h2>Sneaker Company</h2>

    ${productName}
  
    <p>
      These low-profile sneakers are your perfect casual wear companion. Featuring a 
    durable rubber outer sole, they’ll withstand everything the weather can offer.
    </p>
    <!-- Price -->
    <div class="price">
      <div class="price-row">
        <span class="final-price">$${price}.00</span>
        <span class="discount">50%</span><br>
      </div>
      <span class="old-price">$250.00</span>
    </div> 
  <!-- Add-To-Cart Container -->
    <div class="add-to-cart">
      <div class="incr-decr">
        <img onclick="decrement(${id})" src="images/icon-minus.svg" alt="">
        <div id="${id}" class="items">
          ${search.item === undefined ? 0 : search.item}
        </div>
        <img onclick="increment(${id})" src="images/icon-plus.svg" alt="">
      </div>

      <div onclick="calculation()" class="btn-add">
        <i class="bi bi-cart3"></i>
        <span>Add to cart</span>
      </div>
    </div> 

  </div>
    `
  }))
}

generateShop();



let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1
    })
  } else {
    search.item += 1;
  }
  update(selectedItem.id);
  localStorage.setItem('ProductData', JSON.stringify(basket));
}
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return
  else  {
    search.item -= 1;
  }

  update(selectedItem.id)
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem('ProductData', JSON.stringify(basket));
}
let update = (id) => {
  let seacrh = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = seacrh.item;
}



/* || ---------------- */

const generateCart = () => {
  if (basket.length !== 0) {
    return (cart.innerHTML = product.map((x) => {
      let {id, price, productName } = x;
      let seacrh = basket.find((x) => x.id === id) || [];
      return `
    <div class="wrap1">
      <img src="images/image-product-1-thumbnail.jpg" width="50" height="50" alt="">
      <div class="product-name">
        ${productName}
        <span>$${price}.00 x ${seacrh.item === undefined ? 0 : seacrh.item}
        </span> <span class="cart-sum">$375.00</span>
      </div>
      <i onclick="removeItem(${id})" class="bi bi-trash"></i>
    </div>

    <div class="wrap2">
      <div class="btn-checkout">
        <span>Chekout</span>
      </div>
    </div>
      `
    }))
  } else {
    cart.innerHTML = "<h3>Your cart is empty.</h3>";
  }
}

generateCart()


const removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateShop()
  calculation()
  localStorage.setItem('ProductData', JSON.stringify(basket));
}

const totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket.map((x) => {
      let { item, id } = x;
      let search = product.find((y) => y.id === id) || [];
      return item * search.price;
    }).reduce((x, y) => x + y, 0);
    document.querySelector('.cart-sum').innerHTML = `$${amount}.00`
  }
}

const calculation = () => {
  let cartIcon = document.getElementById('cartAmount');

  cartIcon.innerHTML = basket.map((x) => x.item);
  generateCart()
  totalAmount()
}

calculation();