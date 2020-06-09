class LowBalanceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LowBalanceError";
  }
}
