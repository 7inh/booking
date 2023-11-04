interface IGetUrlParams {
    key: string;
    value: React.ReactNode;
}

export const replaceStringToLink = ({
    str,
    replaceList,
}: {
    str: string;
    replaceList: IGetUrlParams[];
}): React.ReactNode => {
    return (
        <>
            {str.split(/(%\{.*?\})/).map((item) => {
                const isReplace = replaceList.find((replaceItem) => {
                    return item === `%{${replaceItem.key}}`;
                });
                if (isReplace) {
                    return isReplace.value;
                }
                return item;
            })}
        </>
    );
};
