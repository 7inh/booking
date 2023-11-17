import { Book, BookDetail } from "src/common/types";

export const book1: Book[] = [
    {
        id: "1",
        title: "Kyuu Tenshi",
        thumbnail: "https://picsum.photos/200/300",
        price: 100,
    },
    {
        id: "2",
        title: "Mei Kurokawa",
        thumbnail: "https://picsum.photos/200/400",
        price: 100,
    },
    {
        id: "3",
        title: "Pinku Bishoujo",
        thumbnail: "https://picsum.photos/300/300",
        price: 100,
    },
    {
        id: "4",
        title: "Neko Mimi",
        thumbnail: "https://picsum.photos/200/300",
        price: 100,
    },
    {
        id: "5",
        title: "Kyuu Tenshi",
        thumbnail: "https://picsum.photos/200/300",
        price: 100,
    },
    {
        id: "6",
        title: "Kyuu Tenshi",
        thumbnail: "https://picsum.photos/200/300",
        price: 100,
    },
    {
        id: "7",
        title: "Kyuu Tenshi",
        thumbnail: "https://picsum.photos/200/300",
        price: 100,
    },
    {
        id: "8",
        title: "Kyuu Tenshi",
        thumbnail: "https://picsum.photos/200/300",
        price: 100,
    },
];

export const book2: BookDetail = {
    id: "1",
    title: "Isekai Tensei Soudouki",
    thumbnail: "https://picsum.photos/200/300",
    price: 100000,
    description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum. Velit, quibusdam. Quisquam, voluptatum. Velit, quibusdam.",
    publisher: "Nhà xuất bản Kim Đồng",
    publishDate: "2021-01-01",
    language: "Tiếng Việt",
    format: "Bìa mềm",
    height: 20,
    width: 15,
    length: 2,
    weight: 0.5,
    quantity: 10,
    sold: 5,
    pages: 200,
    availability: "available",
    variant: "once",
    rare: "normal",
    author: "Mad Snail",
};
