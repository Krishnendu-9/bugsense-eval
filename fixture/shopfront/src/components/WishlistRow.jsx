import { formatPrice } from '../utils/formatPrice.js';

// One row of the wishlist.
export function WishlistRow({ item, onMove }) {
  function handleMoveToCart() {
    // A8b: items cached before the price migration store priceCents, not price.
    onMove(`${item.name} moved to cart at ${formatPrice(item.price)}`);
  }
  return (
    <li>
      {item.name}
      <button id="go" type="button" onClick={handleMoveToCart}>
        Move to cart
      </button>
    </li>
  );
}
