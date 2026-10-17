import { useState } from 'react';
import { Page, Go, useReady, fixtureData } from '../ui.jsx';
import { WishlistRow } from '../components/WishlistRow.jsx';
import { ErrorBoundary } from '../components/ErrorBoundary.jsx';
import { OrderHistory } from '../components/OrderHistory.jsx';
import { ProfileBadge } from '../components/ProfileBadge.jsx';
import { sendAnalytics } from '../analytics/beacon.js';
import { uploadImage } from '../uploads/uploadImage.js';
import { loadOrderHistory } from '../account/loadOrders.js';
import { saveDraft } from '../storage/quota.js';
import { ensureSession } from '../auth/session.js';
import { scheduleRefresh } from '../auth/refresh.js';
import { parseGiftCard } from '../giftcards/parse.js';
import { saveAddress } from '../account/address.js';
import { flattenThread } from '../community/thread.js';
import { readInventorySnapshot } from '../inventory/validate.js';
import { loadLocale } from '../i18n/loadLocale.js';
import { syncWishlist } from '../wishlist/sync.js';
import { submitAddressForm } from '../account/addressForm.js';
import { buildShippingLabel } from '../shipping/label.js';
import { savePaymentMethod } from '../account/paymentMethods.js';
import { normalizePhone } from '../account/phone.js';

const TIMESTAMP = { seconds: 1760000000, nanoseconds: 0 };

export function WishlistPage() {
  useReady();
  const [note, setNote] = useState('');
  return (
    <Page title="Wishlist">
      <ul>
        <WishlistRow item={{ sku: 'sku-5', name: 'Linen apron', priceCents: 2900 }} onMove={setNote} />
      </ul>
      <p>{note}</p>
    </Page>
  );
}

export function OrdersPage() {
  useReady();
  const [show, setShow] = useState(false);
  return (
    <Page title="Your orders">
      <Go onClick={() => setShow(true)}>Show order history</Go>
      {show && (
        <ErrorBoundary>
          <OrderHistory orders={[{ id: 'o-3001', placedAt: TIMESTAMP }]} />
        </ErrorBoundary>
      )}
    </Page>
  );
}

export function ProfilePage() {
  useReady();
  const [show, setShow] = useState(false);
  return (
    <Page title="Profile">
      <Go onClick={() => setShow(true)}>Show profile</Go>
      {show && (
        <ErrorBoundary>
          <ProfileBadge user={{ name: 'Ada', memberSince: TIMESTAMP }} />
        </ErrorBoundary>
      )}
    </Page>
  );
}

export function ArticlePage() {
  useReady();
  return (
    <Page title="Brewing guide">
      <Go onClick={() => { sendAnalytics({ type: 'article_read', article: 'brewing-guide' }); }}>Mark as read</Go>
    </Page>
  );
}

export function UploadPhotoPage() {
  useReady();
  return (
    <Page title="Sell an item">
      <Go onClick={() => { uploadImage(new Blob(['photo'], { type: 'image/png' })); }}>Upload photo</Go>
    </Page>
  );
}

export function OrderHistoryPage() {
  useReady();
  async function showHistory() {
    const orders = await loadOrderHistory();
    return orders.length;
  }
  return (
    <Page title="Order history">
      <Go onClick={() => { showHistory(); }}>Load order history</Go>
    </Page>
  );
}

export function ReviewDraftPage() {
  useReady();
  return (
    <Page title="Write a review">
      <Go onClick={() => { saveDraft({ rating: 4, text: 'Pours well, lid rattles a little.' }); }}>Save draft</Go>
    </Page>
  );
}

export function SecurityPage() {
  useReady();
  return (
    <Page title="Security">
      <Go onClick={() => { ensureSession({ token: 'abc', expiresAt: Date.now() + 3600000 }); }}>Change password</Go>
    </Page>
  );
}

export function SessionPage() {
  useReady();
  return (
    <Page title="Account">
      <Go onClick={() => scheduleRefresh({ user: 'guest' })}>Stay signed in</Go>
    </Page>
  );
}

