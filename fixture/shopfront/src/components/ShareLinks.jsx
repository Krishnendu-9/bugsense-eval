import { slugify } from '../utils/slugify.js';

function buildProductUrl(product) {
  return `/p/${slugify(product.name)}`;
}

function buildSearchShareUrl(result) {
  return `/search/${slugify(result.title)}?ref=share`;
}

// Share button on the product page.
export function ProductPageShare({ product, onCopy }) {
  return (
    <button id="go" type="button" onClick={() => onCopy(buildProductUrl(product))}>
      Copy link
    </button>
  );
}

// Share button on a search result.
export function SearchResultShare({ result, onCopy }) {
  return (
    <button id="go-alt" type="button" onClick={() => onCopy(buildSearchShareUrl(result))}>
      Share result
    </button>
  );
}
