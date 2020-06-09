class LowBalanceError extends Error {
    constructor(message) {
        super(message);
        this.name = "LowBalanceError"
    }
}