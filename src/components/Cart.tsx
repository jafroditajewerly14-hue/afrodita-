import { useState } from "react";
import { useCart } from "../context/CartContext";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, X, Plus, Minus, Send } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartCount, cartTotal, clearCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = () => {
    const message = `Hola! Me gustaría realizar el siguiente pedido:\n\n` + 
      cart.map(item => `- ${item.name} (${item.quantity}x) - S/. ${item.price * item.quantity}`).join("\n") +
      `\n\nTotal: S/. ${cartTotal}\n\nGracias!`;
    
    const whatsappUrl = `https://wa.me/51999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    clearCart(true);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="fixed bottom-8 right-8 z-50 bg-accent text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
          <ShoppingBag size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-foreground text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-background flex flex-col p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="font-display text-2xl font-light">Tu Carrito</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="flex-1 p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
              <ShoppingBag size={48} className="text-muted-foreground opacity-20" />
              <p className="font-body text-sm text-muted-foreground tracking-wide">
                Tu carrito está vacío
              </p>
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                className="rounded-none font-body text-[10px] uppercase tracking-widest"
              >
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-20 bg-secondary rounded-sm overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-display text-sm font-medium">{item.name}</h4>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider mt-1">
                        S/. {item.price}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 border flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Minus size={10} />
                      </button>
                      <span className="font-body text-xs w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 border flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Plus size={10} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {cart.length > 0 && (
          <SheetFooter className="p-6 border-t bg-secondary/30 block">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-body text-xs uppercase tracking-widest text-muted-foreground">Total Estimado</span>
                <span className="font-display text-xl font-semibold">S/. {cartTotal}</span>
              </div>
              <Separator />
              <Button 
                onClick={handleCheckout}
                className="w-full bg-accent hover:bg-accent/90 text-white rounded-none h-12 tracking-widest uppercase text-xs"
              >
                <Send className="mr-2 h-4 w-4" />
                Realizar Pedido por WhatsApp
              </Button>
              <p className="text-[9px] text-center text-muted-foreground uppercase tracking-[0.1em]">
                Serás redirigido a WhatsApp para finalizar tu compra
              </p>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
