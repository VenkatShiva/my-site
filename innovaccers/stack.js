function Stack() {
  const stack = [];
  this.push = function (elem) {
    stack.push(elem);
  };
  this.pop = function () {
    return stack.pop();
  };
  this.print = function () {
    console.log(stack.join('-->'));
  };
  Object.defineProperty(this, 'top', {
    get: function () {
      return stack[stack.length - 1];
    },
  });
}

const Operators = '+-*/';

function evaluatePostFix(fix, post = true) {
  const stk = new Stack();
  // let inputs = input.split(',');
  let input = fix;
  if (post == false) {
    input = input.split('').reverse().join('');
  }
  for (char of input) {
    if (Operators.includes(char)) {
      let op2 = stk.pop();
      let op1 = stk.pop();
      if (post == false) {
        let temp = op1;
        op1 = op2;
        op2 = temp;
      }
      let output;
      switch (char) {
        case '+':
          output = op1 + op2;
          break;
        case '-':
          output = op1 - op2;
          break;
        case '*':
          output = op1 * op2;
          break;
        case '/':
          output = op1 / op2;
          break;
      }
      stk.push(output);
    } else {
      stk.push(parseInt(char));
    }
  }
  console.log('Resut is -->', stk.pop());
}
