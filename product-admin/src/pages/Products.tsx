import { Link } from "react-router-dom"
import ProductList from "../components/ProductList"
import ProductSearch from "../components/ProductSearch" // Ensure the file exists at this path or adjust the path accordingly

export function Products() {
return (
<div>
<h2>Products</h2>
<ProductSearch />
<Link to="/products/add">
<button style={{ margin: "12px 0" }}>+ Add Product</button>
</Link>
<ProductList />
</div>
)
}