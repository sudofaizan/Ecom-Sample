// const productsUrl = 'https://raw.githubusercontent.com/sudofaizan/Ecom-Sample/main/products.json';
const productsUrl = 'converter/products.json';
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');

let allProducts = [];

// Fetch products from the JSON file
function getProducts() {
    fetch(productsUrl)
        .then(response => response.json())
        .then(products => {
            allProducts = products;
            displayProducts(products);
        })
        .catch(error => console.error('Error getting products:', error));
}

// Display products in the grid
function displayProducts(products) {
    productGrid.innerHTML = ''; // Clear existing products
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');
        productCard.innerHTML = `
            <h4>Product ID: ${product.id}</h4>
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">$${product.price.toFixed(2)}</p>
        `;
        productGrid.appendChild(productCard);
    });
}

// Sort products based on the selected option
function sortProducts(filteredProducts = allProducts) {
    const sortValue = sortSelect.value;
    let sortedProducts = [...filteredProducts];

    if (sortValue === 'low-to-high') {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'high-to-low') {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    displayProducts(sortedProducts);
}

// Filter and sort products based on search input and sorting option
function searchProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = allProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.id.toString().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    sortProducts(filteredProducts); // Apply sorting after filtering
}

// Event listeners
searchInput.addEventListener('input', searchProducts);
sortSelect.addEventListener('change', () => sortProducts(allProducts));

// Fetch and display products when the page loads
getProducts();