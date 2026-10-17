import { lazy, Suspense, useState } from 'react';
import axios from 'axios';
import { Page, Go, useReady, fixtureData } from '../ui.jsx';
import { countProducts } from '../catalog/categoryTree.js';
import { findProduct } from '../catalog/products.js';
import { ProductCard } from '../components/ProductCard.jsx';
import { ProductPageShare, SearchResultShare } from '../components/ShareLinks.jsx';
import { ErrorBoundary } from '../components/ErrorBoundary.jsx';
import { ProductReviews } from '../components/ProductReviews.jsx';
import { Filters } from '../components/Filters.jsx';
import { fetchProduct } from '../catalog/productApi.js';
import { withTimeout } from '../net/withTimeout.js';
import { Product, Bundle } from '../catalog/describe.js';
import { isEligible } from '../promotions/rules.js';
import { deepClone } from '../utils/deepClone.js';
import { AutoHeightBanner } from '../components/AutoHeightBanner.jsx';

const PromoPanel = lazy(() => import('../lazy/PromoPanel.jsx'));

export function PromoPage() {
  return (
    <Page title="Promotions">
      <Suspense fallback={<p>Loading…</p>}>
        <PromoPanel />
      </Suspense>
    </Page>
  );
}

function buildCategoryTree() {
  const root = { name: 'All', products: [1, 2], children: [] };
  const sale = { name: 'Sale', products: [3], children: [] };
  root.children.push(sale);
  sale.children.push(root);
  return root;
}

export function CategoriesPage() {
  useReady();
  const [count, setCount] = useState(null);
  return (
    <Page title="Categories">
      <Go onClick={() => setCount(countProducts(buildCategoryTree()))}>Show product counts</Go> {count}
    </Page>
  );
}

export function ProductLookupPage() {
  useReady();
  const [name, setName] = useState('');
  const { productId = 'p-1042' } = fixtureData();
  return (
    <Page title="Recently viewed">
      <Go onClick={() => setName(findProduct(productId).name)}>Open product</Go> {name}
    </Page>
  );
}

export function DraftCatalogPage() {
  useReady();
  const [preview, setPreview] = useState('');
  return (
    <Page title="Draft products">
      <ProductCard product={{ id: 'd-17', name: 'Ceramic mug (draft)' }} onQuickView={setPreview} />
      <p>{preview}</p>
    </Page>
  );
}

export function SharePage() {
  useReady();
  const [link, setLink] = useState('');
  const name = 'Fire Sale 🔥 Kettle';
  return (
    <Page title="Fire sale">
      <ProductPageShare product={{ id: 'p-1001', name }} onCopy={setLink} />
      <SearchResultShare result={{ id: 'p-1001', title: name }} onCopy={setLink} />
      <p>{link}</p>
    </Page>
  );
}

export function ProductReviewsPage() {
  useReady();
  const [show, setShow] = useState(false);
  return (
    <Page title="Marketplace kettle">
      <Go onClick={() => setShow(true)}>Show reviews</Go>
      {show && (
        <ErrorBoundary>
          <ProductReviews product={{ id: 'mp-8', name: 'Marketplace kettle' }} />
        </ErrorBoundary>
      )}
    </Page>
  );
}

export function FiltersPage() {
  useReady();
  return (
    <Page title="Catalogue">
      <Filters />
    </Page>
  );
}

export function ProductDetailPage() {
  useReady();
  const { productId = 'p-3310' } = fixtureData();
  async function openProduct() {
    const product = await fetchProduct(productId);
    return product.name;
  }
  return (
    <Page title="Product">
      <Go onClick={() => { openProduct(); }}>Open product details</Go>
    </Page>
  );
}

export function RecommendationsPage() {
  useReady();
  const [items, setItems] = useState([]);
  async function refreshRecommendations() {
    // C2: the recommendations service returns 500 for new visitors.
    const res = await axios.get('/api/recommendations');
    setItems(res.data.items);
  }
  return (
    <Page title="For you">
      <Go onClick={() => { refreshRecommendations(); }}>Refresh recommendations</Go> {items.length}
    </Page>
  );
}

export function StockPage() {
  useReady();
  const stockRequest = () => new Promise(() => {});
  return (
    <Page title="Stock">
      <Go onClick={() => { withTimeout(stockRequest(), 50); }}>Check stock</Go>
    </Page>
  );
}

export function ReviewsWidgetPage() {
  useReady();
  function loadWidget() {
    // E1: third-party reviews widget served from the CDN origin without CORS.
    const script = document.createElement('script');
    script.src = 'http://localhost:7104/reviews-widget.js';
    document.body.appendChild(script);
  }
  return (
    <Page title="Reviews">
      <Go onClick={loadWidget}>Load reviews widget</Go>
    </Page>
  );
}

export function ComparePage() {
  useReady();
  const [text, setText] = useState('');
  return (
    <Page title="Compare">
      <Go onClick={() => setText(new Product('Kettle').describe())}>Compare product</Go>
      <Go id="go-alt" onClick={() => setText(new Bundle('Breakfast set', ['p-1001', 'p-1002']).describe())}>
        Compare bundle
      </Go>
      <p>{text}</p>
    </Page>
  );
}

export function GoldPromoPage() {
  useReady();
  const [ok, setOk] = useState(null);
  return (
    <Page title="Gold members">
      <Go onClick={() => setOk(isEligible({ total: 140, lines: 3 }))}>Check promo eligibility</Go> {String(ok)}
    </Page>
  );
}

export function SavedFiltersPage() {
  useReady();
  const [copies, setCopies] = useState([]);
  function duplicateFilter() {
    const group = { name: 'Kitchen', filters: [] };
    const filter = { field: 'price', max: 50, group };
    group.filters.push(filter);
    setCopies([...copies, deepClone(filter)]);
  }
  return (
    <Page title="Saved filters">
      <Go onClick={duplicateFilter}>Duplicate filter</Go> {copies.length}
    </Page>
  );
}

export function BannerPage() {
  useReady();
  const [show, setShow] = useState(false);
  return (
    <Page title="Home">
      <Go onClick={() => setShow(true)}>Show banner</Go>
      {show && <AutoHeightBanner />}
    </Page>
  );
}

export function RecentlyViewedPage() {
  useReady();
  const id = window.location.pathname.split('/').pop();
  return (
    <Page title="Product">
      <Go onClick={() => window.legacyRecentlyViewed(id)}>View product</Go>
    </Page>
  );
}
