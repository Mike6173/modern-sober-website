import CatalogPage from '../components/shop/CatalogPage';
import { CATALOG_PRODUCTS, CATALOG_META } from '../data/catalogData';

export default function ShopTees() {
  const tees = CATALOG_PRODUCTS.filter(p => p.type === 'tee');
  return <CatalogPage products={tees} meta={CATALOG_META.tee} />;
}
