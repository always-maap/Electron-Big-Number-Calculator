function add(num1: string, num2: string) {
  let sum = "";

  // check which number is greater, swap
  if (isSecondBigger(num1, num2)) {
    [num2, num1] = [num1, num2];
  }

  let carryNum = 0; // number that is carried to next decimal place
  let a;
  let b;
  let temp;
  let digitSum;
  for (let i = 0; i < num1.length; i++) {
    // get digit of num1 from right
    a = +num1.charAt(num1.length - 1 - i);
    // get digit of num2 from right
    b = +num2.charAt(num2.length - 1 - i);
    b = b ? b : 0; // in case num2 is smaller than num1 -> 235 + 005 = 240

    temp = (carryNum + a + b).toString();
    digitSum = temp.charAt(temp.length - 1);
    carryNum = +temp.substr(0, temp.length - 1);
    carryNum = carryNum ? carryNum : 0;

    sum = i === num1.length - 1 ? temp + sum : digitSum + sum;
  }

  return sum;
}

function subtract(num1: string, num2: string) {
  let difference = "";

  if (num1 === "0" && num2 === "0") return "0";

  let isNegative = false; // indicator for negative sign
  if (isSecondBigger(num1, num2, true)) {
    [num2, num1] = [num1, num2];
    isNegative = true;
  }

  let carryNum = 0; // number that is carried to next decimal place
  let a;
  let b;
  let digitDifference;
  for (let i = 0; i < num1.length; i++) {
    // get digit of num1 from right
    a = +num1.charAt(num1.length - 1 - i);
    // get digit of num2 from right
    b = +num2.charAt(num2.length - 1 - i);
    b = b ? b : 0; // in case num2 is smaller than num1 -> 235 - 005 = 230

    if (carryNum !== 0) {
      a -= carryNum;
      carryNum = 0;
    }

    if (a < b) {
      a += 10;
      carryNum += 1;
    }

    digitDifference = (a - b).toString();
    difference = digitDifference + difference;
  }

  const removedZeroDifference = difference.replace(/^0+/, "");
  difference = removedZeroDifference === "" ? "0" : removedZeroDifference;
  return isNegative ? `-${difference}` : difference;
}

function multiply(num1: string, num2: string) {
  num1 = num1.replace(/^0+/, "");
  num2 = num2.replace(/^0+/, "");

  if (num1 === "0" || num2 === "0") return "0";

  let product = "";
  let i_th = 0;
  for (let i = 0; i < num2.length; i++) {
    let sum = "";
    for (let k = 0; k < i_th; k++) {
      sum = sum + "0";
    }
    let carry = 0;
    for (let j = 0; j < num1.length; j++) {
      const num = carry + +num2[num2.length - i - 1] * +num1.charAt(num1.length - j - 1);
      if (num >= 10 && j !== num1.length - 1) {
        carry = Math.floor(num / 10);
        sum = num - carry * 10 + sum;
      } else {
        sum = num.toString() + sum;
        carry = 0;
      }
    }
    i_th++;
    product = add(sum, product);
  }

  return product;
}

function divide(num: string, divisor: string, shouldReturnRemainder = false) {
  const originalNum = num;
  let quotient = "";
  let remainder = "";

  // early return when divisor is bigger, the remainder should be the number and the quotient should be '0'
  if (isSecondBigger(num, divisor, true)) {
    quotient = "0";
    return shouldReturnRemainder ? `q:${quotient}, r:${originalNum}` : quotient;
  }

  let firstTime = true;
  while (originalNum !== add(multiply(quotient, divisor), remainder)) {
    let numFromDigit = "";
    if (firstTime || remainder === "0") {
      numFromDigit = num.slice(0, 1);
    } else {
      for (let i = 0; isSecondBigger(numFromDigit, divisor, true); i++) {
        numFromDigit = num.slice(0, i);
      }
    }

    let factor = 1;
    while (!isSecondBigger(numFromDigit, multiply(divisor, factor.toString()), true)) {
      factor++;
    }
    factor--;

    quotient += factor.toString();
    remainder = subtract(numFromDigit, multiply(divisor, factor.toString()));

    num = remainder !== "0" ? remainder + num.slice(numFromDigit.length) : num.slice(numFromDigit.length);

    firstTime = false;
  }

  quotient = quotient.replace(/^0+/, "");
  return shouldReturnRemainder ? `q:${quotient}, r:${remainder}` : quotient;
}

