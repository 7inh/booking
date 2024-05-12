import CollectionBase from "src/components/Boardcasts.tsx/Collection/CollectionBase";
import useGetNewest from "src/hooks/useGetNewest";
import useTranslation from "src/hooks/utils/useTranslation";

const NewestCollection = () => {
    const t = useTranslation();

    const { data: books, isFetched } = useGetNewest({});

    return (
        <CollectionBase
            books={books}
            title={t("broadcast.newestCollection.title")}
            subTitle={t("broadcast.newestCollection.subTitle")}
            hidden={!isFetched || !books.length}
        />
    );
};

export default NewestCollection;
