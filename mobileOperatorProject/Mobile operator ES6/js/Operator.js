class Operator {
    constructor() {
        this._userList = []
        this._phoneNumberList = []
        this._usedPhoneNumberList = []
        this._serviceList = []
    }
    get userList() {
        return this._userList
    }

    get PhoneNumberList() {
        return this._phoneNumberList
    }

    get usedPhoneNumberList() {
        return this_usedPhoneNumberList
    }

    get servicesList() {
        return this._serviceList
    }

    _getItemById(id, list) {
        return list.find((item) => {
            return item.id === id
        })
    }

    getUserFromListById(id) {
        return this._getItemById(id, this._userList)
    }

    getPhoneNumberFromListById(id) {
        return this._getItemById(id, this._phoneNumberList)
    }

    getUsedPhoneNumberFromListById(id) {
        return this._getItemById(id, this._usedPhoneNumberList)
    }

    getServiceFromListById(id) {
        return this._getItemById(id, this._serviceList)
    }
    setPhoneNumberOfUserById(userId, phoneNumberId) {
        const user = this.getUserFromListById(userId)
        const number = this.getPhoneNumberFromListById(phoneNumberId)
        if (user.phoneNumber) {
            throw new PhoneNumberError('Setting phone number for user is permitted only once')
        }
        if (this._usedPhoneNumberList.includes(this.getUsedPhoneNumberFromListById(phoneNumberId))) {
            throw new PhoneNumberError('This phone number is unawailable for setting')
        }
        user.phoneNumber = number
        this.addUsedPhoneNumberToList(number)
    }

    addUserToList(user) {
        this._userList.push(user)
    }

    addPhoneNumberToList(phoneNumber) {
        this._phoneNumberList.push(phoneNumber)
    }

    addUsedPhoneNumberToList(phoneNumber) {
        this._usedPhoneNumberList.push(phoneNumber)
    }

    addServiceToList(service) {
        this._serviceList.push(service)
    }
    _removeItemById(id, list) {
        const item = this._getItemById(id, list)
        return list.splice(list.indexOf(item), 1)
    }
    removeUserFromListById(id) {
        return this._removeItemById(id, this._userList)
    }


    removePhoneNumberFromListById(id) {
        return this._removeItemById(id, this._phoneNumberList)
    }


    removeServiceFromListById(id) {
        return this._removeItemById(id, this._serviceList)
    }


    removeUsedPhoneNumberFromListById(id) {
        return this._removeItemById(id, this._usedPhoneNumberList)
    }
    removePhoneNumberFromUser(userId) {
        const user = this.getUserFromListById(userId)
        const phoneNumberToRemove = user.phoneNumber
        this.removeUsedPhoneNumberFromListById(phoneNumberToRemove.id)
        user.removePhoneNumber()
    }

    removeServiceFromServiceListOfUserById(userId, serviceId) {
        const user = this.getUserFromListById(userId)
        const service = this.getServiceFromListById(serviceId)
        user.removeService(service)
    }

    addBalanceToPhoneNumberOfUser(userId, money) {
        const user = this.getUserFromListById(userId)
        if (user) {
            user.phoneNumber.addBalance(money)
        } else {
            console.log('User does not exist')
        }
    }

    withdrowBalanceFromPhoneNumberOfUser(userId, money) {
        const user = this.getUserFromListById(userId)
        user.phoneNumber.withdrawBalance(money)
    }

    addServiceToServiceListOfUserById(userId, serviceId) {
        const user = this.getUserFromListById(userId)
        const service = this.getServiceFromListById(serviceId)
        user.buyService(service)
    }
}