import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await fetch(`/api/products`, {
        method: "GET",
      });
      const data = await response.json();
      console.log(data);
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <h1>FROMAGERIA TESILLI</h1>
      </div>
      <div>
        {products.map((product) => (
          <div className="productsGallery" key={product.product_id}>
            <div>{product.product_name}</div>
            <div>{product.product_description}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
