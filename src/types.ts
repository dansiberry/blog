// Define types for complex objects for better errors and linting during development. 
  
export type Article = {
    id: number;
    title: string;
    imageUrl: string;
    imageSmallUrl: string;
    categories: Category[];
    slug: string;
    fullText: string;
    createdAt: string;
};

export type Category = {
    id: number;
    title: string;
};
