import CatalogPage from '../components/shop/CatalogPage';
import { CATALOG_PRODUCTS, CATALOG_META } from '../data/catalogData';

export default function Shop() {
  return <CatalogPage products={CATALOG_PRODUCTS} meta={CATALOG_META.all} />;
}
