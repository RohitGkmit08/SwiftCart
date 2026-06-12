import { useEffect,useState } from "react"
import ProductCard from "../components/ProductCard";
const Home = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async() => {
      try{
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.slice(0,4));
      }catch(err){
        console.log("error is : ", err)
      }finally{
        setLoading(false)
      }
    }

    fetchProducts()

  }, [])
  return (
    <div className="home-container">
      <div className="hero-banner">
        <h1>Welcome to SwiftCart</h1>
        <p>Discover at best products at best prices</p>
      </div>
      <h2>Featured Products</h2>
      {loading ? (
        <div>Loading.....</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
