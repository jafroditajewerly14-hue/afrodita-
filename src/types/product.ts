export type Category = "aretes" | "collares" | "anillos" | "pulseras";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  material: string;
  category: Category;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}
