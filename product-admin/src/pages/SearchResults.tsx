import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Product, ProductResponse } from '../types/product'

export function SearchResults() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get("q")

    const [products, setProducts] = useState<Product[]>([])
    const [, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!query) return

        async function fetchResults() {
            try {
                setIsLoading(true)
                setError(null)
                const response = await fetch(`https://dummyjson.com/products/search?q=${query}`
                )
                const data: ProductResponse = await response.json()
                setProducts(data.products)
            } catch {
                setError("Something went wrong. Please try again.")
            } finally {
                setIsLoading(false)
            }
        }

        fetchResults()
    }, [query])

    if (setIsLoading) return <p>Loading...</p>
    if (error) return <p style={{ color: "red" }}>{error}</p>

    return (
        <div>
            <h2> Showing results for: {query}</h2>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                products.map((product) => ( 
                    <div
                        key={product.id}
                        style={{ border: "1px solid gray", marginBottom: 8, padding: 8}}>
                        <h3>{product.title}</h3>
                        <p>R{product.price}</p>
                        <p>{product.category}</p>
                    </div>
                ))
            )}
        </div>
)}