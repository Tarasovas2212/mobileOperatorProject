interface IPhoneNumber {
  readonly id: number;
  balance: number;
  addBalance(amount: number): Promise<number>;
  withdrawBalance(amount: number): void;
}
