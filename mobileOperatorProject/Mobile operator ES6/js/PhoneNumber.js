class PhoneNumber {
    constructor(id) {
        this._id = id
        this._balance = 0
        this._status = false
    }
    get id() {
        return this._id
    }
    get balance() {
        return this._balance
    }
    get status() {
        return this._status
    }

    addBalance(money) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (money > 0) {
                    this._balance += money
                    this._status = true
                    resolve(this._balance)
                } else {
                    reject('You cannot add negative balance')
                }
            }, 3000)
        })
    }


    withdrawBalance(money) {
        if (money > this._balance) {
            throw new LowBalanceError('Not enough balance to complete the operation')
        } else {
            this._balance -= money
            if (this._balance === 0) {
                this._status = false
            }
        }
    }
}