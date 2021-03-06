function add(num1: string, num2: string) {
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
    a = parseInt(num1.charAt(num1.length - 1 - i));
    // get digit of num2 from right
    b = parseInt(num2.charAt(num2.length - 1 - i));
    // in case num2 is smaller than num1 -> 235 + 005 = 240
    b = b ? b : 0;
    temp = (carryNum + a + b).toString();
    digitSum = temp.charAt(temp.length - 1);
    carryNum = parseInt(temp.substr(0, temp.length - 1));
    carryNum = carryNum ? carryNum : 0;

    sum = i === num1.length - 1 ? temp + sum : digitSum + sum;
  }

  return sum;
}

function subtract(num1: string, num2: string) {
  let difference = "";

  let isNegative = false;
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
    a = parseInt(num1.charAt(num1.length - 1 - i));
    // get digit of num2 from right
    b = parseInt(num2.charAt(num2.length - 1 - i));
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
  const num1FirstDigit = parseInt(num1.charAt(num1.length - 1));
  const num2FirstDigit = parseInt(num2.charAt(num2.length - 1));

  // if num2 length is bigger than num1 we return early and should swap
  if (num2.length > num1.length) {
    return true;
  }

  // TODO: next line is buggy -> for in num2 from left to right. if even one digit is bigger return true
  if (deepComparison && num2.length === num1.length && num2FirstDigit > num1FirstDigit) {
    return true;
  }
}
