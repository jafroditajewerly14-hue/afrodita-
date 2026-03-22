import { Product } from "../types/product";

import argollaZircon from "../assets/product-argolla-zircon.jpg";
import squar from "../assets/product-squar.jpg";
import argollaLabrada from "../assets/product-argolla-labrada.jpg";
import elegancyRose from "../assets/product-elegancy-rose.jpg";
import elegancyLove from "../assets/product-elegancy-love.jpg";
import ojoTurco from "../assets/product-ojo-turco.jpg";
import puntoChic from "../assets/product-punto-chic.jpg";
import gotaRose from "../assets/product-gota-rose.jpg";
import anilloGold from "../assets/product-anillo-gold.png";
import collarGold from "../assets/product-collar-gold.png";
import pulseraGold from "../assets/product-pulsera-gold.png";

const INITIAL_PRODUCTS: Product[] = [
  { 
    id: "1", 
    name: "Argolla Zircón", 
    price: 20, 
    image: argollaZircon, 
    material: "Acero inoxidable · Doble baño de oro", 
    category: "aretes",
    description: "Elegante par de argollas con incrustaciones de zircón premium. Perfectas para un look nocturno sofisticado."
  },
  { 
    id: "2", 
    name: "Aretes Squar", 
    price: 20, 
    image: squar, 
    material: "Acero inoxidable · Doble baño de oro", 
    category: "aretes",
    description: "Aretes de diseño cuadrado minimalista. Un clásico moderno para el uso diario."
  },
  { 
    id: "3", 
    name: "Argolla Labrada", 
    price: 18, 
    image: argollaLabrada, 
    material: "Acero inoxidable · Doble baño de oro", 
    category: "aretes",
    description: "Argollas con textura labrada artesanal que captura la luz de forma única."
  },
  { 
    id: "4", 
    name: "Elegancy Rose", 
    price: 12, 
    image: elegancyRose, 
    material: "Acero inoxidable · Doble baño de oro", 
    category: "aretes",
    description: "Diseño floral delicado en tono oro rosa. Ideal para añadir un toque romántico a tu estilo."
  },
  { 
    id: "5", 
    name: "Elegancy Love", 
    price: 12, 
    image: elegancyLove, 
    material: "Acero inoxidable · Doble baño de oro", 
    category: "aretes",
    description: "Dijes en forma de corazón con acabado premium. Un regalo perfecto para alguien especial."
  },
  { 
    id: "6", 
    name: "Anillo Gold Shine", 
    price: 25, 
    image: anilloGold, 
    material: "Acero inoxidable · Oro 18k", 
    category: "anillos",
    description: "Anillo ajustable con piedra central de alto brillo. Resistente al agua y al desgaste."
  },
  { 
    id: "7", 
    name: "Collar Dije Corazón", 
    price: 35, 
    image: collarGold, 
    material: "Acero inoxidable · Baño en Oro 18k", 
    category: "collares",
    description: "Cadena fina con dije de corazón minimalista. Longitud ajustable."
  },
  { 
    id: "8", 
    name: "Pulsera Eslabones Premium", 
    price: 30, 
    image: pulseraGold, 
    material: "Acero inoxidable · Acabado Espejo", 
    category: "pulseras",
    description: "Pulsera de eslabones resistentes con cierre de seguridad. Un accesorio atemporal."
  }
];

export const getProducts = (): Product[] => {
  const saved = localStorage.getItem("afrodita_products");
  if (!saved) {
    localStorage.setItem("afrodita_products", JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  return JSON.parse(saved);
};

export const products = getProducts();

export const saveProducts = (newProducts: Product[]) => {
  localStorage.setItem("afrodita_products", JSON.stringify(newProducts));
  window.location.reload(); // Simple way to sync for now
};