function pow(base: string, exponent: string) {
  if (exponent === "0") return "1";
  let res = base;
  for (let i = 1; i < +exponent; i++) {
    res = multiply(res, base);
  }
  return res;
}

export function integral(phrase: string, upNum: string, bottomNum: string) {
  // replace x^a with x^a+1/a+1
  const analyzedPhrase = phrase.replace(/x\^(\d+)/g, (ـ, g2) => {
    const val = +g2 + 1;
    return `x^${+val}/${+val}`;
  });

  // calculate with up and bottom numbers
  const phraseReplacedUp = phraseAnalysis(analyzedPhrase.replaceAll("x", upNum));
  const phraseReplacedBottom = phraseAnalysis(analyzedPhrase.replaceAll("x", bottomNum));

  // subtract the boundaries should give us the approximately result
  return subtract(phraseReplacedUp, phraseReplacedBottom);
}

export function phraseAnalysis(str: string): string {
  if (!str.match(/[+^/*()-]/g)) return str;
  let strArr = str.split("").filter((i) => i !== " ");

  let startIdx = 0;
  let endIdx = 0;
  let subStr = "";
  for (let i = 0; i < strArr.length; i++) {
    if (strArr[i] === ")") {
      endIdx = i;
      break;
    }
    if (strArr[i] === "(") {
      startIdx = i;
      subStr = "";
    } else {
      subStr += strArr[i];
    }
  }
  const calculated = calcString(subStr);
  strArr.splice(startIdx, endIdx - startIdx + 1, calculated);

  if (str.indexOf("(") === -1) {
    return calcString(str);
  } else {
    return phraseAnalysis(strArr.join(""));
  }
}

function calcString(str: string) {
  const noWsStr = str.replace(/\s/g, "");
  const operands = noWsStr.split(/[+^/*-]/g);
  const operators = noWsStr.replace(/[\d]/g, "").split("");

  while (operators.includes("*")) {
    let opIndex = operators.indexOf("*");
    operands.splice(opIndex, 2, multiply(operands[opIndex], operands[opIndex + 1]));
    operators.splice(opIndex, 1);
  }

  while (operators.includes("^")) {
    let opIndex = operators.indexOf("^");
    operands.splice(opIndex, 2, pow(operands[opIndex], operands[opIndex + 1]));
    operators.splice(opIndex, 1);
  }

  while (operators.includes("/")) {
    let opIndex = operators.indexOf("/");
    operands.splice(opIndex, 2, divide(operands[opIndex], operands[opIndex + 1]));
    operators.splice(opIndex, 1);
  }

  let result = operands[0];
  for (let i = 0; i < operators.length; i++) {
    result = operators[i] === "+" ? add(result, operands[i + 1]) : subtract(result, operands[i + 1]);
  }
  return result;
}

function isSecondBigger(num1: string, num2: string, deepComparison = false) {
  num1 = num1.replace(/^0+/, "");
  // if num2 length is bigger than num1 we return early and should swap
  if (num2.length > num1.length) {
    return true;
  }

  // deepComparison check which string as number is bigger
  if (deepComparison && num2.length === num1.length) {
    for (let i = 0; i < num2.length; i++) {
      if (+num2[i] > +num1[i]) {
        return true;
      } else if (+num2[i] < +num1[i]) {
        return false;
      }
    }
  }

  return false;
}
