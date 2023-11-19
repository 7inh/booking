import { PAGE_MAX_WIDTH } from "src/common/const";
import BoxBase from "src/components/Boxs/BoxBase";
import Breadcrumb from "src/components/Breadcrumb/Breadcrumb";
import FormContact from "src/components/Forms/FormContact";
import useTranslation from "src/hooks/utils/useTranslation";

const Contact = () => {
    const t = useTranslation();
    return (
        <>
            <Breadcrumb
                links={[
                    {
                        name: t("pages.home.title"),
                        href: "/",
                    },
                    {
                        name: t("pages.contact.title"),
                        href: "/contact",
                    },
                ]}
            />
            <BoxBase
                sx={{
                    width: PAGE_MAX_WIDTH,
                    mx: "auto",
                }}
            >
                <BoxBase py={10} mx="auto" maxWidth="500px">
                    <FormContact />
                </BoxBase>
            </BoxBase>
        </>
    );
};

export default Contact;
