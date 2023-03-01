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
