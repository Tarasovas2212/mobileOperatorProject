function PhoneNumberError(message) {
    Error.call(this)
    this.name = 'PhoneNumberError'
    this.message = message
}

PhoneNumberError.prototype = Object.create(Error.prototype)
PhoneNumberError.prototype.constructor = PhoneNumberError