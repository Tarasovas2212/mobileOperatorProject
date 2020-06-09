const boughtServices = new List<IServiceable>();
const ihor = new User("Ihor", boughtServices);
const taras = new User("Taras", boughtServices);
const serg = new User("Serg", boughtServices);
const tatiana = new User("Tatiana", boughtServices);

const number1 = new PhoneNumber(935476644);
const number2 = new PhoneNumber(952822212);
const number3 = new PhoneNumber(505247000);
const number4 = new PhoneNumber(505009355);

const iphone = new Service("iPhone", 100);
const ipad = new Service("ipad", 200);
const macbook = new Service("macbook", 300);

const userList = new List<IUserable>();
const phoneNumberList = new List<IPhoneNumberable>();
const serviceList = new List<IServiceable>();
const usedPhoneNumberList = new List<IPhoneNumberable>();

userList.add(ihor);
userList.add(taras);
userList.add(serg);

phoneNumberList.add(number1);
phoneNumberList.add(number2);
phoneNumberList.add(number3);

serviceList.add(iphone);
serviceList.add(ipad);
serviceList.add(macbook);

const operator = new Operator(
  userList,
  phoneNumberList,
  usedPhoneNumberList,
  serviceList
);

operator.addUserToList(ihor);
operator.addUserToList(taras);
operator.addUserToList(serg);
operator.addUserToList(tatiana);

operator.addPhoneNumberToList(number1);
operator.addPhoneNumberToList(number2);
operator.addPhoneNumberToList(number3);
operator.addPhoneNumberToList(number4);

operator.addServiceToList(iphone);
operator.addServiceToList(ipad);
operator.addServiceToList(macbook);

operator.setPhoneNumberOfUserById(1, 935476644);
operator.setPhoneNumberOfUserById(2, 952822212);
operator.setPhoneNumberOfUserById(3, 505247000);
operator.setPhoneNumberOfUserById(4, 505009355);

if (ihor.phoneNumber !== null) {
  ihor.phoneNumber
    .addBalance(100)
    .then((response) => {
      console.log(response);
      if (taras.phoneNumber !== null) {
        return taras.phoneNumber.addBalance(200);
      }
    })
    .then((response) => {
      console.log(response);
      if (serg.phoneNumber !== null) {
        return serg.phoneNumber.addBalance(300);
      }
    })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
}
