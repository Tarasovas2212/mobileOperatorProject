class PhoneNumber implements IPhoneNumber {
  private _balance: number;
  private _status: string;
  public constructor(private readonly _id: number) {
    this._balance = 0;
    this._status = "disabled";
  }
  public get id(): number {
    return this._id;
  }
  public get balance(): number {
    return this._balance;
  }
  public get status(): string {
    return this._status;
  }

  public addBalance(amount: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        if (amount > 0) {
          this._balance += amount;
          this._status = "enabled";
          resolve(this._balance);
        } else {
          reject("You cannot add negative balance");
        }
      }, 3000);
    });
  }

  public withdrawBalance(amount: number): void {
    if (amount > this._balance) {
      throw new LowBalanceError("Not enough balance to complete the operation");
    } else {
      this._balance -= amount;
      if (this._balance === 0) {
        this._status = "disabled";
      }
    }
  }
}
