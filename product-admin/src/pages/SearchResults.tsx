import { useSearchParams } from "react-router-dom"
import { useFetch } from "../hooks/useFetch"
import type { ProductResponse } from "../types/product"

export function SearchResults() {
const [searchParams] = useSearchParams()
const query = searchParams.get("q") ?? ""

const { data, isLoading, error, retry } = useFetch<ProductResponse>(
query ? `https://dummyjson.com/products/search?q=${query}` : ""
)

return (
<div>
<h2>Showing results for: {query}</h2>

{isLoading && <p>Loading...</p>}
{error && (
<div>
<p style={{ color: "red" }}>{error}</p>
<button onClick={retry}>Retry</button>
</div>
)}
{!isLoading && !error && data?.products.length === 0 && (
<p>No results found for "{query}".</p>
)}

{data?.products.map((product) => (
<div
key={product.id}
style={{ border: "1px solid gray", marginBottom: 8, padding: 8 }}
>
<h3>{product.title}</h3>
<p>R{product.price}</p>
<p>{product.category}</p>
</div>
))}
</div>
)
}