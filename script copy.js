const productsUrl = 'https://raw.githubusercontent.com/sudofaizan/Ecom-Sample/main/products.json';
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');

let allProducts = [];

function getProducts() {
    fetch(productsUrl)
        .then(response => response.json())
        .then(products => {
            allProducts = products;
            displayProducts(products);
        })
        .catch(error => console.error('Error getting products:', error));
}

function displayProducts(products) {
    productGrid.innerHTML = ''; // Clear existing products
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');
        productCard.innerHTML = `
            <h4>Product ID:${product.id}</h4>
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
        `;
        productGrid.appendChild(productCard);
    });
}

function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = allProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm) || 
        product.id.toString().includes(searchTerm)  ||
        product.description.toString().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

searchInput.addEventListener('input', searchProducts);

getProducts();