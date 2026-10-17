import { useEffect, useState } from 'react';
import { Page, Go, useReady, markReady } from '../ui.jsx';
import { validateCheckout } from '../checkout/validateCheckout.js';
import { placeOrder } from '../checkout/placeOrder.js';
import { assertWithinLimit } from '../checkout/limits.js';
import { getTracker } from '../analytics/tracker.js';
import { computeTax } from '../checkout/tax.js';
import { validateCardInFrame } from '../payments/cardFrame.js';
import { recalculateSummary } from '../checkout/summary.js';
import { startCheckout } from '../checkout/startCheckout.js';
import { estimateTax } from '../checkout/kernelTax.js';
import { loadPricingKernel } from '../pricing/wasm.js';
import { normalizePhone } from '../checkout/phone.js';
import { reserveForCheckout } from '../checkout/reserveAtCheckout.js';

const MIXED_CART = {
  lines: [
    { sku: 'sku-1', currency: 'EUR' },
    { sku: 'sku-8', currency: 'GBP' },
  ],
};

export function CheckoutReviewPage() {
  useReady();
  return (
    <Page title="Review order">
      <Go onClick={() => validateCheckout(MIXED_CART)}>Continue to payment</Go>
    </Page>
  );
}

export function CheckoutPlaceOrderPage() {
  useReady();
  async function handlePlaceOrder() {
    const order = await placeOrder({ lines: MIXED_CART.lines, giftWrap: true });
    return order.id;
  }
  return (
    <Page title="Place order">
      <Go onClick={() => { handlePlaceOrder(); }}>Place order</Go>
    </Page>
  );
}

export function CheckoutPayPage() {
  useReady();
  return (
    <Page title="Payment">
      <Go onClick={() => assertWithinLimit(123450)}>Pay now</Go>
    </Page>
  );
}

export function CheckoutConfirmPage() {
  useReady();
  function handleConfirm() {
    const tracker = getTracker();
    tracker.trackPurchase({ orderId: 'o-5521', value: 42 });
  }
  return (
    <Page title="Confirm order">
      <Go onClick={handleConfirm}>Confirm purchase</Go>
    </Page>
  );
}

export function CheckoutTaxPage() {
  useReady();
  return (
    <Page title="Tax">
      <Go onClick={() => computeTax({ region: 'NL-NH', total: 80 })}>Calculate tax</Go>
    </Page>
  );
}

export function CheckoutCardPage() {
  const [frame, setFrame] = useState(null);
  return (
    <Page title="Card details">
      <iframe
        title="card"
        src="/frames/card.html"
        ref={setFrame}
        onLoad={() => markReady()}
      />
      <Go onClick={() => validateCardInFrame(frame, 4111111111111111)}>Pay with card</Go>
    </Page>
  );
}

export function CheckoutSummaryPage() {
  useReady();
  return (
    <Page title="Summary">
      <Go onClick={() => recalculateSummary({ id: 'draft-7' })}>Recalculate</Go>
    </Page>
  );
}

export function CheckoutStartPage() {
  useReady();
  return (
    <Page title="Checkout">
      <Go onClick={() => startCheckout()}>Start checkout</Go>
    </Page>
  );
}

export function CheckoutTaxEstimatePage() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    loadPricingKernel().then(() => setLoaded(true));
  }, []);
  useReady(loaded);
  return (
    <Page title="Tax estimate">
      <Go onClick={() => estimateTax({ totalCents: 1999 })}>Estimate tax</Go>
    </Page>
  );
}

export function CheckoutContactPage() {
  useReady();
  const [phone, setPhone] = useState('');
  const form = { email: 'guest@example.com' };
  return (
    <Page title="Contact details">
      <Go onClick={() => setPhone(normalizePhone(form.phone))}>Continue</Go> {phone}
    </Page>
  );
}

export function CheckoutReservePage() {
  useReady();
  const lines = [
    { sku: 'sku-1', inStock: true },
    { sku: 'sku-4', inStock: true },
  ];
  return (
    <Page title="Confirm">
      <Go onClick={() => { reserveForCheckout(lines); }}>Confirm order</Go>
    </Page>
  );
}
