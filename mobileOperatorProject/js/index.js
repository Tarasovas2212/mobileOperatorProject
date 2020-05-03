var ihor = new User('Ihor')
var taras = new User('Taras')
var serg = new User('Serg')
var tatiana = new User('Tatiana')

var number1 = new PhoneNumber(935476644)
var number2 = new PhoneNumber(952822212)
var number3 = new PhoneNumber(505247000)
var number4 = new PhoneNumber(505009355)

var iphone = new Service('iPhone', 100)
var ipad = new Service('ipad', 200)
var macbook = new Service('macbook', 300)

var operator = new Operator()

operator.addUserToList(ihor)
operator.addUserToList(taras)
operator.addUserToList(serg)
operator.addUserToList(tatiana)

operator.addPhoneNumberToList(number1)
operator.addPhoneNumberToList(number2)
operator.addPhoneNumberToList(number3)
operator.addPhoneNumberToList(number4)

operator.addServiceToList(iphone)
operator.addServiceToList(ipad)
operator.addServiceToList(macbook)

operator.setPhoneNumberOfUserById(1, 935476644)
operator.setPhoneNumberOfUserById(2, 952822212)
operator.setPhoneNumberOfUserById(3, 505247000)

operator.addBalanceToPhoneNumberOfUser(1, 100)