const API_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();

  return data;
}

export async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product = await res.json();

  return data;
}

export const createProduct = async (product: CreateProductDTO) => {
  const res = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("Failed to create product");
  }

  return res.json();
};
