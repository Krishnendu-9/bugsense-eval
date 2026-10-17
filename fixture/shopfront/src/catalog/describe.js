// Comparison-table descriptions shared by every item type.
export function describeItem() {
  // G4: assumes every item carries a meta block.
  return `${this.title} (${this.meta.label})`;
}

export class Product {
  constructor(title) {
    this.title = title;
  }
}
Product.prototype.describe = describeItem;

export class Bundle {
  constructor(title, items) {
    this.title = title;
    this.items = items;
  }
}
Bundle.prototype.describe = describeItem;
