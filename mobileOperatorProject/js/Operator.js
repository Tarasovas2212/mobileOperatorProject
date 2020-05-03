function Operator() {
    this._userList = []
    this._phoneNumberList = []
    this._usedPhoneNumberList = []
    this._serviceList = []
    this._name = null
}

Operator.prototype._getItemById = function(id, list) {
    return list.find(function(item) {
        return item.getId() === id
    })
}


Operator.prototype.getUserList = function() {
    return this._userList
}


Operator.prototype.getPhoneNumberList = function() {
    return this._phoneNumberList
}


Operator.prototype.getUsedPhoneNumberList = function() {
    return this_usedPhoneNumberList
}


Operator.prototype.getServicesList = function() {
    return this._serviceList
}

Operator.prototype.getUserFromListById = function(id) {
    return this._getItemById(id, this._userList)
}


Operator.prototype.getPhoneNumberFromListById = function(id) {
    return this._getItemById(id, this._phoneNumberList)
}


Operator.prototype.getUsedPhoneNumberFromListById = function(id) {
    return this._getItemById(id, this._usedPhoneNumberList)
}


Operator.prototype.getServiceFromListById = function(id) {
    return this._getItemById(id, this._serviceList)
}


Operator.prototype.addUserToList = function(user) {
    this._userList.push(user)
}


Operator.prototype.addPhoneNumberToList = function(phoneNumber) {
    this._phoneNumberList.push(phoneNumber)
}


Operator.prototype.addUsedPhoneNumberToList = function(phoneNumber) {
    this._usedPhoneNumberList.push(phoneNumber)
}


Operator.prototype.addServiceToList = function(service) {
    this._serviceList.push(service)
}


Operator.prototype._removeItemById = function(id, list) {
    var item = this._getItemById(id, list)
    return list.splice(list.indexOf(item), 1)
}


Operator.prototype.removeUserFromListById = function(id) {
    return this._removeItemById(id, this._userList)
}


Operator.prototype.removePhoneNumberFromListById = function(id) {
    return this._removeItemById(id, this._phoneNumberList)
}


Operator.prototype.removeServiceFromListById = function(id) {
    return this._removeItemById(id, this._serviceList)
}


Operator.prototype.removeUsedPhoneNumberFromListById = function(id) {
    return this._removeItemById(id, this._usedPhoneNumberList)
}


Operator.prototype.removeNameOfUser = function(userId, name, callback) {
    var user = this.getUserFromListById(userId)
    setTimeout(function() {
        user.removeName(name, setTimeout(function() {
            callback(userId)
        }.bind(this), 3000))
    }.bind(this), 2000)
}

//function(){
// removePhoneNumberFromUser(userdId)
// } используем для callback2

Operator.prototype.removePhoneNumberFromUser = function(userId) {
    setTimeout(function() {
        var user = this.getUserFromListById(userId)
        var phoneNumberToRemove = user.getPhoneNumber()
        this.removeUsedPhoneNumberFromListById(phoneNumberToRemove.getId())
        user.removePhoneNumber()
        console.log('The phone number has been removed')
    }.bind(this), 1000)
}


Operator.prototype.removeServiceFromServiceListOfUserById = function(userId, serviceId) {
    var user = this.getUserFromListById(userId)
    var service = this.getServiceFromListById(serviceId)
    user.removeService(service)
}


Operator.prototype.setPhoneNumberOfUserById = function(userId, phoneNumberId) {
    var user = this.getUserFromListById(userId)
    var phoneNumber = this.getPhoneNumberFromListById(phoneNumberId)
    if (user.getPhoneNumber()) {
        throw new PhoneNumberError('Setting phone number for user is permitted only once')
    }
    if (this._usedPhoneNumberList.includes(this.getUsedPhoneNumberFromListById(phoneNumberId))) {
        throw new PhoneNumberError('This phone number is unawailable for setting')
    }
    user.setPhoneNumber(phoneNumber)
    this.addUsedPhoneNumberToList(phoneNumber)
}





Operator.prototype.addBalanceToPhoneNumberOfUser = function(userId, money) {
    var user = this.getUserFromListById(userId)
    user.getPhoneNumber().addBalance(money)
}


Operator.prototype.withdrowBalanceFromPhoneNumberOfUser = function(userId, money) {
    var user = this.getUserFromListById(userId)
    user.getPhoneNumber().withdrawBalance(money)
}


Operator.prototype.addServiceToServiceListOfUserById = function(userId, serviceId) {
    var user = this.getUserFromListById(userId)
    var service = this.getServiceFromListById(serviceId)
    user.buyService(service)
}