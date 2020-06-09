function Service(type, price) {
    this._id = Service.setId()
    this._type = type
    this._price = price

}
Service.setId = (function() {
    var counter = 1
    return function() {
        return this.id ? this.id : counter++
    }
})()

Service.prototype.getId = function() {
    return this._id
}
Service.prototype.getType = function() {
    return this._type
}
Service.prototype.getPrice = function() {
    return this._price
}