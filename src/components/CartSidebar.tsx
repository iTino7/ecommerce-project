import { Trash2 } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { useCart } from "../context/CartContext";

function CartSidebar() {
  const { items, removeItem, total, isOpen, closeCart } = useCart();

  return (
    <Drawer direction="right" open={isOpen} onOpenChange={open => !open && closeCart()}>
      <DrawerContent className="flex flex-col">
        <DrawerHeader className="flex flex-row items-center justify-between border-b border-border/40 pb-4">
          <DrawerTitle>Carrello</DrawerTitle>
          <DrawerClose asChild>
            <button className="search-btn" onClick={closeCart}>✕</button>
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-20 opacity-50">
              <span className="text-4xl">🛒</span>
              <p className="font-medium m-0">Carrello vuoto</p>
              <p className="text-sm m-0">Aggiungi qualche prodotto</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl border border-border/30">
                  <div className="w-13 h-13 rounded-lg bg-muted shrink-0" style={{ width: 52, height: 52 }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm m-0 truncate">{item.name}</p>
                    <p className="text-xs opacity-50 m-0">Qtà: {item.quantity}</p>
                  </div>
                  <span className="font-semibold text-sm">€ {(item.price * item.quantity).toFixed(2)}</span>
                  <button
                    className="search-btn opacity-40 hover:opacity-80"
                    style={{ padding: "0.3rem" }}
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <DrawerFooter className="border-t border-border/40">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Totale</span>
              <span className="font-bold text-lg">€ {total.toFixed(2)}</span>
            </div>
            <button className="w-full py-3 rounded-xl bg-[#646cff] text-white font-semibold text-sm hover:opacity-85 transition-opacity cursor-pointer border-none">
              Procedi all'acquisto
            </button>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}

export default CartSidebar;
