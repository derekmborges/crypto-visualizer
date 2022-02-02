
# crypto-visualizer

Web app made with React to visualize cryptocurrency transactions across many exchanges.

## Weekly Progress

### Week 1

#### The data model that is expected for each cryptocurrency transaction:

[`transaction.ts`](./transaction.ts):

```typescript
interface Transaction {
    exchange: string;
    coin: string;
    amount: number;
    price: number;
}
```

#### Initial design of the desktop screens

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Finz7UtrzkbFjEoj34pa5i8%2FCrypto-Visualizer%3Fnode-id%3D0%253A1" allowfullscreen></iframe>
