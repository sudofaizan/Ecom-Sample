const productsUrl = 'converter/products.json';
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const cartCountElement = document.getElementById('cart-count');
const cartCountAnimation = document.getElementById('cart-count-animation');

let allProducts = [];
let cart = [];

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
            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
        `;
        productGrid.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add product to cart
function addToCart(event) {
    const productId = event.target.getAttribute('data-id');
    const product = allProducts.find(p => p.id == productId);

    if (product) {
        cart.push(product);
        updateCartCount();
        triggerCartAnimation(); // Trigger the animation
    }
}

// Update the cart count displayed in the icon
function updateCartCount() {
    cartCountElement.textContent = cart.length;
}

// Trigger the cart count animation
function triggerCartAnimation() {
    cartCountAnimation.classList.add('cart-animate');

    // Reset the animation after it completes
    setTimeout(() => {
        cartCountAnimation.classList.remove('cart-animate');
    }, 800);
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