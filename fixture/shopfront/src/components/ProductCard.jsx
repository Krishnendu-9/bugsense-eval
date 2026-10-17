import { formatPrice } from '../utils/formatPrice.js';

// Catalogue card, also used for draft products in the merchant preview.
export function ProductCard({ product, onQuickView }) {
  function handleQuickView() {
    // A8a: draft products have no price yet.
    onQuickView(`${product.name}: ${formatPrice(product.price)}`);
  }
  return (
    <article>
      <h3>{product.name}</h3>
      <button id="go" type="button" onClick={handleQuickView}>
        Quick view
      </button>
    </article>
  );
}
