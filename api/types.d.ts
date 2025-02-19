export interface UserData {
    email: string;
    password: string;
    role: string;
    token: string;
    displayName: string;
    googleId: string;
    avatar: string | null;
}

export interface Ingredient {
    ingredientName: string;
    amount: string;
}