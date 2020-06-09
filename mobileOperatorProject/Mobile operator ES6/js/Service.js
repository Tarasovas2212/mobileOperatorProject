class Service {
    constructor(type, price) {
        this._id = Service.setId()
        this._type = type
        this._price = price
    }
    static setId = (() => {
        let counter = 1
        return () => {
            return this.id ? this.id : counter++
        }
    })()
    get id() {
        return this._id
    }
    get type() {
        return this._type
    }
    get price() {
        return this._price
    }

}