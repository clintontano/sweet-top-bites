import { create } from "zustand";

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  branch: string;
  customerName: string;
  setCustomerName: (name: string) => void;
  setBranch: (branch: string) => void;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (name: string) => void;
  updateQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  branch: "",
  customerName: "",
  setCustomerName: (name) => set({ customerName: name }),
  setBranch: (branch) => set({ branch }),
  addItem: (item) => {
    const existing = get().items.find((i) => i.name === item.name);
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      set({ items: [...get().items, { ...item, quantity: 1 }] });
    }
  },
  removeItem: (name) => {
    set({ items: get().items.filter((i) => i.name !== name) });
  },
  updateQuantity: (name, quantity) => {
    if (quantity <= 0) {
      set({ items: get().items.filter((i) => i.name !== name) });
    } else {
      set({
        items: get().items.map((i) =>
          i.name === name ? { ...i, quantity } : i
        ),
      });
    }
  },
  clearCart: () => set({ items: [], customerName: "" }),
  total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
