import CollectionBase from "src/components/Boardcasts.tsx/Collection/CollectionBase";
import useGetPopular from "src/hooks/useGetPopular";
import useTranslation from "src/hooks/utils/useTranslation";

const PopularCollection = () => {
    const t = useTranslation();

    const { data: books } = useGetPopular({});

    return (
        <CollectionBase
            books={books}
            title={t("broadcast.popularCollection.title")}
            subTitle={t("broadcast.popularCollection.subTitle")}
        />
    );
};

export default PopularCollection;
