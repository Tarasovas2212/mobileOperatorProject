function LowBalanceError(message) {
    Error.call(this)
    this.name = 'LowBalanceError'
    this.message = message
}

LowBalanceError.prototype = Object.create(Error.prototype)
LowBalanceError.prototype.constructor = LowBalanceError