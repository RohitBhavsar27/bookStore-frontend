export interface Book {
    _id: string;
    title: string;
    description: string, 
    category: string,
    trending: boolean, 
    newPrice: number,
    oldPrice: number,
    coverImage: string,
    created_at: string
    author: string
}
