const container = document.querySelector(".container");

let skip = 0;
let isFetching = false;
const globalProducts = [];

async function getProducts() {
  console.log("calling the service");
  const ENDPOINT = `https://dummyjson.com/products?limit=10&skip=${skip}`;
  isFetching = true;
  try {
    const products = await fetch(ENDPOINT);
    const productsJson = await products.json();
    globalProducts.push(...productsJson.products);
    generateUI(globalProducts);
  } catch (err) {
    console.log(err);
  } finally {
    isFetching = false;
  }
}

document.addEventListener("DOMContentLoaded", getProducts());

function generateUI(products) {
  container.innerHTML = products.map(
    (product) => ` <div class="product-container">
  <img
    src="${product.thumbnail}"
    alt="product"
    class="product-img"
  />
  <div class="product-content">
    <h3>${product.brand}</h3>
    <p>${product.description}</p>
  </div>
</div>`
  );
}

document.addEventListener("scroll", async function () {
  if (isFetching) {
    return;
  }
  const { clientHeight, scrollHeight, scrollTop } = document.documentElement;

  if (clientHeight + scrollTop + 200 >= scrollHeight) {
    skip = skip + 10;
    getProducts();
  }
});
