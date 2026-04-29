import { Routes, Route } from "react-router-dom"
import { Products } from "./pages/Products"
import { SearchResults } from "./pages/SearchResults"
import { ProductDetail } from "./pages/ProductDetail"
import { AddProduct } from "./pages/AddProducts" // Verify that './pages/AddProduct' exists or create the file if missing

export default function App() {
return (
<Routes>
<Route path="/" element={<Products />} />
<Route path="/products" element={<Products />} />
<Route path="/products/add" element={<AddProduct />} />
<Route path="/products/:id" element={<ProductDetail />} />
<Route path="/search" element={<SearchResults />} />
</Routes>
)
}
