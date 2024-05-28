export interface OrderListType {
  number: string;
  accountCode: string;
  type: string;
  court: string;
  causeNumber: string;
  plaintiffs: string[];
  defendants: string[];
  phoneNumber: string;
  phoneCode: string;
  startedAt: string;
  updatedAt: string;
  opEndAt: string;
  nopEndAt: string;
}

export interface OrderTableHeadCell {
  id: keyof OrderListType;
  label: string;
  numeric: boolean;
}

export type Order = "asc" | "desc";