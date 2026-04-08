import { useState, useEffect } from "react"

type Product = {
  id: number
  title: string
  price: number
  category: string
}

type ProductResponse = {
  products: Product[]
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("https://dummyjson.com/products?limit=10")
      const data: ProductResponse = await response.json()
      setProducts(data.products)
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
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