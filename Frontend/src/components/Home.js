import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { errorHandler, successHandler } from '../utils';
import { ToastContainer } from 'react-toastify';
import './style.css'

const Home = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState('');


  useEffect(()=>{
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  },[])

  const handleLogout = (e)=>{
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    successHandler('User Successfully Logged Out')
    setTimeout(()=>{
      navigate('/login')
    },1000);
  }

  const fetchProducts = async ()=>{
    try{
      const url ='https://product-lqtm.onrender.com/api/v1/products';
      const headers = {
        headers: {
          'Authorization':localStorage.getItem('token')
        }
      }

      const reasponce = await fetch(url, headers);
      const data = await reasponce.json();

      setProducts(data);

      console.log(data);

    }catch(err){
      errorHandler(err);
    }
  }

  useEffect(()=>{
    fetchProducts();
  }, []);

  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const addProduct = () => {
    if (!productName || !price) return;
    if (products.some((p) => p.name.toLowerCase() === productName.toLowerCase())) {
      alert("Product already exists!");
      return;
    }
    setProducts([...products, { name: productName, price }]);
    setProductName("");
    setPrice("");
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="container">
      <ToastContainer />
  
      <h1>Product Form</h1>
  
      {/* Product Input Section */}
      <div className="add-product">
        <label htmlFor="product">Product Name</label>
        <input
          type="text"
          placeholder="Enter Product Name"
          name="product"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
  
        <label htmlFor="price">Price</label>
        <input
          type="number"
          placeholder="Enter Price"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
  
        <button onClick={addProduct}>Add Product</button>
      </div>
  
      {/* Search Bar */}
      <label htmlFor="s">Search Product</label>
      <input
        className="search_bar"
        type="text"
        placeholder="Search product..."
        name="s"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
  
      {/* Product List */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div key={index} className="product-item">
              <span>{product.name}</span> - <span>${product.price}</span>
            </div>
          ))
        ) : (
          <p>No Products Found</p>
        )}
      </div>
  
      {/* Logout Button */}
      <button className='btn' onClick={handleLogout}>User Logout</button>
    </div>
  );
}

export default Home
