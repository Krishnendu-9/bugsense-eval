// Past orders table.
export function OrderHistory({ orders }) {
  return (
    <table>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            {/* B2: placedAt is a timestamp object, not a string */}
            <td>{order.placedAt}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
