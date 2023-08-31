const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");

fetch("https://kea-alt-del.dk/t7/api/products?category=" + category)
  .then((res) => res.json())
  .then(showProducts)
  .catch((error) => console.error("Error fetching products:", error));

function showProducts(products) {
  products.forEach(showProduct);
}

function showProduct(product) {
  const template = document.querySelector("#smallProductTemplate").content;

  const copy = template.cloneNode(true);

  copy.querySelector("h4.productDesc").textContent = product.productdisplayname;
  copy.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  copy.querySelector("p.pris").textContent = product.price + " DKK,-";

  if (product.discount) {
    const discountedPrice = product.price - (product.price / 100) * product.discount;
    copy.querySelector("p.rpris").textContent = discountedPrice.toFixed(0) + " DKK,-";
    copy.querySelector("p.rrabat").textContent = product.discount + "%";
  } else {
    const discountElement = copy.querySelector(".discount");
    if (discountElement) {
      discountElement.remove();
    }
  }

  if (product.soldout) {
    copy.querySelector("article").classList.add("soldout");
    const soldoutOverlay = document.createElement("div");
    soldoutOverlay.classList.add("soldout-overlay");
    soldoutOverlay.textContent = "Sold Out";
    copy.querySelector("article").appendChild(soldoutOverlay);
  }
  copy.querySelector(".read-more").setAttribute("href", `produkt.html?id=${product.id}`);

  document.querySelector(".parent").appendChild(copy);
}
