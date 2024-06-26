import CollectionBase from "src/components/Boardcasts.tsx/Collection/CollectionBase";
import useGetComingSoon from "src/hooks/useGetComingSoon";
import useTranslation from "src/hooks/utils/useTranslation";

const UpcomingCollection = () => {
    const t = useTranslation();

    const { data: books, isFetched } = useGetComingSoon({});

    return (
        <CollectionBase
            books={books}
            title={t("broadcast.upcomingCollection.title")}
            subTitle={t("broadcast.upcomingCollection.subTitle")}
            hidden={!isFetched || !books.length}
        />
    );
};

export default UpcomingCollection;