export function SupportChatPage() {
  useReady();
  function openChat() {
    // E2: third-party chat widget served from the CDN origin without CORS.
    const script = document.createElement('script');
    script.src = 'http://localhost:7104/chat-widget.js';
    document.body.appendChild(script);
  }
  return (
    <Page title="Support">
      <Go onClick={openChat}>Open chat</Go>
    </Page>
  );
}

export function GiftCardPage() {
  useReady();
  const [value, setValue] = useState(null);
  const code = ' gc-12345678';
  function applyGiftCard() {
    setValue(parseGiftCard(code));
  }
  async function redeemAtCheckout() {
    await Promise.resolve();
    setValue(parseGiftCard(code));
  }
  return (
    <Page title="Gift cards">
      <Go onClick={applyGiftCard}>Apply gift card</Go>
      <Go id="go-alt" onClick={() => { redeemAtCheckout(); }}>
        Redeem at checkout
      </Go>
      {value}
    </Page>
  );
}

export function AddressPage() {
  useReady();
  return (
    <Page title="Address book">
      <Go onClick={() => saveAddress({ street: '1 Main St', city: 'Leeds' })}>Save address</Go>
    </Page>
  );
}

function buildThread(depth) {
  let node = { id: `c-${depth}`, author: null, replies: [] };
  for (let d = depth - 1; d >= 0; d--) {
    node = { id: `c-${d}`, author: { name: `user${d}` }, replies: [node] };
  }
  return node;
}

export function ThreadPage() {
  useReady();
  const [rows, setRows] = useState([]);
  const { depth = 3 } = fixtureData();
  return (
    <Page title="Community">
      <Go onClick={() => setRows(flattenThread(buildThread(depth)))}>Expand thread</Go> {rows.length}
    </Page>
  );
}

export function InventorySnapshotPage() {
  useReady();
  const [n, setN] = useState(0);
  return (
    <Page title="Inventory">
      <Go onClick={() => setN(readInventorySnapshot().length)}>Show stock levels</Go> {n}
    </Page>
  );
}

export function LanguagePage() {
  useReady();
  const { lang = 'pt-BR' } = fixtureData();
  return (
    <Page title="Language">
      <Go onClick={() => { loadLocale(lang).then((t) => { document.title = t.title; }); }}>Switch language</Go>
    </Page>
  );
}

export function WishlistSyncPage() {
  useReady();
  const { attempts = 3 } = fixtureData();
  return (
    <Page title="Wishlist">
      <Go onClick={() => syncWishlist([{ sku: 'sku-5' }, { name: 'Search result item' }], attempts)}>Sync wishlist</Go>
    </Page>
  );
}

export function AddressFormPage() {
  useReady();
  return (
    <Page title="New address">
      <Go onClick={() => submitAddressForm({ country: 'IE', street: '4 Quay St' })}>Save</Go>
    </Page>
  );
}

export function InvoiceLabelPage() {
  useReady();
  const order = { id: 'o-77', billing: {}, shipping: { address: { zip: '10115' } } };
  return (
    <Page title="Guest order">
      <Go onClick={() => buildShippingLabel(order)}>Print shipping label</Go>
    </Page>
  );
}

export function PickupLabelPage() {
  useReady();
  const order = { id: 'o-78', billing: { address: { zip: '75001' } }, shipping: { method: 'pickup' } };
  return (
    <Page title="Pickup order">
      <Go onClick={() => buildShippingLabel(order)}>Print pickup label</Go>
    </Page>
  );
}

export function PaymentMethodsPage() {
  useReady();
  return (
    <Page title="Payment methods">
      <Go onClick={() => savePaymentMethod()}>Save card</Go>
    </Page>
  );
}

export function PhonePage() {
  useReady();
  const [phone, setPhone] = useState('');
  const profile = { name: 'Imported customer' };
  return (
    <Page title="Profile">
      <Go onClick={() => setPhone(normalizePhone(profile.phone))}>Save profile</Go> {phone}
    </Page>
  );
}
