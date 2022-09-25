// const tileset = { // [quantity, points]
//     'blank' : {'pts': 0, 'qty': 2}
// };

/*
0 Points - Blank tile.
1 Point - A, E, I, L, N, O, R, S, T and U.
2 Points - D and G.
3 Points - B, C, M and P.
4 Points - F, H, V, W and Y.
5 Points - K.
8 Points - J and X.
10 Points - Q and Z.
numbers
A-9, 
B-2, 
C-2, 
D-4, 
E-12, 
F-2, 
G-3, 
H-2, 
I-9, 
J-1, 
K-1, 
L-4, 
M-2, 
N-6, 
O-8, 
P-2, 
Q-1, 
R-6, 
S-4, 
T-6, 
U-4, 
V-2, 
W-2, 
X-1, 
Y-2, 
Z-1
Blanks-2.
*/

//to do:
//optional rule word (or rather any tile in a word) can only be stolen three times
const setDefautValues = (tileset) => {
  Array.from(Array(26)).map((e, i) => {
    const char = i + 65 //start at A
    const letter = String.fromCharCode(char)
    tileset[letter] = { 'pts': null, 'qty': null, revealed: 0}
    const tile = tileset[letter]
    if (['D', 'G'].includes(letter)) {
      tile.pts = 2;
    }
    else if (['B', 'C', 'M', 'P'].includes(letter)) {
      tile.qty = 2;
      tile.pts = 3;
    }
    else if (['F', 'H', 'V', 'W', 'Y'].includes(letter)) {
      tile.qty = 2;
      tile.pts = 4;
    }
    else if (letter === 'K') {
      tile.qty = 1;
      tile.pts = 5;
    }
    else if (['J', 'X'].includes(letter)) {
      tile.qty = 1;
      tile.pts = 8;
    }
    else if (['Q', 'Z'].includes(letter)) {
      tile.qty = 1;
      tile.pts = 10;
    }
    else {
      tile.pts = 1;
      tile.qty = 0;
    }

    if (letter === 'A' || letter === 'I') {
      tile.qty = 9
    }
    else if (letter === 'D' || letter === 'L' || letter === 'S' || letter === 'U') {
      tile.qty = 4
    }
    else if (letter === 'E') {
      tile.qty = 12
    }
    else if (letter === 'G') {
      tile.qty = 3
    }
    else if (letter === 'N' || letter === 'R' || letter === 'T') {
      tile.qty = 6
    }
    if (letter === 'O') {
      tile.qty = 8
    }

  });
  return tileset;
};

export default setDefautValues