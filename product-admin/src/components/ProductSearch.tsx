import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Product } from "../types/product"

export default function ProductSearch() {
const [query, setQuery] = useState("")
const [suggestions, setSuggestions] = useState<Product[]>([])
const [isLoading, setIsLoading] = useState(false)
const navigate = useNavigate()

async function fetchSuggestions(value: string) {
if (!value.trim()) {
setSuggestions([])
return
}

setIsLoading(true)
try {
const response = await fetch(
`https://dummyjson.com/products/search?q=${value}&limit=5`
)
const data = await response.json()
setSuggestions(data.products)
} catch (err) {
setSuggestions([])
} finally {
setIsLoading(false)
}
}

function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
const value = e.target.value
setQuery(value)
fetchSuggestions(value)
}

function handleSelectSuggestion(product: Product) {
setQuery("")
setSuggestions([])
navigate(`/products/${product.id}`)
}

function handleSearch() {
if (!query.trim()) return
setSuggestions([])
navigate(`/search?q=${query}`)
}

return (
<div style={{ position: "relative", display: "inline-block" }}>
<input
value={query}
onChange={handleChange}
placeholder="Search products..."
style={{ padding: 8, marginRight: 8 }}
/>
<button onClick={handleSearch} disabled={!query.trim()}>
Search
</button>

{/* Autocomplete dropdown */}
{suggestions.length > 0 && (
<div
style={{
position: "absolute",
top: "100%",
left: 0,
background: "white",
border: "1px solid gray",
width: "100%",
zIndex: 10,
}}
>
{isLoading && <p style={{ padding: 8 }}>Loading...</p>}
{suggestions.map((product) => (
<div
key={product.id}
onClick={() => handleSelectSuggestion(product)}
style={{ padding: 8, cursor: "pointer", borderBottom: "1px solid #eee" }}
>
{product.title}
</div>
))}
</div>
)}
</div>
)
}
