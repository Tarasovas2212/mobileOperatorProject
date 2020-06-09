class PhoneNumberError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError"
    }
}