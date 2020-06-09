function User(name) {
    this._id = User.setId()
    this._name = name
    this._boughtServices = []
    this._phoneNubmer = null
}
User.setId = (function() {
    var counter = 1
    return function() {
        return this.id ? this.id : counter++
    }
})()

User.prototype.getName = function() {
    return this._name
}


User.prototype.getId = function() {
    return this._id
}


User.prototype.getServices = function() {
    return this._boughtServices
}


User.prototype.getPhoneNumber = function() {
    return this._phoneNubmer
}

User.prototype.setPhoneNumber = function(phoneNumber) {
    this._phoneNubmer = phoneNumber
}


User.prototype.removePhoneNumber = function() {
    this._phoneNubmer = null
}


User.prototype.removeService = function(service) {
    this._boughtServices.splice(this._boughtServices.indexOf(service), 1)
}


User.prototype.removeName = function() {
    this._name = null
}


User.prototype.buyService = function(service) {
    if (this._phoneNubmer === null) {
        throw new PhoneNumberError('Operations are forbidden without setting phone number')
    } else
    if (this._phoneNubmer.getBalance() >= service.getPrice()) {
        this._boughtServices.push(service)
        this._phoneNubmer.withdrawBalance(service.getPrice())
    } else {
        throw new LowBalanceError('Not enough balance to complete the operation')
    }
}