class Operator {
  public constructor(
    private _userList: IListable<IUser>,
    private _phoneNumberList: IListable<IPhoneNumber>,
    private _usedPhoneNumberList: IListable<IPhoneNumber>,
    private _serviceList: IListable<IProduct>
  ) {}
  public get userList(): IListable<IUser> {
    return this._userList;
  }

  public get PhoneNumberList(): IListable<IPhoneNumber> {
    return this._phoneNumberList;
  }

  public get usedPhoneNumberList(): IListable<IPhoneNumber> {
    return this._usedPhoneNumberList;
  }

  public get servicesList(): IListable<IProduct> {
    return this._serviceList;
  }

  public getUserFromListById(id: number): IUser | null {
    return this._userList.getById(id);
  }

  public getPhoneNumberFromListById(id: number): IPhoneNumber | null {
    return this._phoneNumberList.getById(id);
  }

  public getUsedPhoneNumberFromListById(id: number): IPhoneNumber | null {
    return this._usedPhoneNumberList.getById(id);
  }

  public getServiceFromListById(id: number): IProduct | null {
    return this._serviceList.getById(id);
  }

  public setPhoneNumberOfUserById(userId: number, phoneNumberId: number): void {
    const user = this.getUserFromListById(userId);
    const number = this.getPhoneNumberFromListById(phoneNumberId);

    if (user && user.phoneNumber) {
      throw new PhoneNumberError(
        "Setting phone number for user is permitted only once"
      );
    }
    if (user && number) {
      if (this._usedPhoneNumberList.getById(phoneNumberId) !== null) {
        throw new PhoneNumberError(
          "This phone number is unawailable for setting"
        );
      }
      user.phoneNumber = number;
      this.addUsedPhoneNumberToList(number);
    }
  }

  public addUserToList(user: IUser): void {
    this._userList.add(user);
  }

  public addPhoneNumberToList(phoneNumber: IPhoneNumber): void {
    this._phoneNumberList.add(phoneNumber);
  }

  public addUsedPhoneNumberToList(phoneNumber: IPhoneNumber): void {
    this._usedPhoneNumberList.add(phoneNumber);
  }

  public addServiceToList(service: IProduct): void {
    this._serviceList.add(service);
  }

  public removeUserFromListById(id: number): void {
    return this._userList.removeById(id);
  }

  public removePhoneNumberFromListById(id: number): void {
    return this._phoneNumberList.removeById(id);
  }

  public removeServiceFromListById(id: number): void {
    return this._serviceList.removeById(id);
  }

  public removeUsedPhoneNumberFromListById(id: number): void {
    return this._usedPhoneNumberList.removeById(id);
  }

  public removePhoneNumberFromUser(userId: number): void {
    const user = this.getUserFromListById(userId);
    if (user && user.phoneNumber) {
      this.removeUsedPhoneNumberFromListById(user.phoneNumber.id);
      user.removePhoneNumber();
    }
  }

  public removeServiceFromServiceListOfUserById(
    userId: number,
    serviceId: number
  ): void {
    const user = this.getUserFromListById(userId);
    const service = this.getServiceFromListById(serviceId);
    if (user && service) {
      user.removeService(service);
    }
  }

  public addBalanceToPhoneNumberOfUser(userId: number, amount: number): void {
    const user = this.getUserFromListById(userId);
    if (user && user.phoneNumber) {
      user.phoneNumber.addBalance(amount);
    } else {
      console.log("User does not exist");
    }
  }

  public withdrowBalanceFromPhoneNumberOfUser(
    userId: number,
    amount: number
  ): void {
    const user = this.getUserFromListById(userId);
    if (user && user.phoneNumber) {
      user.phoneNumber.withdrawBalance(amount);
    }
  }

  public addServiceToServiceListOfUserById(
    userId: number,
    serviceId: number
  ): void {
    const user = this.getUserFromListById(userId);
    const service = this.getServiceFromListById(serviceId);
    if (user && service) {
      user.buyService(service);
    }
  }
}
