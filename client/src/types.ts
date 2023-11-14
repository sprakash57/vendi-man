export interface Product {
  _id: string;
  user: { username: string; _id: string } | null;
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
  productsCount: number;
  totalPages: number;
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
  user: { username: string; _id: string };
}

export interface ModalPageDetails {
  redirectTo?: string;
  title?: string;
  confirmAction?: () => void;
}
