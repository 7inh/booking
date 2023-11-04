import { doQuery } from "../services/services";

export interface UseGetCountTokensProps {
    file: File | null;
    fileName: string;
    onError?: (error: any) => void;
}

export interface UseGetCountTokensReturn {
    data: number;
    refetch: () => void;
}

const useGetCountTokens = ({
    file,
    fileName,
    onError,
}: UseGetCountTokensProps): UseGetCountTokensReturn => {
    const { data: response, refetch } = doQuery({
        entity: "reader",
        action: "countTokens",
        params: {
            file,
            fileName,
        },
        option: {
            enable: file !== null && Boolean(file),
            onError,
        },
    });

    if (response?.data) {
        const { data: countTokens } = response.data;

        return {
            data: countTokens.numOfTokens,
            refetch,
        };
    }

    return {
        data: -1,
        refetch,
    };
};

export default useGetCountTokens;
