import type { CommerceAdapter } from './adapter';
import type { Category, Product, ProductFilter } from './types';

const categories: Category[] = [
  {
    slug: 'porcelain',
    name: { en: 'Porcelain', ka: 'ფაიფური' },
    blurb: {
      en: 'Plates, cups and serving pieces — fine porcelain for the everyday and the occasion.',
      ka: 'თეფშები, ფინჯნები და სასადილო ნივთები — წვრილი ფაიფური ყოველდღიური და განსაკუთრებული შემთხვევებისთვის.'
    },
    cover: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1600&q=80'
  },
  {
    slug: 'tableware',
    name: { en: 'Tableware', ka: 'სასადილო ჭურჭელი' },
    blurb: {
      en: 'Quiet, considered tableware that lets the meal speak.',
      ka: 'მშვიდი, გააზრებული სასადილო ჭურჭელი, რომელიც კერძს აძლევს ხმას.'
    },
    cover: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=1600&q=80'
  },
  {
    slug: 'silverware',
    name: { en: 'Silverware', ka: 'ვერცხლის ნაწარმი' },
    blurb: {
      en: 'Cutlery and serving sets in classic silver finishes.',
      ka: 'დანა-ჩანგალი და სერვირების კომპლექტები კლასიკურ ვერცხლისფერ ფერებში.'
    },
    cover: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1600&q=80'
  },
  {
    slug: 'pictures',
    name: { en: 'Pictures', ka: 'სურათები' },
    blurb: {
      en: 'Framed pieces — quiet wall companions.',
      ka: 'ჩარჩოში ჩასმული ნამუშევრები — მშვიდი კედლის თანამგზავრები.'
    },
    cover: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1600&q=80'
  },
  {
    slug: 'board-games',
    name: { en: 'Board Games', ka: 'სამაგიდო თამაშები' },
    blurb: {
      en: 'Classics and curiosities for long evenings.',
      ka: 'კლასიკა და საინტერესო ნივთები გრძელი საღამოებისთვის.'
    },
    cover: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=1600&q=80'
  },
  {
    slug: 'holiday',
    name: { en: 'Holiday Pieces', ka: 'სადღესასწაულო' },
    blurb: {
      en: 'Easter, Christmas and seasonal statues.',
      ka: 'აღდგომის, შობის და სეზონური ქანდაკებები.'
    },
    cover: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=1600&q=80'
  },
  {
    slug: 'christmas-trees',
    name: { en: 'Christmas Trees', ka: 'საახალწლო ნაძვის ხე' },
    blurb: {
      en: 'Trees and ornaments for the season.',
      ka: 'ხეები და მორთულობა სეზონისთვის.'
    },
    cover: 'https://images.unsplash.com/photo-1543934638-bd2e138a3a58?w=1600&q=80'
  },
  {
    slug: 'gifts',
    name: { en: 'Gifts for any occasion', ka: 'საჩუქრები ნებისმიერი შემთხვევისთვის' },
    blurb: {
      en: 'Curated objects, ready to give.',
      ka: 'მოვლილი ნივთები, საჩუქრად მზად.'
    },
    cover: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1600&q=80'
  }
];

