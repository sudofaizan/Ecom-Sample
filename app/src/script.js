const productsUrl = 'converter/products.json';
const productGrid = document.getElementById('product-grid');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const cartCountElement = document.getElementById('cart-count');
const cartPanel = document.getElementById('cart-panel');
const cartItemsList = document.getElementById('cart-items');

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
        displayCartItems(); // Display the updated cart items
    }
}

// Update the cart count displayed in the icon
function updateCartCount() {
    cartCountElement.textContent = cart.length;
}
function displayCartItems() {
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cartItemsList.innerHTML = cart.map((item, index) => `
            <li>
                <img src="${item.image}" alt="${item.name}">
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="remove-from-cart-btn" data-index="${index}">Remove</button>
            </li>
        `).join('');

        // Add event listeners for removing items
        document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
            button.addEventListener('click', removeFromCart);
        });
    }
}
function removeFromCart(event) {
    const itemIndex = event.target.getAttribute('data-index');
    cart.splice(itemIndex, 1); // Remove the item from the cart array
    updateCartCount(); // Update the cart count
    displayCartItems(); // Refresh the cart display
}
document.getElementById('cart-icon-container').addEventListener('click', () => {
    cartPanel.classList.toggle('open'); // Slide the panel in or out
});

// Event listener to close the cart panel
document.getElementById('close-cart').addEventListener('click', () => {
    cartPanel.classList.remove('open');
});
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