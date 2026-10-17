import { useState } from 'react';

// Catalogue filters with an expandable "more filters" section.
export function Filters() {
  const [expanded, setExpanded] = useState(false);
  let range = null;
  if (expanded) {
    // B4: a hook called conditionally.
    const [priceRange] = useState([0, 100]);
    range = priceRange;
  }
  return (
    <div>
      <button id="go" type="button" onClick={() => setExpanded(true)}>
        More filters
      </button>
      {range && <span>{range.join('-')}</span>}
    </div>
  );
}
