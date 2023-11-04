import { getListPage } from "src/components/Paging/utils";

describe("getListPage", () => {
    it("should return an array of page numbers with padding", () => {
        const result = getListPage({ currentPage: 5, totalPages: 10 });
        expect(result).toEqual([1, "...", 3, 4, 5, 6, 7, "...", 10]);
    });

    it("should return an array of page numbers without padding", () => {
        const result = getListPage({ currentPage: 1, totalPages: 3 });
        expect(result).toEqual([1, 2, 3]);
    });

    it("should return an array of page numbers with padding at the beginning", () => {
        const result = getListPage({ currentPage: 2, totalPages: 5 });
        expect(result).toEqual([1, 2, 3, 4, 5]);
    });

    it("should return an array of page numbers with padding at the beginning", () => {
        const result = getListPage({ currentPage: 2, totalPages: 4 });
        expect(result).toEqual([1, 2, 3, 4]);
    });

    it("should return an array of page numbers with padding at the beginning", () => {
        const result = getListPage({ currentPage: 4, totalPages: 4 });
        expect(result).toEqual([1, 2, 3, 4]);
    });

    it("should return an array of page numbers with padding at the end", () => {
        const result = getListPage({ currentPage: 8, totalPages: 10 });
        expect(result).toEqual([1, "...", 6, 7, 8, 9, 10]);
    });

    it("should return an array of page numbers with padding at the beginning and end, with a small number of total pages", () => {
        const result = getListPage({ currentPage: 2, totalPages: 3 });
        expect(result).toEqual([1, 2, 3]);
    });

    it("should return an array of page numbers with padding at the beginning and end, with a small number of total pages and a current page of 1", () => {
        const result = getListPage({ currentPage: 1, totalPages: 3 });
        expect(result).toEqual([1, 2, 3]);
    });

    it("should return an array of page numbers with padding at the beginning and end, with a small number of total pages and a current page of 3", () => {
        const result = getListPage({ currentPage: 3, totalPages: 3 });
        expect(result).toEqual([1, 2, 3]);
    });

    it("should return an array of page numbers with padding at the beginning and end, with a current page of 1", () => {
        const result = getListPage({ currentPage: 1, totalPages: 10 });
        expect(result).toEqual([1, 2, 3, "...", 10]);
    });

    it("should return an array of page numbers with padding at the beginning and end, with a current page of 10", () => {
        const result = getListPage({ currentPage: 10, totalPages: 10 });
        expect(result).toEqual([1, "...", 8, 9, 10]);
    });

    it("should return an array of page numbers with padding at the beginning and end, with a current page of 6", () => {
        const result = getListPage({ currentPage: 6, totalPages: 10 });
        expect(result).toEqual([1, "...", 4, 5, 6, 7, 8, "...", 10]);
    });

    it("should return an array of page numbers with padding at the beginning and end, with a current page of 6", () => {
        const result = getListPage({ currentPage: 1, totalPages: 10 });
        expect(result).toEqual([1, 2, 3, "...", 10]);
    });
});
