import { Link } from "react-router-dom";

const FooterSection = () => {
  return (
    <footer className="py-12 px-6 bg-foreground">
      <div className="max-w-6xl mx-auto text-center space-y-6">
        <div>
          <p className="font-display text-lg text-cream/60 mb-1">Afrodita</p>
          <p className="font-body text-[9px] tracking-[0.3em] uppercase text-cream/30">
            Joyería Premium · Ica · Lima · Pisco
          </p>
        </div>
        <div className="pt-6 border-t border-cream/5">
          <Link 
            to="/admin" 
            className="font-body text-[8px] tracking-[0.2em] uppercase text-cream/10 hover:text-cream/40 transition-colors"
          >
            Acceso Propietaria
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
