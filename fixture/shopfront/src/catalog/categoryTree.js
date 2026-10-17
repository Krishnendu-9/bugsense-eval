// Category tree helpers.
export function countProducts(node) {
  let total = node.products.length;
  // A5: no visited set, and "Sale" lists its own parent as a child.
  for (const child of node.children) total += countProducts(child);
  return total;
}
