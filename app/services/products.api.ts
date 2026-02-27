export async function getProducts(): Promise<Product[]> {
  const API_URL = "https://fakestoreapi.com";
  
  const res = await fetch(`${API_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();

  return data;
}
