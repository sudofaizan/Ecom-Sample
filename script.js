const productsUrl = 'https://raw.githubusercontent.com/sudofaizan/Ecom-Sample/main/products.json';
const productGrid = document.getElementById('product-grid');

function getProducts() {
  fetch(productsUrl)
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');
        productCard.innerHTML = `
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <h4>${product.id}</h4>
          <p class="price">$${product.price.toFixed(2)}</p>
        `;
        productGrid.appendChild(productCard);
      });
    })
    .catch(error => console.error('Error getting products:', error));
}

getProducts();