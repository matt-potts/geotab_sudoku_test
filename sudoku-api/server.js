const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sudoku = require('sudoku');
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:4000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors())

app.get('/', (req, res) => {
  res.redirect('/sudoku');
});

app.get('/sudoku/board', (req, res) => {
  res.redirect('/sudoku');
});

app.get('/sudoku', (req, res) => {
  const puzzle = sudoku.makepuzzle();
  const solution = sudoku.solvepuzzle(puzzle);
  const modifiedSolution = solution.map((number) => {
    return number + 1;
  });

  res.json({
    sudoku: modifiedSolution
  });
});

// Listen to the App Engine-specified port, or 8080 otherwise
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});