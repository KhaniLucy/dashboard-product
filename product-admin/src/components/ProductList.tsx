import { useFetch } from "../hooks/useFetch"
import type { ProductResponse } from "../types/product"

export default function ProductList() {
const { data, isLoading, error, retry } = useFetch<ProductResponse>(
"https://dummyjson.com/products?limit=10"
)

if (isLoading) return <p>Loading...</p>
if (error) return (
<div>
<p style={{ color: "red" }}>{error}</p>
<button onClick={retry}>Retry</button>
</div>
)
if (!data || data.products.length === 0) return <p>No products found.</p>

return (
<div>
{data.products.map((product) => (
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