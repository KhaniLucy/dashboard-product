# Product Admin Dashboard

A React + TypeScript admin dashboard for managing facial products using DummyJSON (https://dummyjson.com/docs).

## Features

- View a list of at least 10 products
- Search for products with an autocomplete dropdown
- View a single product in detail
- Add a new product on the dashboard
- Edit an existing product on the dashboard
- Delete a product on the dashboard
- Loading, error and retry states throught
- Client-side routing with React Router

## Tech Stack

- React
- TypeScript
- ReactRouter
- Vite
- DummyJSON API

## Project Structure

src/ 

components/

ProductList.tsx  #List of the first 10 products on mount

ProductSearch.tsx  #Search input with autocomplete dropdown

page/

Products.tsx  #Home/products page

ProductDetail.tsx #Single product with edit and delete

SearchResult.tsx #Search results page (/search?q=)

AddProduct.tsx #Add product form

hooks/

useFetch.ts #Reusable fetch hook with loading, error and retry

types/

product.ts #Product and ProductResponse types

## Getting Started

### Prerequisites
- [Node.js](https://node,js.org/)

