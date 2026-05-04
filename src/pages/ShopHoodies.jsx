import CatalogPage from '../components/shop/CatalogPage';
import { CATALOG_PRODUCTS, CATALOG_META } from '../data/catalogData';

export default function ShopHoodies() {
  const hoodies = CATALOG_PRODUCTS.filter(p => p.type === 'hoodie');
  return <CatalogPage products={hoodies} meta={CATALOG_META.hoodie} />;
}
