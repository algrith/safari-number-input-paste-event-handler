export type FormatNumberInputValue = (event: ClipboardEvent, changeHandler: ChangeHandler) => void;
export type ResolveMultipleDecimals = (value: string | number) => number;
export type ChangeHandler = (event: Event) =>void;