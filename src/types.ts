
export type PasteEventHandler<TEvent extends BaseClipboardEvent = any> = (event: TEvent, changeEventHandler: ChangeEventHandler) => void;

export type ChangeEventHandler<TEvent extends BaseChangeEvent = any> = (event: TEvent) => void;

export type ResolveMultipleDecimals = (value: string | number) => number;

export type BaseClipboardEvent = {
  clipboardData?: DataTransfer | null;
  preventDefault(): void;
  target: {
    selectionStart?: number;
    selectionEnd?: number;
    type?: string;
    value: string;
  };
};

export type BaseChangeEvent = {
  target: {
    value: string;
    name?: string;
  };
};