type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type CreateProductDTO = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
