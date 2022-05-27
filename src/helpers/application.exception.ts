class ApplicationException extends Error {
  constructor(msg: string) {
    super(msg);

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ApplicationException.prototype);
  }
}
module.exports = ApplicationException;
