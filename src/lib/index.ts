export function add(num1: string, num2: string) {
  let sum = "";

  // check which number is greater, swap
  if (shouldSwapSmaller(num1, num2)) {
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

  let isNegative = false; // indicator for negative sign
  if (shouldSwapSmaller(num1, num2, true)) {
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

    // TODO: fix adding 0 at the end of number
    difference = digitDifference + difference;
  }

  return isNegative ? `-${difference}` : difference;
}

function shouldSwapSmaller(num1: string, num2: string, deepComparison = false) {
  // if num2 length is bigger than num1 we return early and should swap
  if (num2.length > num1.length) {
    return true;
  }

  // deepComparison check which string as number is bigger
  if (deepComparison && num2.length === num1.length) {
    for (let i = 0; i < num2.length; i++) {
      if (+num2[i] > +num1[i]) {
        return true;
      }
    }
  }

  return false;
}

function multiply(num1: string, num2: string) {
  // TODO: this is unbearable. write a clean code that humans can understand...
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

function divide() {
  let quotient = "";
  let reminder = "";
  return quotient;
}

export function phraseAnalysis(str: string): string {
  // TODO: rewrite whole function with better logic and fewer if statements
  if (!str.match(/[+/*(-)]/g)) return str;
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
  const thing = strArr.join("");

  if (str.indexOf("(") === -1) {
    return calcString(str);
  } else {
    return phraseAnalysis(thing);
  }
}

function calcString(str: string) {
  // TODO: rewrite whole function with better logic
  const noWsStr = str.replace(/\s/g, "");
  const operators = noWsStr.replace(/[\d]/g, "").split("");
  const operands = noWsStr.replace(/[+/*-]/g, "").split("");

  while (operators.includes("*")) {
    let opIndex = operators.indexOf("*");
    operands.splice(opIndex, 2, multiply(operands[opIndex], operands[opIndex + 1]));
    operators.splice(opIndex, 1);
  }

  let result = operands[0];
  for (let i = 0; i < operators.length; i++) {
    result = add(result, operands[i + 1]);
  }
  return result;
}

// What am I doing with my life !!?
