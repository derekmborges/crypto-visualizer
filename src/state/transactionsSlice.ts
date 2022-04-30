import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Transaction } from "../models/transaction";
import { RootState } from "../store";

interface TransactionsState {
    value: Transaction[]
}

const initialState: TransactionsState = {
    value: []
}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            state.value.push(action.payload)
        },
        removeTransaction: (state, action: PayloadAction<string>) => {
            const i = state.value.findIndex(t => t.id === action.payload)
            if (i !== -1)  {
                state.value.splice(i, 1)
            }
        },
        clearTransactions: (state) => {
            state.value = []
        }
    }
})

export const { addTransaction, removeTransaction, clearTransactions } = transactionsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTransactions = (state: RootState) => state.transactions.value

export default transactionsSlice.reducer