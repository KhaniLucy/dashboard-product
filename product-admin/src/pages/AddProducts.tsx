import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function AddProduct() {
const navigate = useNavigate()

const [title, setTitle] = useState("")
const [price, setPrice] = useState("")
const [category, setCategory] = useState("")
const [isLoading, setIsLoading] = useState(false)
const [success, setSuccess] = useState(false)
const [error, setError] = useState<string | null>(null)

// Validation errors
const [titleError, setTitleError] = useState<string | null>(null)
const [priceError, setPriceError] = useState<string | null>(null)
const [categoryError, setCategoryError] = useState<string | null>(null)

function validateForm(): boolean {
let valid = true

if (!title.trim()) {
setTitleError("Title is required.")
valid = false
} else {
setTitleError(null)
}

const parsedPrice = parseFloat(price)
if (!price.trim() || isNaN(parsedPrice) || parsedPrice <= 0) {
setPriceError("Price must be a number greater than 0.")
valid = false
} else {
setPriceError(null)
}

if (!category.trim()) {
setCategoryError("Category is required.")
valid = false
} else {
setCategoryError(null)
}

return valid
}

async function handleSubmit() {
if (!validateForm()) return

setIsLoading(true)
setError(null)

try {
const response = await fetch("https://dummyjson.com/products/add", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
title,
price: parseFloat(price),
category,
}),
})
if (!response.ok) throw new Error()
setSuccess(true)
setTimeout(() => navigate("/products"), 2000)
} catch {
setError("Failed to add product. Please try again.")
} finally {
setIsLoading(false)
}
}

if (success) {
return <p style={{ color: "green" }}>Product added! Redirecting...</p>
}

return (
<div style={{ padding: 16 }}>
<button onClick={() => navigate(-1)}>← Back</button>
<h2>Add Product</h2>

{error && <p style={{ color: "red" }}>{error}</p>}

<div style={{ marginBottom: 12 }}>
<input
value={title}
onChange={(e) => setTitle(e.target.value)}
placeholder="Title"
style={{ padding: 8, display: "block", marginBottom: 4 }}
/>
{titleError && <p style={{ color: "red" }}>{titleError}</p>}
</div>

<div style={{ marginBottom: 12 }}>
<input
value={price}
onChange={(e) => setPrice(e.target.value)}
placeholder="Price"
style={{ padding: 8, display: "block", marginBottom: 4 }}
/>
{priceError && <p style={{ color: "red" }}>{priceError}</p>}
</div>

<div style={{ marginBottom: 12 }}>
<input
value={category}
onChange={(e) => setCategory(e.target.value)}
placeholder="Category"
style={{ padding: 8, display: "block", marginBottom: 4 }}
/>
{categoryError && <p style={{ color: "red" }}>{categoryError}</p>}
</div>

<button
onClick={handleSubmit}
disabled={isLoading || !title.trim() || !price.trim() || !category.trim()}
>
{isLoading ? "Adding..." : "Add Product"}
</button>
</div>
)
}
