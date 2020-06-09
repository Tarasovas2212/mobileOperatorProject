interface IUser {
  readonly id: number;
  readonly name: string;
  phoneNumber: null | IPhoneNumber;
  removePhoneNumber(): void;
  removeService(service: IProduct): void;
  removeName(): void;
  buyService(service: IProduct): void;
}
