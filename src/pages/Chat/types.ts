export type FormValuesProps = {
    tags: string[];
    orgs: any[];
    groups: any[];
    botSource: BOT_SOURCE_OPTION | null;
};

export const defaultValues: FormValuesProps = {
    tags: [],
    orgs: [],
    groups: [],
    botSource: null,
};

export enum BOT_SOURCE {
    OWNER = "OWNER",
    KAMI_STORE = "KAMI_STORE",
    WORKSPACE = "WORKSPACE",
}

export type BOT_SOURCE_TYPE = keyof typeof BOT_SOURCE;

export type BOT_SOURCE_OPTION = {
    id: string;
    label: string;
    value: BOT_SOURCE_TYPE;
};
