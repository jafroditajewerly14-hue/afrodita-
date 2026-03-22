import { useState } from "react";
import { products, saveProducts } from "../data/products";
import { Product, Category } from "../types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Edit, Trash2, Plus, ArrowLeft, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Admin = () => {
  const [productList, setProductList] = useState<Product[]>(products);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    price: 0,
    material: "",
    category: "aretes",
    description: "",
    image: ""
  });

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: "",
        price: 0,
        material: "",
        category: "aretes",
        description: "",
        image: ""
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    let newList: Product[];
    if (editingProduct) {
      newList = productList.map(p => p.id === editingProduct.id ? { ...p, ...formData } as Product : p);
    } else {
      const newProduct: Product = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
      } as Product;
      newList = [...productList, newProduct];
    }
    setProductList(newList);
    saveProducts(newList);
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      const newList = productList.filter(p => p.id !== id);
      setProductList(newList);
      saveProducts(newList);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-white rounded-full transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="font-display text-3xl font-light">Panel de Administración</h1>
          </div>
          <Button onClick={() => handleOpenModal()} className="bg-accent hover:bg-accent/90 text-white rounded-none">
            <Plus size={16} className="mr-2" /> Nuevo Producto
          </Button>
        </div>

        <div className="bg-white shadow-sm overflow-hidden rounded-sm border border-foreground/5">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/30">
                <TableHead className="w-[80px]">Imagen</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Material</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productList.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="w-12 h-12 bg-secondary rounded-sm overflow-hidden">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="capitalize">{product.category}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{product.material}</TableCell>
                  <TableCell>S/. {product.price}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenModal(product)}>
                        <Edit size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDelete(product.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Edit/Add Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-background">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Editar Producto" : "Agregar Nuevo Producto"}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold">Nombre</label>
                <Input 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  className="rounded-none border-foreground/10"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold">Precio (S/.)</label>
                <Input 
                  type="number" 
                  value={formData.price} 
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })} 
                  className="rounded-none border-foreground/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold">Categoría</label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value as Category })}
                >
                  <SelectTrigger className="rounded-none border-foreground/10">
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent className="bg-background">
                    <SelectItem value="aretes">Aretes</SelectItem>
                    <SelectItem value="collares">Collares</SelectItem>
                    <SelectItem value="anillos">Anillos</SelectItem>
                    <SelectItem value="pulseras">Pulseras</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest font-semibold">Material</label>
                <Input 
                  value={formData.material} 
                  onChange={(e) => setFormData({ ...formData, material: e.target.value })} 
                  className="rounded-none border-foreground/10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-semibold">Imagen</label>
              <div className="flex gap-4 items-center">
                <div className="w-24 h-24 bg-secondary rounded-sm overflow-hidden flex items-center justify-center border border-dashed border-foreground/20">
                  {formData.image ? (
                    <img src={formData.image} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon className="text-muted-foreground opacity-30" />
                  )}
                </div>
                <div className="flex-1">
                  <Input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageUpload}
                    className="rounded-none border-foreground/10 text-xs"
                  />
                  <p className="text-[10px] text-muted-foreground mt-2">Sube una foto clara del producto.</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-semibold">Descripción</label>
              <Textarea 
                value={formData.description} 
                onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                className="rounded-none border-foreground/10 min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)} className="rounded-none border-foreground/10">
              Cancelar
            </Button>
            <Button onClick={handleSave} className="bg-accent hover:bg-accent/90 text-white rounded-none">
              {editingProduct ? "Guardar Cambios" : "Agregar Producto"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
