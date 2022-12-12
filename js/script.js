//Declarando la clase product
class Product {
  constructor(id, name, price, stock, picture) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.picture = picture;
  }
  TransformToPesos() {
    this.price = this.price * 290;
  }
  Sold() {
    this.stock = this.stock - 1;
  }
}

//Declarando los productos

const products = [];

let addToCartBtn = 0;

let shoppingCart = [];

function creatingProductsSection() {
  fetch("stock.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => {
        products.push(new Product(product));

        const shopContent = document.querySelector("#shopContent");

        let createProduct = document.createElement("div");
        createProduct.className = "products";
        createProduct.innerHTML = `
    <img src="${product.picture}" class="products-img" alt="${product.name}">
    <h5 class="products-title">${product.name}</h5>
    <p class="products-price">${product.price} usd</p>
    `;

        shopContent.append(createProduct);

        addToCartBtn = document.createElement("buttom");
        addToCartBtn.className = "btn";
        addToCartBtn.id = product.id;
        addToCartBtn.innerText = "Comprar";

        createProduct.append(addToCartBtn);

        function addToCart() {
          addToCartBtn.addEventListener("click", () => {
              if (shoppingCart.includes(product)) {
                product.quantity++;
              } else {
                product.quantity = 1;
                shoppingCart.push(product);
              }

              console.log(shoppingCart);

              //Agruegando lo seleccionado en el carrito al LocalStorage
              let inJSON = JSON.stringify(shoppingCart);
              localStorage.setItem("shopping-cart", inJSON);   
          });
        }
        addToCart();

      });
    });
}

creatingProductsSection();

let cartBtn = document.querySelector(".cartBtn");
let deleteBtn = 0
const localStorageProduct = JSON.parse(localStorage.getItem("shopping-cart"));

function createCart(){
  cartBtn.addEventListener("click", () => {
    let cartContent = document.createElement("div");
    cartContent.className = "cartContent";
    cartContent.innerHTML = `
    <div class="cart-header">
        <h4 class="cart-title">Carrito</h4> 
        <buttom class="closeBtn"><i class="fa-solid fa-xmark"></i></buttom>
    </div>
    `;

    cartBtn.append(cartContent);

    if (localStorageProduct) {
      localStorageProduct.forEach((product) => {
        let cartProducts = document.createElement("div");
        cartProducts.className = "cartProducts";
        cartProducts.innerHTML = `
        <p class="cart-quantity">${product.quantity}</p>
        <img src="${product.picture}" class="cart-img" alt="${product.name}">
        <h5 class="cart-product">${product.name}</h5>
        <p class="cart-price">${product.price * product.quantity} usd</p>
        `;

        cartContent.append(cartProducts);

        deleteBtn = document.createElement("buttom");
        deleteBtn.classList = "delete-btn";
        deleteBtn.innerHTML = `
        <i class="fa-solid fa-trash-can"></i>
        `;

        cartProducts.append(deleteBtn);

        function removeCartProduct() {
          deleteBtn.addEventListener("click", () => {
            
              if (product.quantity > 1) {
                product.quantity = product.quantity - 1;
              } else {
                localStorage.removeItem("shopping-cart");
              }

              console.log(localStorageProduct);
            
          });
        }
       removeCartProduct();
        
      });

      let buyCart = document.createElement("div");
      buyCart.className = "make-a-purchase";
      buyCart.innerHTML = `
        <p>Total : </p>
        <buttom class="btn buy-btn">Comprar</buttom>
        `;

      cartContent.append(buyCart);

      function makeAPurchase() {
        let finalizePurchase = document.querySelector(".buy-btn");
        finalizePurchase.addEventListener("click", () => {
          const futureEvent = (res) => {
            return new Promise((resolve, reject) => {
              if (res === true) {
                resolve("Promesa cumplida");
              } else {
                reject("Promesa rechazada");
              }
            });
          };

          futureEvent(true)
            .then((response) => {
              console.log(response);
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Su compra se realizo correctamente",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log(error);
              Swal.fire({
                position: "center",
                icon: "error",
                title: "No hay objetos en el carrito",
                showConfirmButton: false,
                timer: 1500,
              });
            });
        });
      }
      makeAPurchase();
    } else {
      let cartProducts = document.createElement("div");
      cartProducts.className = "cartProducts";
      cartProducts.innerHTML = `
      <p>El carrito esta vacio</p>`;

      cartContent.append(cartProducts);
    }
  });
}

createCart();




