// Review list on the product page.
export function ProductReviews({ product }) {
  // B1: products imported from the marketplace have no reviews array.
  const items = product.reviews.map((review) => <li key={review.id}>{review.text}</li>);
  return <ul>{items}</ul>;
}
