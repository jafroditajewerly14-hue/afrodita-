import { motion } from "framer-motion";

const socials = [
  { name: "WhatsApp", href: "https://wa.me/51999999999", icon: "💬" },
  { name: "Instagram", href: "https://instagram.com/afrodita.jewerly", icon: "✦" },
  { name: "TikTok", href: "https://tiktok.com/@afrodita.jewerly", icon: "♪" },
  { name: "Facebook", href: "#", icon: "◈" },
];

const ContactSection = () => {
  return (
    <section className="py-24 px-6 bg-secondary">
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-3">
            Contáctanos
          </p>
          <h2 className="font-display text-4xl font-light text-foreground mb-6">
            Haz tu Pedido
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-8" />
          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-10">
            Somos una tienda de joyas en acero inoxidable con doble baño de oro.
            Encuentra las piezas más trendy para ti.
          </p>

          {/* WhatsApp CTA */}
          <a
            href="https://wa.me/51999999999?text=Hola!%20Me%20interesa%20su%20joyería"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-12 py-4 bg-accent text-accent-foreground font-body text-xs tracking-[0.3em] uppercase hover:bg-gold-dark transition-colors duration-500 mb-12"
          >
            WhatsApp Ventas
          </a>

          {/* Social Links */}
          <div className="flex justify-center gap-8">
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                className="flex flex-col items-center gap-2 group"
              >
                <span className="text-xl text-muted-foreground group-hover:text-accent transition-colors duration-300">
                  {social.icon}
                </span>
                <span className="font-body text-[9px] tracking-[0.2em] uppercase text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {social.name}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
