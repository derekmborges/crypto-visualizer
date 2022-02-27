
# crypto-visualizer

Web app made with React to visualize cryptocurrency transactions across many exchanges.

## Week 1 Progress

### The data model that is expected for each cryptocurrency transaction

[`transaction.ts`](./transaction.ts):

```typescript
interface Transaction {
    exchange: string;
    coin: string;
    amount: number;
    price: number;
}
```

### Initial design of the desktop screens

Figma designs: [Crypto-Visualizer Designs](https://www.figma.com/file/inz7UtrzkbFjEoj34pa5i8/Crypto-Visualizer?node-id=0%3A1).
