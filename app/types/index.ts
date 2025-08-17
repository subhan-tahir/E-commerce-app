
//auth
export type RegisterFormTypes = {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    remember: boolean;
    phone: string;
    address: string;
}

export type LoginFormTypes = {
    email: string;
    password: string;
    remember: boolean;
}

export type ForgetPasswordFormTypes = {
    email: string;
}

export type ResetPasswordFormTypes = {
    password: string;
    confirmPassword: string;
};

//user 
export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    profileImage: string;
    role: string;
}
export type session = {
    id: string;
    name: string;
    email: string;
    profileImage: string;
    phone: string;
    address: string;
    accessToken: string;
}
//update user
export type UpdateUser = {
    username: string;
    email: string;
    phone: string;
    address: string;
    profileImage: string;
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

export type EmailOptions = {
    to: string;
    subject: string;
    text: string;
    html: string;
}

//contact form
export type ContactFormTypes = {
    fullName: string;
    email: string;
    message: string;
}

