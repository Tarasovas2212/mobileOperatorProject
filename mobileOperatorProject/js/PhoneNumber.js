function PhoneNumber(id) {
    this._id = id
    this._balance = 0
    this._status = false
}


PhoneNumber.prototype.getId = function() {
    return this._id
}


PhoneNumber.prototype.getBalance = function() {
    return this._balance
}


PhoneNumber.prototype.getStatus = function() {
    return this._status
}


PhoneNumber.prototype.addBalance = function(money) {
    if (money > 0) {
        this._balance += money
    }
    if (this._balance > 0) {
        this._status = true
    }
}


PhoneNumber.prototype.withdrawBalance = function(money) {
    if (money > this._balance) {
        throw new LowBalanceError('Not enough balance to complete the operation')
    } else {
        this._balance -= money
        if (this._balance === 0) {
            this._status = false
        }
    }
}