import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { Category } from "../types/product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShoppingCart, MessageCircle } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: string;
  image: string;
  material: string;
  description: string;
  category: Category;
  index: number;
}

const ProductCard = ({ id, name, price, image, material, description, category, index }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const cleanPrice = parseFloat(price.replace("S/. ", ""));

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id,
      name,
      price: cleanPrice,
      image,
      material,
      description,
      category,
    });
  };

  const whatsappMessage = `Hola! Me interesa el producto: ${name} (${price})`;
  const whatsappUrl = `https://wa.me/51999999999?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: index * 0.1 }}
        className="group cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-secondary mb-4 rounded-sm">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-all duration-500" />
          
          {/* Quick view overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col">
            <button
              onClick={handleAddToCart}
              className="w-full py-3 bg-accent text-white text-center font-body text-[10px] tracking-[0.2em] uppercase hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart size={14} />
              Añadir al Carrito
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="text-center space-y-1">
          <h3 className="font-display text-lg font-medium text-foreground tracking-wide">
            {name}
          </h3>
          <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis">
            {material}
          </p>
          <p className="font-display text-xl text-accent font-semibold">
            {price}
          </p>
        </div>
      </motion.div>

      {/* Product Detail Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden bg-background border-none gap-0">
          <div className="flex flex-col md:flex-row h-full">
            {/* Image side */}
            <div className="w-full md:w-1/2 aspect-square">
              <img src={image} alt={name} className="w-full h-full object-cover" />
            </div>
            
            {/* Details side */}
            <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
              <DialogHeader className="text-left mb-6">
                <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-2">
                  {category}
                </p>
                <DialogTitle className="font-display text-3xl font-light text-foreground mb-2">
                  {name}
                </DialogTitle>
                <div className="w-12 h-px bg-gold mb-4" />
                <p className="font-display text-2xl text-accent font-medium">
                  {price}
                </p>
              </DialogHeader>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-body text-[11px] tracking-[0.1em] uppercase text-foreground mb-2 font-semibold">
                    Descripción
                  </h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {description}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <h4 className="font-body text-[11px] tracking-[0.1em] uppercase text-foreground mb-1 font-semibold">
                    Material
                  </h4>
                  <p className="font-body text-xs text-muted-foreground">
                    {material}
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  <Button 
                    onClick={handleAddToCart}
                    className="w-full bg-accent hover:bg-accent/90 text-white rounded-none h-12 tracking-widest uppercase text-xs"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Añadir al Carrito
                  </Button>
                  
                  <a 
                    href={whatsappUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full h-12 border border-foreground/10 hover:bg-secondary transition-colors tracking-widest uppercase text-[10px] text-foreground"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
