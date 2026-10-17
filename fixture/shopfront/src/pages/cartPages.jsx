import { useEffect, useRef, useState } from 'react';
import { Page, Go, useReady } from '../ui.jsx';
import { cartReducer, createStore } from '../store/cartReducer.js';
import { loadSavedCart } from '../cart/persist.js';
import { loadCart } from '../cart/loadCart.js';
import { shippingZone } from '../shipping/estimate.js';
import { setQuantity } from '../cart/quantity.js';
import { applyMemberDiscount } from '../cart/discount.js';
import { loadPricingKernel } from '../pricing/wasm.js';
import { loadPricingPlugin } from '../pricing/plugin.js';
import { reserveOnCartOpen } from '../cart/reserveFromCart.js';

export function CartCouponPage() {
  useReady();
  const [cart] = useState(() => ({ lines: [], total: 0 }));
  const [discount, setDiscount] = useState(0);
  function handleApplyCoupon() {
    // A1: an empty cart has no coupon object.
    const percent = cart.coupon.percent;
    setDiscount((cart.total * percent) / 100);
  }
  return (
    <Page title="Cart">
      <Go onClick={handleApplyCoupon}>Apply coupon</Go> <span>{discount}</span>
    </Page>
  );
}

export function CartEditPage() {
  useReady();
  const [store] = useState(() => createStore(cartReducer, { lines: { 'sku-1': 0 } }));
  return (
    <Page title="Edit cart">
      <Go onClick={() => store.dispatch({ type: 'remove', sku: 'sku-1' })}>Remove item</Go>
    </Page>
  );
}

export function CartRestorePage() {
  useReady();
  const [lines, setLines] = useState([]);
  return (
    <Page title="Welcome back">
      <Go onClick={() => setLines(loadSavedCart().lines)}>Restore my cart</Go> {lines.length}
    </Page>
  );
}

export function CartRefreshPage() {
  useReady();
  async function refreshCart() {
    const items = await loadCart();
    return items.length;
  }
  return (
    <Page title="Cart">
      <Go onClick={() => { refreshCart(); }}>Refresh cart</Go>
    </Page>
  );
}

export function CartShippingPage() {
  useReady();
  const [zone, setZone] = useState('');
  return (
    <Page title="Shipping estimate">
      <Go onClick={() => setZone(shippingZone())}>Estimate shipping</Go> {zone}
    </Page>
  );
}

export function CartQuantityPage() {
  useReady();
  const button = useRef(null);
  useEffect(() => {
    // Legacy quantity widget wired with a plain DOM listener.
    const el = button.current;
    let line = { sku: 'sku-3', qty: 1 };
    const onUpdate = () => {
      line = setQuantity(line, '');
    };
    el.addEventListener('click', onUpdate);
    return () => el.removeEventListener('click', onUpdate);
  }, []);
  return (
    <Page title="Cart">
      <button id="go" type="button" ref={button}>
        Update quantity
      </button>
    </Page>
  );
}

export function CartMemberDiscountPage() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    loadPricingKernel().then(() => setLoaded(true));
  }, []);
  useReady(loaded);
  return (
    <Page title="Member discount">
      <Go onClick={() => applyMemberDiscount({ totalCents: 1999 })}>Apply member discount</Go>
    </Page>
  );
}

export function CartPricingPage() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    loadPricingPlugin().then(() => setLoaded(true));
  }, []);
  useReady(loaded);
  return (
    <Page title="Cart pricing">
      <Go onClick={() => window.pricingPlugin.apply({ lines: [{ sku: 'sku-2', price: 12 }] })}>Recalculate</Go>
    </Page>
  );
}

export function CartReservePage() {
  useReady();
  return (
    <Page title="Cart">
      <Go onClick={() => { reserveOnCartOpen({ loaded: false, items: [] }); }}>Open cart</Go>
    </Page>
  );
}
