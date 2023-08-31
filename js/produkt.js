const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

fetch("https://kea-alt-del.dk/t7/api/products/" + id)
  .then((response) => response.json())
  .then((data) => showProduct(data));

function showProduct(product) {
  console.log(product);
  document.querySelector("h3").textContent = product.productdisplayname;
  document.querySelector("h1").textContent = product.brandname;
  document.querySelector(".brand").textContent = product.brandname + " | " + product.articletype;
  document.querySelector(".brandbio").textContent = product.brandbio;
  document.querySelector(".pricetag").textContent = product.price + " DKK,-";

  if (product.discount) {
    const discountedPrice = product.price - (product.price / 100) * product.discount;
    document.querySelector("p.rpris").textContent = discountedPrice.toFixed(0) + " DKK,-";
  } else {
    const discountElement = document.querySelector(".discount");
    if (discountElement) {
      discountElement.remove();
    }
  }

  document.querySelector(".variantname").textContent = product.variantname;
  document.querySelector(".color").textContent = product.basecolour;
  document.querySelector(".inventorynumber").textContent = product.relid;
  document.querySelector("img").src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
}
