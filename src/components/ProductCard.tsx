import { motion } from "framer-motion";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  material: string;
  index: number;
}

const ProductCard = ({ name, price, image, material, index }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-secondary mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-500" />
        
        {/* Quick view overlay */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <a
            href="https://wa.me/51999999999?text=Hola!%20Me%20interesa%20el%20producto%20"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3 bg-foreground/90 text-center font-body text-xs tracking-[0.2em] uppercase text-cream"
          >
            Consultar
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="text-center space-y-1">
        <h3 className="font-display text-lg font-medium text-foreground tracking-wide">
          {name}
        </h3>
        <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          {material}
        </p>
        <p className="font-display text-xl text-accent font-semibold">
          {price}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
