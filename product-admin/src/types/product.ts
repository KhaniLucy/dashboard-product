export type Product = {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    thumbnail: string;
    stock: number;
    rating: number;
}

export type ProductResponse = {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

