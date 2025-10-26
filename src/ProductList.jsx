// ProductList.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

const ProductList = () => {
  const plantsArray = [
    {
      name: 'Aloe Vera',
      image: '/images/aloe.jpg',
      description: 'A soothing succulent plant.',
      cost: '$10.00',
    },
    {
      name: 'Peace Lily',
      image: '/images/peace-lily.jpg',
      description: 'A flowering houseplant that purifies air.',
      cost: '$15.00',
    },
    {
      name: 'Snake Plant',
      image: '/images/snake-plant.jpg',
      description: 'A low-maintenance plant great for bedrooms.',
      cost: '$12.00',
    },
  ];

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const [addedToCart, setAddedToCart] = useState({});

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({
      ...prev,
      [plant.name]: true,
    }));
  };

  return (
    <div className="product-page">
      <h2 style={{ color: 'black' }}>Our Plant Collection</h2>
      <h3 style={{ color: 'green' }}>🛒 Items in Cart: {totalItems}</h3>

      <div className="product-grid">
        {plantsArray.map((plant) => (
          <div className="product-card" key={plant.name}>
            <img src={plant.image} alt={plant.name} className="product-image" />
            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
            <p>{plant.cost}</p>
            <button
              className="add-to-cart-btn"
              disabled={addedToCart[plant.name]}
              onClick={() => handleAddToCart(plant)}
              style={{
                backgroundColor: addedToCart[plant.name] ? 'gray' : 'green',
                cursor: addedToCart[plant.name] ? 'not-allowed' : 'pointer',
              }}
            >
              {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
