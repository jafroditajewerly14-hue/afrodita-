import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "./ProductCard";
import { products } from "../data/products";
import { Category } from "../types/product";

const categories: { id: Category | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "aretes", label: "Aretes" },
  { id: "collares", label: "Collares" },
  { id: "anillos", label: "Anillos" },
  { id: "pulseras", label: "Pulseras" },
];

const CatalogSection = () => {
  const [activeCategory, setActiveCategory] = useState<Category | "todos">("todos");

  const filteredProducts = activeCategory === "todos" 
    ? products 
    : products.filter(p => p.category === activeCategory);

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
            Nuestra Selección
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
            Catálogo
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`font-body text-xs tracking-[0.2em] uppercase transition-all duration-300 pb-1 border-b ${
                  activeCategory === cat.id 
                    ? "text-accent border-accent" 
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-muted-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <ProductCard 
                  name={product.name}
                  price={`S/. ${product.price}`}
                  image={product.image}
                  material={product.material}
                  index={index}
                  description={product.description}
                  id={product.id}
                  category={product.category}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredProducts.length === 0 && (
          <p className="text-center text-muted-foreground py-20">No hay productos en esta categoría por el momento.</p>
        )}
      </div>
    </section>
  );
};

export default CatalogSection;
