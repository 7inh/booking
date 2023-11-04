import { CircularProgress, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { memo, useLayoutEffect, useState } from "react";
import useGetOrganizeJoined from "src/hooks/useGetOrganizeJoined";

export interface SelectOrganizeProps {
    onChange: (organizeId: string) => void;
}

const SelectOrganize = ({ onChange }: SelectOrganizeProps) => {
    const [orgId, setOrgId] = useState("");

    const { data: joined = [] } = useGetOrganizeJoined();

    const handleChange = (event: SelectChangeEvent) => {
        const newOrgId = event.target.value as string;
        setOrgId(newOrgId);
        onChange(newOrgId);
    };

    useLayoutEffect(() => {
        if (joined.length > 0 && orgId === "") {
            const newOrgId = joined[0].organizeId;
            setOrgId(newOrgId);
            onChange(newOrgId);
        }
    }, [orgId, joined, onChange]);

    return orgId === "" ? (
        <CircularProgress size={24} />
    ) : (
        <Select fullWidth value={orgId} onChange={handleChange} size="small">
            {joined.map((organize: any) => (
                <MenuItem key={organize.organizeId} value={organize.organizeId}>
                    {organize.name}
                </MenuItem>
            ))}
        </Select>
    );
};

export default memo(SelectOrganize);
