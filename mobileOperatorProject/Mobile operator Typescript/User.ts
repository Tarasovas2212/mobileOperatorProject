class User implements IUser {
  private readonly _id: number;
  private _phoneNumber: null | IPhoneNumber;
  constructor(
    private _name: string,
    private _boughtServices: IListable<IProduct>
  ) {
    this._id = User.setId();
    this._phoneNumber = null;
  }

  private static setId = (() => {
    let counter = 1;
    return () => {
      return counter++;
    };
  })();
  public get name(): string {
    return this._name;
  }
  public get id(): number {
    return this._id;
  }
  public get services(): IListable<IProduct> {
    return this._boughtServices;
  }
  public get phoneNumber(): null | IPhoneNumber {
    return this._phoneNumber;
  }
  public set phoneNumber(phoneNumber: null | IPhoneNumber) {
    this._phoneNumber = phoneNumber;
  }

  public removePhoneNumber(): void {
    this._phoneNumber = null;
  }

  public removeService(service: IProduct): void {
    this._boughtServices
      .toArray()
      .splice(this._boughtServices.toArray().indexOf(service), 1);
  }

  public removeName(): void {
    this._name = "";
  }

  public buyService(service: IProduct): void {
    if (this._phoneNumber === null) {
      throw new PhoneNumberError(
        "Operations are forbidden without setting phone number"
      );
    } else if (this._phoneNumber.balance >= service.price) {
      this._boughtServices.add(service);
      this._phoneNumber.withdrawBalance(service.price);
    } else {
      throw new LowBalanceError("Not enough balance to complete the operation");
    }
  }
}
