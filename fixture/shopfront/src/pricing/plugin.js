// Pricing plugin delivered as source text and loaded through a blob: URL.
const PLUGIN_SOURCE = [
  'window.pricingPlugin = {',
  '  apply: function (cart) {',
  '    // G12: lines without a discount block are not handled.',
  '    return cart.lines.map(function (line) { return line.price * (1 - line.discount.rate); });',
  '  }',
  '};',
].join('\n');

export function loadPricingPlugin() {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([PLUGIN_SOURCE], { type: 'text/javascript' }));
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
