import CatalogPage from '../components/shop/CatalogPage';
import { CATALOG_PRODUCTS, CATALOG_META } from '../data/catalogData';

export default function ShopCaps() {
  const caps = CATALOG_PRODUCTS.filter(p => p.type === 'cap');
  return <CatalogPage products={caps} meta={CATALOG_META.cap} />;
}
