export interface Product {
    id: number;
    title: String;
    category: String;
    image: String;
    price: number;
    quantity?: number;
    stock?: number;
}