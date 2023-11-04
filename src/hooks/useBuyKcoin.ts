import { doMutation } from "src/services/services";

export interface UseBuyKcoinProps {
    onError?: (error: any) => void;
}

const useBuyKcoin = ({ onError }: UseBuyKcoinProps) => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "tmp",
        action: "paymentLog",
        option: {
            onError: (error: any) => {
                onError?.(error);
            },
        },
    });

    return { mutateAsync, isLoading };
};

export default useBuyKcoin;
