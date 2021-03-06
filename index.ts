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
