
//auth
export type RegisterFormTypes = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    remember: boolean;
}

export type LoginFormTypes = {
    email: string;
    password: string;
}

export type ForgetPasswordFormTypes = {
    email: string;
}

//user 
export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    avatar: string;
    role: string;
}

//product
export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: {
        rate: number;
        count: number;
    };
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    image: string;
}

