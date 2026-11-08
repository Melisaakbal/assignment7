import { create } from 'zustand';

const getInitialItems = () => {
  try {
    const saved = localStorage.getItem('cart-items');
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    console.error('Failed to parse cart items from localStorage:', err);
    return [];
  }
};

export const useCartStore = create((set) => ({
  items: getInitialItems(),

  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            thumbnail: product.thumbnail,
            quantity: 1,
          },
        ],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  setQuantity: (id, quantity) =>
    set((state) => {
      if (quantity < 1) {
        return { items: state.items.filter((item) => item.id !== id) };
      }
      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }),

  clear: () => set({ items: [] }),
}));

// React bileşenleri dışından çalışan localStorage kaydetme aboneliği
useCartStore.subscribe((state) => {
  try {
    localStorage.setItem('cart-items', JSON.stringify(state.items));
  } catch (err) {
    console.error('Failed to save cart items to localStorage:', err);
  }
});
