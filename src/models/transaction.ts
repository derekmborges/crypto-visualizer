
export interface Transaction {
    id: string;
    exchange: string;
    coin: string;
    amount: number;
    price: number;
}

export enum TransactionSize {
    MICRO = 0.000499,
    SMALL = 0.000999,
    MEDIUM = 0.00499,
    LARGE = 0.00999,
    XLARGE = 0.09,
    XXLARGE = 0.3
}
