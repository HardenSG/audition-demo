/**
 *  compose & pipe函数组合思想
 */

const add = (v) => v + 5;
const multi = (v) => v * 5;
const division = (v) => v / 5;
const subtraction = (v) => v - 5;

const pipe = (...func) => {
  const cb = (inp, fun) => {
    return fun(inp);
  };

  return (v) => {
    return func.reduce(cb, v);
  };
};

const compose = (...func) => {
  const cb = (inp, fun) => {
    return fun(inp);
  };

  return (v) => {
    return func.reduceRight(cb, v);
  };
};

const handleBaseData = pipe(
  multi,
  add,
  division,
  subtraction,
  add,
  add,
  subtraction
);
const resPipe = handleBaseData(10);
// console.log(resPipe);

const handleComposeData = compose(
  subtraction,
  add,
  add,
  subtraction,
  division,
  add,
  multi
);

const resCompose = handleComposeData(10);
// console.log(resCompose);