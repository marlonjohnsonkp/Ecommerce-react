import React, { useState } from 'react';

// 1. Mock Products Data - Simple list of items matching the images
const PRODUCTS = [
  {
    id: 1,
    name: "AuraSound ANC Headphones",
    category: "Audio",
    price: 299.99,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRcyluVo0DeLei4QH5hzr6SP1wY6UV8AWjmxpdxCL0l44v8g1Sl5wwUMW8UndnWlfnZmm9hBQf5XS1T8V0mhP2YWy3siscxw5M99KPXppRtUiSXHsvA26dRv6yz_tb_P9XXb5frHjo&usqp=CAc"
  },
  {
    id: 2,
    name: "KeyForge Pro Keyboard",
    category: "Accessories",
    price: 189.99,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRTaSx29UwolN9ZW1YsaYRYY1V3fvqX3bYjjCaL7J8zDn1eipb-GJgpOi8_Gx1nZ6zJb6lGk9b3R4Uwpd66Tl2BBqfABI7I50yqvhsIrzdY4YFu3B3NhNDF"
  },
  {
    id: 3,
    name: "NovaFit Smartwatch",
    category: "Wearables",
    price: 249.99,
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSdMGzzrHwSNPxU6zDLBWYvGnvlBtOhELhD6HUN5j0xryDpEvTshMIud7PUh_zYgXY0jKKatYl9iMutHtWcKZfV9HIcNdb7YXspLj8bJu0caNOjZgwH8Voj"
  },
  {
    id: 4,
    name: "Aerotrack Pro Mouse",
    category: "Accessories",
    price: 99.99,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQw1_FqZ5ag1B5Ws15bIU_IPKHbvdTdfjgXGZAvQbGZQAL5mtPPhG5U2IvirVpC2-cMgb1yGEseVmTfzjweHrzcH98K7xiQSvtIdkNxBg1IougUr2tpwTPaUA"
  },
  {
    id: 5,
    name: "Lumina Monitor Light Bar",
    category: "Smart Home",
    price: 79.99,
    image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRnMzah9RDCCcaF6BgRjwKdjWUvikquNae7Oy3BcuodQ9ENntUqBG5Jx9x9eO67mE_ndU6v-oX_YTgulNXAPgQ91SDFYMrdgYcYpkVTcBs"
  },
  {
    id: 6,
    name: "VoltCharge 3-in-1 Charging Stand",
    category: "Accessories",
    price: 59.99,
    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR2WEoEslC2a1a9cWVxvyglQS8vGiVF_CiZHHs0JbrXOYY_Z04Y4xyUXaINDySKQmZfAKvIzjqH54JX9YBv-pZRuedJVtkNig"
  },
   {
    id: 7,
    name: "Quest Virtual Reality Headset",
    category: "Gaming",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 8,
    name: "SonicBoom Portable Speaker",
    category: "Audio",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&auto=format&fit=crop&q=60"
  },
  {
    id: 9,
    name: "Veloce 8-in-1 USB-C Hub",
    category: "Accessories",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=500&auto=format&fit=crop&q=60"
  }
];

function App() {
  // 2. React State Variables
  const [cart, setCart] = useState([]);          // Holds items added to the cart
  const [searchTerm, setSearchTerm] = useState(""); // Holds the search keyword
  const [sortBy, setSortBy] = useState("default"); // Holds the sorting option ("low-to-high" or "high-to-low")

  // 3. Add Item to Cart Function
  const addToCart = (product) => {
    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      // If it exists, increase its quantity by 1
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // If it doesn't exist, add it to the cart with a quantity of 1
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // 4. Remove Item from Cart Function
  const removeFromCart = (productId) => {
    // Filter out the item with the matching ID
    setCart(cart.filter(item => item.id !== productId));
  };
const buyNow = (product) => {
    alert(`🛒 Buy Now triggered!\n\nProduct: ${product.name}\nPrice: $${product.price.toFixed(2)}\n\nProceeding to secure checkout!`);
  };

  // 5. Search Filtering Logic
  const filteredProducts = PRODUCTS.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 6. Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "low-to-high") {
      return a.price - b.price; // Ascending order
    } else if (sortBy === "high-to-low") {
      return b.price - a.price; // Descending order
    }
    return 0; // Default order
  });

  // 7. Calculate Cart Total Price
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container">
      {/* Header Section */}
      <header>
        <h1>AuraMarket</h1>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
          🛒 Cart Items: {cart.reduce((total, item) => total + item.quantity, 0)}
        </div>
      </header>

      {/* Controls Section: Search Input and Sort Dropdown */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search products by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="default">Default Sort</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      {/* Main Layout: Products Grid and Sidebar Cart */}
      <div className="main-layout">
        
        {/* Left Side: Products Listing */}
        <div>
          <h2>Our Products</h2>
          {sortedProducts.length === 0 ? (
            <p>No products match your search.</p>
          ) : (
            <div className="products-grid">
              {sortedProducts.map((product) => (
                <div key={product.id} className="product-card">
                  <div>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-category">{product.category}</div>
                    <h3 className="product-name">{product.name}</h3>
                  </div>
                  <div>
                    <div className="product-price">${product.price.toFixed(2)}</div>
                    <button onClick={() => addToCart(product)} className="btn-add">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Cart Summary */}
        <div className="cart-section">
          <h2 className="cart-title">Your Cart</h2>
          {cart.length === 0 ? (
            <p className="empty-cart-text">Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div>
                    <strong>{item.name}</strong>
                    <br />
                    <span>${item.price.toFixed(2)} x {item.quantity}</span>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="btn-remove">
                    Remove
                  </button>
                </div>
              ))}
              
              <div className="cart-total">
  <span>Total:</span>
  <span>${cartTotal.toFixed(2)}</span>
</div>

<button
  className="cart-buy-btn"
  onClick={() =>
    alert(`🛒 Order Placed!\n\nTotal Amount: $${cartTotal.toFixed(2)}`)
  }
>
  Buy Now
</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;