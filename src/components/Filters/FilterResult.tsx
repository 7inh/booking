import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import BoxBase from "src/components/Boxs/BoxBase";
import ListBook from "src/components/Lists/ListBook";
import { book1 } from "src/test-utils/mocks/books";

const FilterResult = () => {
    const books = book1;

    return (
        <BoxBase height="100%" flexGrow={1}>
            <ViewModuleIcon />
            <ViewListIcon />

            <ListBook books={books} />
        </BoxBase>
    );
};

export default FilterResult;
