import * as cart from './pages/cartPages.jsx';
import * as checkout from './pages/checkoutPages.jsx';
import * as catalog from './pages/catalogPages.jsx';
import * as account from './pages/accountPages.jsx';

// One trigger route per deliberate bug. The harness's plan
// (harness/plan.mjs) maps incident IDs to these paths.
const ROUTES = [
  ['/cart/coupon', cart.CartCouponPage],
  ['/promotions/spring', catalog.PromoPage],
  ['/cart/edit', cart.CartEditPage],
  ['/checkout/review', checkout.CheckoutReviewPage],
  ['/catalog/categories', catalog.CategoriesPage],
  ['/cart/restore', cart.CartRestorePage],
  ['/products/lookup', catalog.ProductLookupPage],
  ['/catalog/drafts', catalog.DraftCatalogPage],
  ['/wishlist', account.WishlistPage],
  ['/share', catalog.SharePage],
  ['/products/reviews', catalog.ProductReviewsPage],
  ['/account/orders', account.OrdersPage],
  ['/account/profile', account.ProfilePage],
  ['/catalog/filters', catalog.FiltersPage],
  ['/checkout/place-order', checkout.CheckoutPlaceOrderPage],
  ['/home/recommendations', catalog.RecommendationsPage],
  ['/products/detail', catalog.ProductDetailPage],
  ['/blog/brewing-guide', account.ArticlePage],
  ['/sell/upload-photo', account.UploadPhotoPage],
  ['/account/order-history', account.OrderHistoryPage],
  ['/cart/refresh', cart.CartRefreshPage],
  ['/products/stock', catalog.StockPage],
  ['/reviews/draft', account.ReviewDraftPage],
  ['/account/security', account.SecurityPage],
  ['/account/session', account.SessionPage],
  ['/products/reviews-widget', catalog.ReviewsWidgetPage],
  ['/support/chat', account.SupportChatPage],
  ['/checkout/pay', checkout.CheckoutPayPage],
  ['/cart/shipping', cart.CartShippingPage],
  ['/checkout/confirm', checkout.CheckoutConfirmPage],
  ['/compare', catalog.ComparePage],
  ['/giftcards', account.GiftCardPage],
  ['/account/address', account.AddressPage],
  ['/checkout/tax', checkout.CheckoutTaxPage],
  ['/community/thread', account.ThreadPage],
  ['/inventory/snapshot', account.InventorySnapshotPage],
  ['/recently-viewed/*', catalog.RecentlyViewedPage],
  ['/promotions/gold', catalog.GoldPromoPage],
  ['/cart/pricing', cart.CartPricingPage],
  ['/settings/language', account.LanguagePage],
  ['/checkout/card', checkout.CheckoutCardPage],
  ['/wishlist/sync', account.WishlistSyncPage],
  ['/checkout/summary', checkout.CheckoutSummaryPage],
  ['/account/address-form', account.AddressFormPage],
  ['/cart/quantity', cart.CartQuantityPage],
  ['/orders/invoice-label', account.InvoiceLabelPage],
  ['/orders/pickup-label', account.PickupLabelPage],
  ['/checkout/start', checkout.CheckoutStartPage],
  ['/account/payment-methods', account.PaymentMethodsPage],
  ['/home/banner', catalog.BannerPage],
  ['/cart/member-discount', cart.CartMemberDiscountPage],
  ['/checkout/tax-estimate', checkout.CheckoutTaxEstimatePage],
  ['/checkout/contact', checkout.CheckoutContactPage],
  ['/account/phone', account.PhonePage],
  ['/cart/reserve', cart.CartReservePage],
  ['/checkout/reserve', checkout.CheckoutReservePage],
  ['/catalog/saved-filters', catalog.SavedFiltersPage],
];

export function findRoute(pathname) {
  for (const [path, component] of ROUTES) {
    if (path.endsWith('/*') ? pathname.startsWith(path.slice(0, -1)) : pathname === path) return { path, component };
  }
  return null;
}
