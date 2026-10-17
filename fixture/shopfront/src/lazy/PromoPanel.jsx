import { useReady } from '../ui.jsx';

// Lazily loaded promotion panel.
export default function PromoPanel() {
  useReady();
  function handleClaim() {
    // A2: the tracking helper was deleted, but this call was left behind.
    trackPromoClick('spring-sale');
  }
  return (
    <section>
      <h2>Spring sale</h2>
      <button id="go" type="button" onClick={handleClaim}>
        Claim offer
      </button>
    </section>
  );
}
