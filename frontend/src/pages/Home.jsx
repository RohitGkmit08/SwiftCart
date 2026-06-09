import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="Home">
      <h1>Welcome to SwiftCart</h1>
      <Link to="/shop">Start Shopping</Link>
    </div>
  )
}

export default Home
