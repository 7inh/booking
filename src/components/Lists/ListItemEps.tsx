import { ItemEpsType } from "src/common/types";
import BoxBase from "src/components/Boxs/BoxBase";
import ItemEps from "src/components/Items/ItemEps";

export interface ListItemEpsProps {
    listItemEps: ItemEpsType[];
    selectedListItemEpsId?: string[];
    onToggleSelect?: (item: ItemEpsType, isSelected: boolean) => void;
    onPreview?: (item: ItemEpsType) => void;
}

const ListItemEps = ({
    listItemEps,
    selectedListItemEpsId = [],
    onToggleSelect,
    onPreview,
}: ListItemEpsProps) => {
    return (
        <BoxBase
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                    xl: "repeat(5, 1fr)",
                },
                gap: {
                    xs: 1,
                    sm: 1.5,
                },
            }}
        >
            {listItemEps.map((item) => {
                const isSelected = selectedListItemEpsId.includes(item.id);
                return (
                    <ItemEps
                        key={item.id}
                        itemEps={item}
                        isSelected={isSelected}
                        onClick={() => onToggleSelect?.(item, isSelected)}
                        onMouseEnter={() => onPreview?.(item)}
                    />
                );
            })}
        </BoxBase>
    );
};

export default ListItemEps;
