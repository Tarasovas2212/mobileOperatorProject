"use strict";
class List {
    constructor() {
        this.list = [];
    }
    add(item) {
        this.list.push(item);
    }
    get(index) {
        if (this.list[index] == undefined) {
            return null;
        }
        else {
            return this.list[index];
        }
    }
    getById(id) {
        const searchItem = this.list.find((item) => {
            return item.id === id;
        });
        if (searchItem == undefined) {
            return null;
        }
        else {
            return searchItem;
        }
    }
    toArray() {
        return this.list;
    }
    clear() {
        this.list = [];
    }
    size() {
        return this.list.length;
    }
    removeById(index) {
        const item = this.getById(index);
        if (item !== null)
            this.list.splice(this.list.indexOf(item), 1);
    }
    remove(index) {
        if (index > 0)
            this.list.splice(index, 1);
    }
}
class LowBalanceError extends Error {
    constructor(message) {
        super(message);
        this.name = "LowBalanceError";
    }
}
class Operator {
    constructor(userList, phoneNumberList, usedPhoneNumberList, serviceList) {
        this._userList = userList;
        this._phoneNumberList = phoneNumberList;
        this._usedPhoneNumberList = usedPhoneNumberList;
        this._serviceList = serviceList;
    }
    get userList() {
        return this._userList;
    }
    get PhoneNumberList() {
        return this._phoneNumberList;
    }
    get usedPhoneNumberList() {
        return this._usedPhoneNumberList;
    }
    get servicesList() {
        return this._serviceList;
    }
    getUserFromListById(id) {
        return this._userList.getById(id);
    }
    getPhoneNumberFromListById(id) {
        return this._phoneNumberList.getById(id);
    }
    getUsedPhoneNumberFromListById(id) {
        return this._usedPhoneNumberList.getById(id);
    }
    getServiceFromListById(id) {
        return this._serviceList.getById(id);
    }
    setPhoneNumberOfUserById(userId, phoneNumberId) {
        const user = this.getUserFromListById(userId);
        const number = this.getPhoneNumberFromListById(phoneNumberId);
        if (user && number) {
            if (user.phoneNumber) {
                throw new PhoneNumberError("Setting phone number for user is permitted only once");
            }
            if (this._usedPhoneNumberList.getById(phoneNumberId) !== null) {
                throw new PhoneNumberError("This phone number is unawailable for setting");
            }
            user.phoneNumber = number;
            this.addUsedPhoneNumberToList(number);
        }
    }
    addUserToList(user) {
        this._userList.add(user);
    }
    addPhoneNumberToList(phoneNumber) {
        this._phoneNumberList.add(phoneNumber);
    }
    addUsedPhoneNumberToList(phoneNumber) {
        this._usedPhoneNumberList.add(phoneNumber);
    }
    addServiceToList(service) {
        this._serviceList.add(service);
    }
    removeUserFromListById(id) {
        return this._userList.removeById(id);
    }
    removePhoneNumberFromListById(id) {
        return this._phoneNumberList.removeById(id);
    }
    removeServiceFromListById(id) {
        return this._serviceList.removeById(id);
    }
    removeUsedPhoneNumberFromListById(id) {
        return this._usedPhoneNumberList.removeById(id);
    }
    removePhoneNumberFromUser(userId) {
        const user = this.getUserFromListById(userId);
        if (user && user.phoneNumber) {
            this.removeUsedPhoneNumberFromListById(user.phoneNumber.id);
            user.removePhoneNumber();
        }
    }
    removeServiceFromServiceListOfUserById(userId, serviceId) {
        const user = this.getUserFromListById(userId);
        const service = this.getServiceFromListById(serviceId);
        if (user && service) {
            user.removeService(service);
        }
    }
    addBalanceToPhoneNumberOfUser(userId, amount) {
        const user = this.getUserFromListById(userId);
        if (user && user.phoneNumber) {
            if (user) {
                user.phoneNumber.addBalance(amount);
            }
            else {
                console.log("User does not exist");
            }
        }
    }
    withdrowBalanceFromPhoneNumberOfUser(userId, amount) {
        const user = this.getUserFromListById(userId);
        if (user && user.phoneNumber)
            user.phoneNumber.withdrawBalance(amount);
    }
    addServiceToServiceListOfUserById(userId, serviceId) {
        const user = this.getUserFromListById(userId);
        const service = this.getServiceFromListById(serviceId);
        if (user && service) {
            user.buyService(service);
        }
    }
}
class PhoneNumber {
    constructor(id) {
        this._id = id;
        this._balance = 0;
        this._status = false;
    }
    get id() {
        return this._id;
    }
    get balance() {
        return this._balance;
    }
    get status() {
        return this._status;
    }
    addBalance(amount) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (amount > 0) {
                    this._balance += amount;
                    this._status = true;
                    resolve(this._balance);
                }
                else {
                    reject("You cannot add negative balance");
                }
            }, 3000);
        });
    }
    withdrawBalance(amount) {
        if (amount > this._balance) {
            throw new LowBalanceError("Not enough balance to complete the operation");
        }
        else {
            this._balance -= amount;
            if (this._balance === 0) {
                this._status = false;
            }
        }
    }
}
class PhoneNumberError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}
let Service = /** @class */ (() => {
    class Service {
        constructor(type, price) {
            this._id = Service.setId();
            this._type = type;
            this._price = price;
        }
        get id() {
            return this._id;
        }
        get type() {
            return this._type;
        }
        get price() {
            return this._price;
        }
    }
    Service.setId = (() => {
        let counter = 1;
        return () => {
            return counter++;
        };
    })();
    return Service;
})();
let User = /** @class */ (() => {
    class User {
        constructor(name, boughtServices) {
            this._id = User.setId();
            this._name = name;
            this._boughtServices = boughtServices;
            this._phoneNubmer = null;
        }
        get name() {
            return this._name;
        }
        get id() {
            return this._id;
        }
        get services() {
            return this._boughtServices;
        }
        get phoneNumber() {
            return this._phoneNubmer;
        }
        set phoneNumber(phoneNumber) {
            this._phoneNubmer = phoneNumber;
        }
        removePhoneNumber() {
            this._phoneNubmer = null;
        }
        removeService(service) {
            this._boughtServices
                .toArray()
                .splice(this._boughtServices.toArray().indexOf(service), 1);
        }
        removeName() {
            this._name = "";
        }
        buyService(service) {
            if (this._phoneNubmer === null) {
                throw new PhoneNumberError("Operations are forbidden without setting phone number");
            }
            else if (this._phoneNubmer.balance >= service.price) {
                this._boughtServices.add(service);
                this._phoneNubmer.withdrawBalance(service.price);
            }
            else {
                throw new LowBalanceError("Not enough balance to complete the operation");
            }
        }
    }
    User.setId = (() => {
        let counter = 1;
        return () => {
            return counter++;
        };
    })();
    return User;
})();
const boughtServices = new List();
const ihor = new User("Ihor", boughtServices);
const taras = new User("Taras", boughtServices);
const serg = new User("Serg", boughtServices);
const tatiana = new User("Tatiana", boughtServices);
const number1 = new PhoneNumber(935476644);
const number2 = new PhoneNumber(952822212);
const number3 = new PhoneNumber(505247000);
const number4 = new PhoneNumber(505009355);
const iphone = new Service("iPhone", 100);
const ipad = new Service("ipad", 200);
const macbook = new Service("macbook", 300);
const userList = new List();
const phoneNumberList = new List();
const serviceList = new List();
const usedPhoneNumberList = new List();
userList.add(ihor);
userList.add(taras);
userList.add(serg);
phoneNumberList.add(number1);
phoneNumberList.add(number2);
phoneNumberList.add(number3);
serviceList.add(iphone);
serviceList.add(ipad);
serviceList.add(macbook);
const operator = new Operator(userList, phoneNumberList, usedPhoneNumberList, serviceList);
operator.addUserToList(ihor);
operator.addUserToList(taras);
operator.addUserToList(serg);
operator.addUserToList(tatiana);
operator.addPhoneNumberToList(number1);
operator.addPhoneNumberToList(number2);
operator.addPhoneNumberToList(number3);
operator.addPhoneNumberToList(number4);
operator.addServiceToList(iphone);
operator.addServiceToList(ipad);
operator.addServiceToList(macbook);
operator.setPhoneNumberOfUserById(1, 935476644);
operator.setPhoneNumberOfUserById(2, 952822212);
operator.setPhoneNumberOfUserById(3, 505247000);
operator.setPhoneNumberOfUserById(4, 505009355);
if (ihor.phoneNumber !== null) {
    ihor.phoneNumber
        .addBalance(100)
        .then((response) => {
        console.log(response);
        if (taras.phoneNumber !== null) {
            return taras.phoneNumber.addBalance(200);
        }
    })
        .then((response) => {
        console.log(response);
        if (serg.phoneNumber !== null) {
            return serg.phoneNumber.addBalance(300);
        }
    })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
}
//# sourceMappingURL=main.js.map