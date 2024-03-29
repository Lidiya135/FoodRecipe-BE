const response = (res, statusCode, status, result, message) => {
    const printResult = {};
    printResult.success = status;
    printResult.statusCode = statusCode;
    printResult.data = result || null;
    printResult.message = message || null;
    res.status(statusCode).json(printResult);
  };

  const resp = (res, statusCode, status, message) => {
    const printResult = {};
    printResult.success = status;
    printResult.statusCode = statusCode;
    printResult.message = message || null;
    res.status(statusCode).json(printResult);
  };
  
  module.exports = { response,  resp };