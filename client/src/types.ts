export interface Product {
  _id: string;
  user: string;
  productName: string;
  cost: number;
  amountAvailable: number;
  createdAt: string;
  updatedAt: string;
  productId: string;
}

export interface ProductNavigation {
  totalPages: number;
  currentPage: number;
  productsCount: number;
}

export interface ProductResponse extends ProductNavigation {
  status: number;
  message: string;
  data: Product[];
}

export interface ProductDetailsResponse {
  status: number;
  message: string;
  data: Product;
}

export interface ProductFormFields {
  productName: string;
  cost: number;
  amountAvailable: number;
}

export interface ProductTableProps extends ProductFormFields {
  productId: string;
  updatedAt: string;
}
