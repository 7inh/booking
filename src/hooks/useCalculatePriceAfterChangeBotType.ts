import { doMutation } from "src/services/services";

export interface UseBuyKcoinProps {
    onError?: (error: any) => void;
}

const useCalculatePriceAfterChangeBotType = ({ onError }: UseBuyKcoinProps) => {
    const { mutateAsync, isLoading } = doMutation({
        entity: "bot",
        action: "calculatePriceAfterChangeBotType",
        option: {
            onError: (error: any) => {
                onError?.(error);
            },
        },
    });

    return { mutateAsync, isLoading };
};

export default useCalculatePriceAfterChangeBotType;
