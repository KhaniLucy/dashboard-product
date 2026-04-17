import { Routes, Route } from "react-router-dom"
import ProductList from "./components/ProductList"
import { SearchResults } from "./pages/SearchResults"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/search" element={<SearchResults />} />
    </Routes>
  )
} 

