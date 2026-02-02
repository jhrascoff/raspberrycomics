import { createContext, useContext, useState, useEffect } from 'react';
import Client from 'shopify-buy';

const ShopifyContext = createContext();

const client = Client.buildClient({
  domain: import.meta.env.VITE_SHOPIFY_DOMAIN,
  storefrontAccessToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN,
});

export function ShopifyProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [checkout, setCheckout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const [allProducts, newCheckout] = await Promise.all([
          client.product.fetchAll(),
          client.checkout.create(),
        ]);
        setProducts(allProducts);
        setCheckout(newCheckout);
      } catch (err) {
        console.error('Shopify init error:', err);
      }
      setLoading(false);
    }
    init();
  }, []);

  async function addToShopifyCart(variantId, quantity = 1) {
    if (!checkout) return;
    const lineItems = [{ variantId, quantity }];
    const updated = await client.checkout.addLineItems(checkout.id, lineItems);
    setCheckout(updated);
  }

  async function removeFromShopifyCart(lineItemId) {
    if (!checkout) return;
    const updated = await client.checkout.removeLineItems(checkout.id, [lineItemId]);
    setCheckout(updated);
  }

  async function updateShopifyQuantity(lineItemId, quantity) {
    if (!checkout) return;
    const lineItems = [{ id: lineItemId, quantity }];
    const updated = await client.checkout.updateLineItems(checkout.id, lineItems);
    setCheckout(updated);
  }

  function openCheckout() {
    if (checkout?.webUrl) {
      window.open(checkout.webUrl, '_blank');
    }
  }

  const cartCount = checkout
    ? checkout.lineItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const cartTotal = checkout
    ? parseFloat(checkout.subtotalPrice?.amount || checkout.totalPrice?.amount || 0)
    : 0;

  return (
    <ShopifyContext.Provider value={{
      client,
      products,
      checkout,
      loading,
      cartCount,
      cartTotal,
      addToShopifyCart,
      removeFromShopifyCart,
      updateShopifyQuantity,
      openCheckout,
    }}>
      {children}
    </ShopifyContext.Provider>
  );
}

export function useShopify() {
  return useContext(ShopifyContext);
}
