import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

import argollaZircon from "@/assets/product-argolla-zircon.jpg";
import squar from "@/assets/product-squar.jpg";
import argollaLabrada from "@/assets/product-argolla-labrada.jpg";
import elegancyRose from "@/assets/product-elegancy-rose.jpg";
import elegancyLove from "@/assets/product-elegancy-love.jpg";
import ojoTurco from "@/assets/product-ojo-turco.jpg";
import puntoChic from "@/assets/product-punto-chic.jpg";
import gotaRose from "@/assets/product-gota-rose.jpg";

const products = [
  { name: "Argolla Zircón", price: "S/. 20", image: argollaZircon, material: "Acero inoxidable · Doble baño de oro" },
  { name: "Aretes Squar", price: "S/. 20", image: squar, material: "Acero inoxidable · Doble baño de oro" },
  { name: "Argolla Labrada", price: "S/. 18", image: argollaLabrada, material: "Acero inoxidable · Doble baño de oro" },
  { name: "Elegancy Rose", price: "S/. 12", image: elegancyRose, material: "Acero inoxidable · Doble baño de oro" },
  { name: "Elegancy Love", price: "S/. 12", image: elegancyLove, material: "Acero inoxidable · Doble baño de oro" },
  { name: "Ojo Turco", price: "S/. 18", image: ojoTurco, material: "Acero inoxidable · Doble baño de oro" },
  { name: "Punto Chic", price: "S/. 10", image: puntoChic, material: "Acero inoxidable · Doble baño de oro" },
  { name: "Gota Rose", price: "S/. 18", image: gotaRose, material: "Acero inoxidable · Doble baño de oro" },
];

const CatalogSection = () => {
  return (
    <section id="catalogo" className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
            Colección
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
            Aretes
          </h2>
          <div className="w-16 h-px bg-gold mx-auto" />
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.name} {...product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CatalogSection;
