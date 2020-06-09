class Product implements IProduct { 
  private readonly _id: number;
  constructor(private _type: string, private _price: number) {
    this._id = Product.setId();
  }
  private static setId = (() => {
    let counter = 1;
    return () => {
      return counter++;
    };
  })();
  get id(): number {
    return this._id;
  }
  get type(): string {
    return this._type;
  }
  get price(): number {
    return this._price;
  }
}
