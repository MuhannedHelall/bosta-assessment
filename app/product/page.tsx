import ProductList from "../components/ProductList";
import { getProducts } from "../services/products.api";

export default async function Products() {
  let products: Product[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    products = [];
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="text-center mb-16">
          <small className="font-mono antialiased text-base text-slate-800 block font-semibold">
            Tailored Product Search
          </small>
          <h2 className="font-sans antialiased font-bold text-2xl md:text-3xl lg:text-4xl text-slate-800 my-4">
            Find What You Need
          </h2>
          <p className="font-serif antialiased text-base md:text-lg text-slate-600 max-w-3xl text-balance mx-auto">
            Simplify your shopping experience with our intuitive filter system.
            Whether you&#x27;re looking for specific features, price ranges, or
            brands.
          </p>
        </div>
        <ProductList products={products} />
      </div>
    </div>
  );
}
