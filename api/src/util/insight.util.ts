export const INSIGHT_YEAR = 2021;

export const bestDifferenceIndex = (arr: number[]): number => {
  // Finds the index with best absolute difference from the number at 0th index
  if (arr.length < 2) throw "Error: Array cannot be less than 1";
  let bestIndex = 1;
  let highestDifference = Math.abs(arr[1] - arr[0]);

  for (let i = 2; i < arr.length; ++i) {
    const currentDifference = Math.abs(arr[i] - arr[0]);
    if (currentDifference > highestDifference) {
      highestDifference = currentDifference;
      bestIndex = i;
    }
  }

  return bestIndex;
};

export const humanizeAmounts = (amount: number): string => {
  const length = ("" + Math.round(amount)).length;

  if (length < 4) {
    // No change
    return "" + Math.round(amount);
  }

  if (length < 6) {
    // Return as K
    let newAmount = amount / 1000;
    newAmount = Math.round(newAmount * 10) / 10;
    return "" + newAmount + "K";
  }

  if (length < 8) {
    // Return as Lakhs
    let newAmount = amount / 100000;
    newAmount = Math.round(newAmount * 10) / 10;
    return "" + newAmount + " Lakhs";
  }

  // Return as Crores
  let newAmount = amount / 10000000;
  newAmount = Math.round(newAmount * 10) / 10;
  return "" + newAmount + " Crores";
};
