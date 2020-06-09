const ihor = new User('Ihor')
const taras = new User('Taras')
const serg = new User('Serg')
const tatiana = new User('Tatiana')

const number1 = new PhoneNumber(935476644)
const number2 = new PhoneNumber(952822212)
const number3 = new PhoneNumber(505247000)
const number4 = new PhoneNumber(505009355)

const iphone = new Service('iPhone', 100)
const ipad = new Service('ipad', 200)
const macbook = new Service('macbook', 300)

const operator = new Operator()

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
operator.setPhoneNumberOfUserById(4, 505009355)


ihor.getPhoneNumber().addBalance(100, function(err, data) {
    if (err) {
        console.log('error')
    } else {
        console.log(`Operation successful for Ihor. His balance is now: ${data}$`)
    }
    taras.getPhoneNumber().addBalance(200, (err, data) => {
        if (err) {
            console.log('error')
        } else {
            console.log(`Operation successful for Taras. His balance is now: ${data}$`)
        }
        serg.getPhoneNumber().addBalance(300, (err, data) => {
            if (err) {
                console.log('error')
            } else {
                console.log(`Operation successful for Serg. His balance is now: ${data}$`)
            }

        })
    })
})