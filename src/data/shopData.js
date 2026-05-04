// ── Nav structure + dropdown thumbnails ────────────────────────────────────
export const NAV_SHOP = [
  {
    gender: 'men',
    label: 'Shop Men',
    categories: [
      { slug: 't-shirts',      label: 'T-Shirts',      thumb: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=400&h=500&q=80' },
      { slug: 'pants',         label: 'Pants',          thumb: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=400&h=500&q=80' },
      { slug: 'hoodies',       label: 'Hoodies',        thumb: '/images/products/hoodie/hoodie-02-yacht-walking.jpg' },
      { slug: 'long-sleeves',  label: 'Long Sleeves',   thumb: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?auto=format&fit=crop&w=400&h=500&q=80' },
      { slug: 'bathing-suits', label: 'Bathing Suits',  thumb: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=400&h=500&q=80' },
    ],
  },
  {
    gender: 'women',
    label: 'Shop Women',
    categories: [
      { slug: 't-shirts',      label: 'T-Shirts',      thumb: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&h=500&q=80' },
      { slug: 'pants',         label: 'Pants',          thumb: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&h=500&q=80' },
      { slug: 'hoodies',       label: 'Hoodies',        thumb: '/images/products/cropsweatshirt/cropsweatshirt-02-yacht-front.jpg' },
      { slug: 'long-sleeves',  label: 'Long Sleeves',   thumb: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=400&h=500&q=80' },
      { slug: 'bathing-suits', label: 'Bathing Suits',  thumb: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?auto=format&fit=crop&w=400&h=500&q=80' },
    ],
  },
  {
    gender: 'unisex',
    label: 'Shop Unisex',
    categories: [
      { slug: 'hats', label: 'Hats', thumb: '/images/products/cap/cap-03-pair.jpg' },
    ],
  },
];

// ── Hero + tagline per gender/category ─────────────────────────────────────
export const CATEGORY_META = {
  men: {
    't-shirts':      { tagline: 'Everyday Essentials',    hero: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1400&h=680&q=80' },
    'pants':         { tagline: 'Clean Lines. All Day.',   hero: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1400&h=680&q=80' },
    'hoodies':       { tagline: 'Structured Comfort.',     hero: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&fit=crop&w=1400&h=680&q=80' },
    'long-sleeves':  { tagline: 'Refined Layers.',         hero: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?auto=format&fit=crop&w=1400&h=680&q=80' },
    'bathing-suits': { tagline: 'Clarity by the Water.',   hero: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1400&h=680&q=80' },
  },
  women: {
    't-shirts':      { tagline: 'Everyday Essentials.',   hero: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&h=680&q=80' },
    'pants':         { tagline: 'Elevated Everyday.',      hero: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&h=680&q=80' },
    'hoodies':       { tagline: 'Soft Structure.',         hero: '/images/products/cropsweatshirt/cropsweatshirt-03-yacht-back.jpg' },
    'long-sleeves':  { tagline: 'Considered Layers.',      hero: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1400&h=680&q=80' },
    'bathing-suits': { tagline: 'Coastal Clarity.',        hero: 'https://images.unsplash.com/photo-1570976447640-ac859083963f?auto=format&fit=crop&w=1400&h=680&q=80' },
  },
  unisex: {
    'hats': { tagline: 'The Finishing Touch.',             hero: '/images/products/cap/cap-01-spec.jpg' },
  },
};

// ── Color palette ──────────────────────────────────────────────────────────
const C = {
  black:  { name: 'Black',  hex: '#1a1714' },
  cream:  { name: 'Cream',  hex: '#f0ebe4' },
  stone:  { name: 'Stone',  hex: '#8a7d72' },
  sand:   { name: 'Sand',   hex: '#c8b89a' },
  navy:   { name: 'Navy',   hex: '#2c3e50' },
  white:  { name: 'White',  hex: '#f8f6f3' },
  taupe:  { name: 'Taupe',  hex: '#b5a99a' },
  olive:  { name: 'Olive',  hex: '#5c5a42' },
  slate:  { name: 'Slate',  hex: '#6b7c8c' },
  blush:  { name: 'Blush',  hex: '#d4a5a5' },
  mocha:  { name: 'Mocha',  hex: '#6b4f3a' },
};

// ── Products ───────────────────────────────────────────────────────────────
export const SHOP_PRODUCTS = [

  // MEN — T-SHIRTS
  { id:'m-tee-1', gender:'men', category:'t-shirts', name:'Heavy Tee',       price:55, colors:[C.black,C.cream,C.stone], sizes:['XS','S','M','L','XL'],       fit:'relaxed', trending:true,  img:'/images/products/tee/tee-01-spec.jpg' },
  { id:'m-tee-2', gender:'men', category:'t-shirts', name:'Clean Line Tee',  price:48, colors:[C.white,C.navy,C.taupe],  sizes:['XS','S','M','L','XL','XXL'], fit:'slim',    trending:false, img:'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=600&h=750&q=80' },
  { id:'m-tee-3', gender:'men', category:'t-shirts', name:'Coastal Tee',     price:52, colors:[C.slate,C.cream,C.sand],  sizes:['S','M','L','XL'],             fit:'relaxed', trending:false, img:'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&h=750&q=80' },

  // MEN — PANTS
  { id:'m-pant-1', gender:'men', category:'pants', name:'Tailored Jogger', price:78, colors:[C.black,C.stone,C.navy],  sizes:['XS','S','M','L','XL'],       fit:'tapered', trending:true,  img:'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&h=750&q=80' },
  { id:'m-pant-2', gender:'men', category:'pants', name:'Linen Trouser',   price:92, colors:[C.sand,C.white,C.olive],  sizes:['S','M','L','XL'],             fit:'relaxed', trending:false, img:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&h=750&q=80' },
  { id:'m-pant-3', gender:'men', category:'pants', name:'Minimal Chino',   price:85, colors:[C.taupe,C.black,C.navy],  sizes:['XS','S','M','L','XL','XXL'], fit:'slim',    trending:false, img:'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&h=750&q=80' },

  // MEN — HOODIES
  { id:'m-hood-1', gender:'men', category:'hoodies', name:'Essential Hoodie',   price:120, colors:[C.black,C.cream,C.stone], sizes:['XS','S','M','L','XL','XXL'], fit:'relaxed', trending:true,  img:'/images/products/hoodie/hoodie-01-spec.jpg' },
  { id:'m-hood-2', gender:'men', category:'hoodies', name:'Yacht Club Hoodie',  price:115, colors:[C.cream,C.navy],          sizes:['S','M','L','XL'],             fit:'relaxed', trending:false, img:'/images/products/hoodie/hoodie-02-yacht-walking.jpg' },
  { id:'m-hood-3', gender:'men', category:'hoodies', name:'Midweight Pullover', price:110, colors:[C.slate,C.stone,C.black], sizes:['XS','S','M','L','XL'],       fit:'relaxed', trending:false, img:'https://images.unsplash.com/photo-1556821840-3a63f15732ce?auto=format&fit=crop&w=600&h=750&q=80' },

  // MEN — LONG SLEEVES
  { id:'m-ls-1', gender:'men', category:'long-sleeves', name:'Clean Sleeve Tee',    price:65, colors:[C.black,C.cream,C.stone], sizes:['XS','S','M','L','XL'],       fit:'relaxed', trending:false, img:'https://images.unsplash.com/photo-1618354691438-25bc04584c23?auto=format&fit=crop&w=600&h=750&q=80' },
  { id:'m-ls-2', gender:'men', category:'long-sleeves', name:'Thermal Long Sleeve', price:72, colors:[C.navy,C.sand,C.taupe],   sizes:['S','M','L','XL'],             fit:'slim',    trending:true,  img:'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&w=600&h=750&q=80' },
  { id:'m-ls-3', gender:'men', category:'long-sleeves', name:'Modal Layer',         price:68, colors:[C.slate,C.cream,C.black], sizes:['XS','S','M','L','XL','XXL'], fit:'relaxed', trending:false, img:'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=600&h=750&q=80' },

  // MEN — BATHING SUITS
  { id:'m-swim-1', gender:'men', category:'bathing-suits', name:'Clear Water Short',  price:72, colors:[C.navy,C.sand,C.black],   sizes:['S','M','L','XL'],       fit:'relaxed', trending:true,  img:'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&w=600&h=750&q=80' },
  { id:'m-swim-2', gender:'men', category:'bathing-suits', name:'Linen Swim Trunk',   price:68, colors:[C.sand,C.olive,C.cream],  sizes:['S','M','L','XL','XXL'], fit:'relaxed', trending:false, img:'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=600&h=750&q=80' },
  { id:'m-swim-3', gender:'men', category:'bathing-suits', name:'Coastal Boardshort', price:75, colors:[C.slate,C.stone,C.cream], sizes:['S','M','L','XL'],       fit:'relaxed', trending:false, img:'https://images.unsplash.com/photo-1545579533-99bb4502ef2c?auto=format&fit=crop&w=600&h=750&q=80' },

  // WOMEN — T-SHIRTS
  { id:'w-tee-1', gender:'women', category:'t-shirts', name:'Elevated Crop Tee', price:48, colors:[C.cream,C.black,C.blush], sizes:['XS','S','M','L'],      fit:'crop',      trending:true,  img:'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&h=750&q=80' },
  { id:'w-tee-2', gender:'women', category:'t-shirts', name:'Oversized Classic', price:52, colors:[C.sand,C.white,C.stone],  sizes:['XS','S','M','L','XL'], fit:'oversized', trending:false, img:'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&h=750&q=80' },
  { id:'w-tee-3', gender:'women', category:'t-shirts', name:'Modern Søber Tee',  price:55, colors:[C.black,C.cream,C.taupe], sizes:['XS','S','M','L'],      fit:'relaxed',   trending:true,  new:true, img:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&h=750&q=80' },

  // WOMEN — PANTS
  { id:'w-pant-1', gender:'women', category:'pants', name:'Wide Leg Trouser',      price:88, colors:[C.cream,C.sand,C.taupe],  sizes:['XS','S','M','L'],      fit:'wide',     trending:true,  img:'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&h=750&q=80' },
  { id:'w-pant-2', gender:'women', category:'pants', name:'Minimal Straight Pant', price:82, colors:[C.black,C.navy,C.stone],  sizes:['XS','S','M','L','XL'], fit:'straight', trending:false, img:'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=600&h=750&q=80' },
  { id:'w-pant-3', gender:'women', category:'pants', name:'Linen Jogger',          price:75, colors:[C.blush,C.sand,C.white],  sizes:['XS','S','M','L'],      fit:'relaxed',  trending:false, new:true, img:'https://images.unsplash.com/photo-1594938298603-c8148c4b4e80?auto=format&fit=crop&w=600&h=750&q=80' },

  // WOMEN — HOODIES
  { id:'w-hood-1', gender:'women', category:'hoodies', name:'Blush Cropped Hoodie', price:88, colors:[C.blush,C.cream,C.black], sizes:['XS','S','M','L'],      fit:'crop',      trending:true,  img:'/images/products/cropsweatshirt/blush-hoodie-1.jpg' },
  { id:'w-hood-2', gender:'women', category:'hoodies', name:'Oversized Pullover', price:95, colors:[C.cream,C.sand,C.stone],  sizes:['XS','S','M','L','XL'], fit:'oversized', trending:false, img:'/images/products/cropsweatshirt/cropsweatshirt-02-yacht-front.jpg' },
  { id:'w-hood-3', gender:'women', category:'hoodies', name:'Soft Shell Hoodie',  price:98, colors:[C.slate,C.blush,C.black], sizes:['XS','S','M','L'],      fit:'relaxed',   trending:false, img:'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&h=750&q=80' },

  // WOMEN — LONG SLEEVES
  { id:'w-ls-1', gender:'women', category:'long-sleeves', name:'Ribbed Layer',        price:62, colors:[C.cream,C.blush,C.stone], sizes:['XS','S','M','L'],      fit:'slim',    trending:true,  img:'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&h=750&q=80' },
  { id:'w-ls-2', gender:'women', category:'long-sleeves', name:'Cropped Long Sleeve', price:58, colors:[C.black,C.sand,C.slate],  sizes:['XS','S','M','L'],      fit:'crop',    trending:false, img:'https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?auto=format&fit=crop&w=600&h=750&q=80' },
  { id:'w-ls-3', gender:'women', category:'long-sleeves', name:'Modal Long Sleeve',   price:65, colors:[C.blush,C.taupe,C.navy],  sizes:['XS','S','M','L','XL'], fit:'relaxed', trending:false, img:'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=600&h=750&q=80' },

  // WOMEN — BATHING SUITS
  { id:'w-swim-1', gender:'women', category:'bathing-suits', name:'Minimal One-Piece',  price:95, colors:[C.black,C.cream,C.sand],  sizes:['XS','S','M','L'], fit:'classic', trending:true,  img:'https://images.unsplash.com/photo-1570976447640-ac859083963f?auto=format&fit=crop&w=600&h=750&q=80' },
  { id:'w-swim-2', gender:'women', category:'bathing-suits', name:'Elevated Bikini Set', price:88, colors:[C.blush,C.stone,C.navy],  sizes:['XS','S','M','L'], fit:'classic', trending:false, img:'https://images.unsplash.com/photo-1562359371-f50f1c2fb5f0?auto=format&fit=crop&w=600&h=750&q=80' },
  { id:'w-swim-3', gender:'women', category:'bathing-suits', name:'Coastal Cover-Up',    price:72, colors:[C.sand,C.cream,C.taupe],  sizes:['XS','S','M','L','XL'], fit:'relaxed', trending:false, img:'https://images.unsplash.com/photo-1523905330026-b8bd1f5f320e?auto=format&fit=crop&w=600&h=750&q=80' },

  // UNISEX — HATS
  { id:'u-hat-1', gender:'unisex', category:'hats', name:'Minimal Cap',  price:60, colors:[C.black,C.white,C.sand], sizes:['ONE SIZE'], fit:'adjustable', trending:true,  img:'/images/products/cap/cap-01-spec.jpg' },
  { id:'u-hat-2', gender:'unisex', category:'hats', name:'Court Cap',    price:65, colors:[C.cream,C.navy],         sizes:['ONE SIZE'], fit:'adjustable', trending:false, img:'/images/products/cap/cap-02-tennis.jpg' },
  { id:'u-hat-3', gender:'unisex', category:'hats', name:'Two-Tone Cap', price:55, colors:[C.black,C.sand],         sizes:['ONE SIZE'], fit:'adjustable', trending:false, img:'/images/products/cap/cap-03-pair.jpg' },
];
