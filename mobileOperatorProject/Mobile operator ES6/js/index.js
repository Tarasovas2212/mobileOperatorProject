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


ihor.phoneNumber.addBalance(100)
    .then(response => {
        console.log(response)
        return taras.phoneNumber.addBalance(200)
    })
    .then(response => {
        console.log(response)
        return serg.phoneNumber.addBalance(300)
    })
    .then(response => console.log(response))
    .catch(err => console.log(err))

// const func = async() => {
//     try {
//         let first = await ihor.phoneNumber.addBalance(100)
//         console.log(first)

//         let second = await taras.phoneNumber.addBalance(200)
//         console.log(second)

//         let third = await serg.phoneNumber.addBalance(300)
//         console.log(third)
//     } catch (err) {
//         console.log(err)
//     }
// }

// func()