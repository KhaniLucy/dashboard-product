import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import type { Product } from "../types/product"
import { useFetch } from "../hooks/useFetch"

export function ProductDetail() {
const { id } = useParams()
const navigate = useNavigate()

const { data: product, isLoading, error, retry } = useFetch<Product>(
id ? `https://dummyjson.com/products/${id}` : ""
)

// Edit state
const [isEditing, setIsEditing] = useState(false)
const [editTitle, setEditTitle] = useState("")
const [editPrice, setEditPrice] = useState("")
const [updateSuccess, setUpdateSuccess] = useState(false)
const [updateError, setUpdateError] = useState<string | null>(null)
const [titleError, setTitleError] = useState<string | null>(null)
const [priceError, setPriceError] = useState<string | null>(null)

// Sync edit fields when product loads
useEffect(() => {
if (product) {
setEditTitle(product.title)
setEditPrice(String(product.price))
}
}, [product])

async function handleDelete() {
if (!product) return
if (!window.confirm(`Delete "${product.title}"?`)) return

try {
const response = await fetch(
`https://dummyjson.com/products/${product.id}`,
{ method: "DELETE" }
)
if (!response.ok) throw new Error()
navigate("/products")
} catch {
setUpdateError("Failed to delete product.")
}
}

function validateForm(): boolean {
let valid = true
if (!editTitle.trim()) {
setTitleError("Title is required.")
valid = false
} else {
setTitleError(null)
}
const parsedPrice = parseFloat(editPrice)
if (!editPrice.trim() || isNaN(parsedPrice) || parsedPrice <= 0) {
setPriceError("Price must be a number greater than 0.")
valid = false
} else {
setPriceError(null)
}
return valid
}

async function handleUpdate() {
if (!product) return
if (!validateForm()) return

try {
const response = await fetch(
`https://dummyjson.com/products/${product.id}`,
{
method: "PATCH",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
title: editTitle,
price: parseFloat(editPrice),
}),
}
)
if (!response.ok) throw new Error()
setIsEditing(false)
setUpdateSuccess(true)
setTimeout(() => setUpdateSuccess(false), 3000)
} catch {
setUpdateError("Failed to update product.")
}
}

if (isLoading) return <p>Loading...</p>
if (error) return (
<div>
<p style={{ color: "red" }}>{error}</p>
<button onClick={retry}>Retry</button>
</div>
)
if (!product) return null

return (
<div style={{ padding: 16 }}>
<button onClick={() => navigate(-1)}>← Back</button>

<img
src={product.thumbnail}
alt={product.title}
style={{ width: 200, marginTop: 16, display: "block" }}
/>

{updateSuccess && (
<p style={{ color: "green" }}>Product updated successfully!</p>
)}
{updateError && (
<p style={{ color: "red" }}>{updateError}</p>
)}

{isEditing ? (
<div style={{ marginTop: 16 }}>
<div>
<input
value={editTitle}
onChange={(e) => setEditTitle(e.target.value)}
placeholder="Title"
style={{ padding: 8, display: "block", marginBottom: 4 }}
/>
{titleError && <p style={{ color: "red" }}>{titleError}</p>}
</div>
<div>
<input
value={editPrice}
onChange={(e) => setEditPrice(e.target.value)}
placeholder="Price"
style={{ padding: 8, display: "block", marginBottom: 4 }}
/>
{priceError && <p style={{ color: "red" }}>{priceError}</p>}
</div>
<button
onClick={handleUpdate}
disabled={!editTitle.trim() || !editPrice.trim()}
style={{ marginRight: 8 }}
>
Save
</button>
<button onClick={() => setIsEditing(false)}>Cancel</button>
</div>
) : (
<div style={{ marginTop: 16 }}>
<h2>{product.title}</h2>
<p>{product.description}</p>
<p>R{product.price}</p>
<p>Category: {product.category}</p>
<p>Rating: {product.rating}</p>
<p>Stock: {product.stock}</p>
<button onClick={() => setIsEditing(true)} style={{ marginRight: 8 }}>
Edit
</button>
<button onClick={handleDelete} style={{ color: "red" }}>
Delete
</button>
</div>
)}
</div>
)
}
