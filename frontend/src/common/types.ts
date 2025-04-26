export type Category = {
    id: string;
    parentId?: string;
    parent?: Category;
    children: Category[];
    name: string;
    products: Product[];
}

export type Product = {
    id: string;
    categories: Category[];
    name: string;
    qty: number;
    price: number;
    photo: string;
}

export type EditProduct = {
    id?: string;
    categories: string[] | [];
    name?: string | null;
    qty?: number | null;
    price?: number | null;
    photo?: string | null;
}