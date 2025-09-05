// W produkcji API calls będą na tej samej domenie
const addToCart = async (productId: number) => {
  const response = await fetch('/wp-json/wc/store/cart/add-item', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: productId,
      quantity: 1,
    }),
  });
  
  if (response.ok) {
    // Po dodaniu do koszyka
    window.location.href = '/koszyk'; // Next.js
  }
};

const goToCheckout = () => {
  // Przejście do WordPress checkout na tej samej domenie
  window.location.href = '/checkout'; // WordPress
};