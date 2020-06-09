class User {
    constructor(name) {
        this._id = User.setId()
        this._name = name
        this._boughtServices = []
        this._phoneNubmer = null
    }
    static setId = (() => {
        let counter = 1
        return () => {
            return this.id ? this.id : counter++
        }
    })()
    get name() {
        return this._name
    }
    get id() {
        return this._id
    }
    get services() {
        return this._boughtServices
    }
    get phoneNumber() {
        return this._phoneNubmer
    }
    set phoneNumber(phoneNumber) {
        this._phoneNubmer = phoneNumber
    }

    removePhoneNumber() {
        this._phoneNubmer = null
    }

    removeService(service) {
        this._boughtServices.splice(this._boughtServices.indexOf(service), 1)
    }

    removeName() {
        this._name = null

    }

    buyService(service) {
        if (this._phoneNubmer === null) {
            throw new PhoneNumberError('Operations are forbidden without setting phone number')
        } else
        if (this._phoneNubmer.balance >= service.price) {
            this._boughtServices.push(service)
            this._phoneNubmer.withdrawBalance(service.price)
        } else {
            throw new LowBalanceError('Not enough balance to complete the operation')
        }
    }
}