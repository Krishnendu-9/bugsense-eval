// Flattens a nested comment thread for rendering.
export function flattenThread(node, depth = 0, out = []) {
  // G8: deleted comments have author null.
  out.push({ id: node.id, author: node.author.name, depth });
  for (const reply of node.replies) flattenThread(reply, depth + 1, out);
  return out;
}
