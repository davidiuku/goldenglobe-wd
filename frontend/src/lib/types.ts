export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    countInStock: number;
    itemSpecifications: {
        label: string;
        value: string;
    }[];
}

export interface Login {
    email: string;
    password: string;
}

export interface SignUp extends Login {
    name: string;
}

export interface SignUpForm extends SignUp {
    confirmedPasword: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    token?: string;
}
export interface AuthContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoggedIn: boolean;
}

export interface JwtPayload {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    iat?: number;
    exp?: number;
}
