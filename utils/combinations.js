const combinations = [
  "000000",
  "000001",
  "000011",
  "000010",
  "000110",
  "000111",
  "000101",
  "000100",
  "001100",
  "001101",
  "001111",
  "001110",
  "001010",
  "001011",
  "001001",
  "001000",
  "011000",
  "011001",
  "011011",
  "011010",
  "011110",
  "011111",
  "011101",
  "011100",
  "010100",
  "010101",
  "010111",
  "010110",
  "010010",
  "010011",
  "010001",
  "010000",
  "110000",
  "110001",
  "110011",
  "110010",
  "110110",
  "110111",
  "110101",
  "110100",
  "111100",
  "111101",
  "111111",
  "111110",
  "111010",
  "111011",
  "111001",
  "111000",
  "101000",
  "101001",
  "101011",
  "101010",
  "101110",
  "101111",
  "101101",
  "101100",
  "100100",
  "100101",
  "100111",
  "100110",
  "100010",
  "100011",
  "100001",
  "100000",
];

export function generateGrayarr(n) {
  // base case
  if (n <= 0) return;

  // 'arr' will store all generated codes
  let arr = [];

  // start with one-bit pattern
  arr.push("0");
  arr.push("1");

  // Every iteration of this loop generates 2*i codes from previously
  // generated i codes.
  let i, j;
  for (i = 2; i < 1 << n; i = i << 1) {
    // Enter the previously generated codes again in arr[] in reverse
    // order. Nor arr[] has double number of codes.
    for (j = i - 1; j >= 0; j--) arr.push(arr[j]);

    // append 0 to the first half
    for (j = 0; j < i; j++) arr[j] = "0" + arr[j];

    // append 1 to the second half
    for (j = i; j < 2 * i; j++) arr[j] = "1" + arr[j];
  }
  return arr;
}
