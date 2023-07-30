export const randomNumber = (digit: any) => {
  if (digit === 1) {
    return Math.floor(Math.random() * 10 + 1);
  } else if (digit === 2) {
    return Math.floor(Math.random() * 100 + 1);
  } else if (digit === 3) {
    return Math.floor(Math.random() * 1000 + 1);
  }
};