const products: Product[] = [
  {
    id: 'p_001',
    handle: 'porcelain-dinner-set-12',
    title: { en: '12-Piece Porcelain Dinner Set', ka: '12-ნაწილიანი ფაიფურის სერვიზი' },
    description: {
      en: 'A complete dinner service for four. Crisp white porcelain, gentle weight, dishwasher-safe.',
      ka: 'სრული სერვიზი ოთხი პერსონისთვის. სუფთა თეთრი ფაიფური, მსუბუქი წონა, ჭურჭლის სარეცხთან თავსებადი.'
    },
    category: 'porcelain',
    priceGel: 480,
    comparePriceGel: 620,
    onSale: true,
    isNew: false,
    inStock: true,
    images: [
      { src: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1600&q=80', alt: 'Porcelain dinner set on white' },
      { src: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=1600&q=80', alt: 'Porcelain detail' }
    ]
  },
  {
    id: 'p_002',
    handle: 'silver-cutlery-24',
    title: { en: '24-Piece Silver Cutlery Set', ka: '24-ნაწილიანი ვერცხლის დანა-ჩანგლის კომპლექტი' },
    description: {
      en: 'Heirloom-grade cutlery in a lined wooden case. Knife, fork, dessert fork, spoon × 6.',
      ka: 'მემკვიდრეობითი ხარისხის დანა-ჩანგალი ხის ფუტლარში. დანა, ჩანგალი, დესერტის ჩანგალი, კოვზი × 6.'
    },
    category: 'silverware',
    priceGel: 920,
    onSale: false,
    isNew: true,
    inStock: true,
    images: [
      { src: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1600&q=80', alt: 'Silver cutlery on white' }
    ]
  },
  {
    id: 'p_003',
    handle: 'easter-porcelain-rabbit',
    title: { en: 'Porcelain Easter Rabbit', ka: 'ფაიფურის აღდგომის კურდღელი' },
    description: {
      en: 'Hand-finished porcelain rabbit, 18cm. A quiet centerpiece for the Easter table.',
      ka: 'ხელით დამუშავებული ფაიფურის კურდღელი, 18სმ. მშვიდი ცენტრალური ნივთი აღდგომის მაგიდისთვის.'
    },
    category: 'holiday',
    priceGel: 145,
    comparePriceGel: 180,
    onSale: true,
    isNew: false,
    inStock: true,
    images: [
      { src: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?w=1600&q=80', alt: 'Porcelain rabbit on white' }
    ]
  },
  {
    id: 'p_004',
    handle: 'christmas-tree-180',
    title: { en: 'Christmas Tree 180cm', ka: 'საახალწლო ნაძვის ხე 180სმ' },
    description: {
      en: 'Full-bodied artificial Christmas tree, 180cm. Sturdy steel base, pre-shaped branches.',
      ka: 'სავსე ხელოვნური საახალწლო ნაძვის ხე, 180სმ. მტკიცე ფოლადის საფუძველი, წინასწარ ფორმირებული ტოტები.'
    },
    category: 'christmas-trees',
    priceGel: 350,
    onSale: false,
    isNew: true,
    inStock: true,
    images: [
      { src: 'https://images.unsplash.com/photo-1543934638-bd2e138a3a58?w=1600&q=80', alt: 'Christmas tree' }
    ]
  },
  {
    id: 'p_005',
    handle: 'classic-chess-set',
    title: { en: 'Classic Wooden Chess Set', ka: 'კლასიკური ხის ჭადრაკი' },
    description: {
      en: 'Walnut and maple board, weighted pieces, lined storage drawer.',
      ka: 'კაკლისა და ნეკერჩხლის დაფა, აწონილი ფიგურები, ხაზოვანი შესანახი უჯრა.'
    },
    category: 'board-games',
    priceGel: 240,
    onSale: false,
    isNew: false,
    inStock: true,
    images: [
      { src: 'https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=1600&q=80', alt: 'Chess set on white' }
    ]
  },
  {
    id: 'p_006',
    handle: 'porcelain-tea-set-6',
    title: { en: 'Porcelain Tea Set for 6', ka: 'ფაიფურის ჩაის სერვიზი 6 პერსონისთვის' },
    description: {
      en: 'Teapot, sugar bowl, cream jug and six cups with saucers. Off-white finish.',
      ka: 'ჩაიდანი, შაქრის ლანგარი, ქილა ნაღებისთვის და ექვსი ფინჯანი ლანგრებით. რძისფერი დასრულება.'
    },
    category: 'porcelain',
    priceGel: 320,
    comparePriceGel: 410,
    onSale: true,
    isNew: false,
    inStock: true,
    images: [
      { src: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1600&q=80', alt: 'Porcelain tea set' }
    ]
  },
  {
    id: 'p_007',
    handle: 'framed-botanical-print',
    title: { en: 'Framed Botanical Print', ka: 'ჩარჩოში ჩასმული ბოტანიკური ნახატი' },
    description: {
      en: 'A4 archival print, oak frame. Pressed-flower study.',
      ka: 'A4 საარქივო ბეჭდვა, მუხის ჩარჩო. დაწნეხილი ყვავილების ეტიუდი.'
    },
    category: 'pictures',
    priceGel: 95,
    onSale: false,
    isNew: true,
    inStock: true,
    images: [
      { src: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1600&q=80', alt: 'Framed print' }
    ]
  },
  {
    id: 'p_008',
    handle: 'gift-box-curated',
    title: { en: "Curator's Gift Box", ka: 'კურატორის საჩუქრის ყუთი' },
    description: {
      en: 'A small porcelain dish, a votive candle and a hand-tied ribbon. Ready to give.',
      ka: 'პატარა ფაიფურის ლანგარი, სანთელი და ხელით შეკრული ლენტი. საჩუქრად მზად.'
    },
    category: 'gifts',
    priceGel: 180,
    onSale: false,
    isNew: true,
    inStock: true,
    images: [
      { src: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=1600&q=80', alt: 'Gift box' }
    ]
  },
  {
    id: 'p_009',
    handle: 'crystal-wine-glasses-6',
    title: { en: 'Crystal Wine Glasses · Set of 6', ka: 'ბროლის ღვინის ჭიქები · 6 ცალი' },
    description: {
      en: 'Lead-free crystal, hand-blown stems, balanced bowl.',
      ka: 'ტყვიის გარეშე ბროლი, ხელით ნაბერი ფეხები, დაბალანსებული ჯამი.'
    },
    category: 'tableware',
    priceGel: 260,
    onSale: false,
    isNew: false,
    inStock: true,
    images: [
      { src: 'https://images.unsplash.com/photo-1542843137-8791a6904d14?w=1600&q=80', alt: 'Crystal wine glasses' }
    ]
  },
  {
    id: 'p_010',
    handle: 'christmas-ornament-set',
    title: { en: 'Glass Ornament Set · 24', ka: 'შუშის სათამაშოების კომპლექტი · 24' },
    description: {
      en: '24 hand-finished glass ornaments in matte and gloss whites.',
      ka: '24 ხელით დამუშავებული შუშის სათამაშო მქრქალ და ბრწყინვალე თეთრში.'
    },
    category: 'christmas-trees',
    priceGel: 120,
    comparePriceGel: 160,
    onSale: true,
    isNew: false,
    inStock: true,
    images: [
      { src: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?w=1600&q=80', alt: 'Glass ornaments' }
    ]
  },
  {
    id: 'p_011',
    handle: 'porcelain-vase-tall',
    title: { en: 'Tall Porcelain Vase', ka: 'მაღალი ფაიფურის ვაზა' },
    description: {
      en: 'Hand-thrown vase, 36cm. Pure white, soft matte finish.',
      ka: 'ხელით ნამუშევარი ვაზა, 36სმ. სუფთა თეთრი, რბილი მქრქალი დასრულება.'
    },
    category: 'porcelain',
    priceGel: 210,
    onSale: false,
    isNew: true,
    inStock: true,
    images: [
      { src: 'https://images.unsplash.com/photo-1578749556552-d6e0b7b89ec0?w=1600&q=80', alt: 'Porcelain vase' }
    ]
  },
  {
    id: 'p_012',
    handle: 'silver-candlesticks-pair',
    title: { en: 'Silver Candlesticks · Pair', ka: 'ვერცხლის სანთლის ჯამი · წყვილი' },
    description: {
      en: 'A pair of weighted silver-plated candlesticks. Felt base.',
      ka: 'წყვილი აწონილი ვერცხლისფერი სანთლის ჯამი. ნაჭრის საფუძველი.'
    },
    category: 'silverware',
    priceGel: 290,
    comparePriceGel: 360,
    onSale: true,
    isNew: false,
    inStock: false,
    images: [
      { src: 'https://images.unsplash.com/photo-1602874801007-3e1c5b66c1f6?w=1600&q=80', alt: 'Silver candlesticks' }
    ]
  }
];

function applyFilter(list: Product[], filter?: ProductFilter): Product[] {
  let out = list;
  if (!filter) return out;
  if (filter.category) out = out.filter((p) => p.category === filter.category);
  if (filter.onSaleOnly) out = out.filter((p) => p.onSale);
  if (filter.minPrice != null) out = out.filter((p) => p.priceGel >= filter.minPrice!);
  if (filter.maxPrice != null) out = out.filter((p) => p.priceGel <= filter.maxPrice!);
  if (filter.search) {
    const q = filter.search.toLowerCase();
    out = out.filter(
      (p) =>
        p.title.en.toLowerCase().includes(q) ||
        p.title.ka.toLowerCase().includes(q) ||
        p.description.en.toLowerCase().includes(q) ||
        p.description.ka.toLowerCase().includes(q)
    );
  }
  switch (filter.sort) {
    case 'price-asc':
      out = [...out].sort((a, b) => a.priceGel - b.priceGel);
      break;
    case 'price-desc':
      out = [...out].sort((a, b) => b.priceGel - a.priceGel);
      break;
    case 'new':
    default:
      out = [...out].sort((a, b) => Number(b.isNew) - Number(a.isNew));
  }
  return out;
}

export const mockAdapter: CommerceAdapter = {
  async listCategories() {
    return categories;
  },
  async listProducts(filter) {
    return applyFilter(products, filter);
  },
  async getProduct(handle) {
    return products.find((p) => p.handle === handle) ?? null;
  },
  async getRelated(handle, limit = 4) {
    const me = products.find((p) => p.handle === handle);
    if (!me) return [];
    return products
      .filter((p) => p.handle !== handle && p.category === me.category)
      .slice(0, limit);
  }
};

export { products as __mockProducts, categories as __mockCategories };
