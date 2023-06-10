// Import stylesheets
import './style.css';

// Write Javascript code!
const colors = {
  1: 'rgba(255, 145, 0)',
  2: 'rgba(255, 188, 74, 1)',
  3: 'rgba(79, 167, 120, 1)',
  4: 'rgba(0, 107, 79, 1)',
};

function mountGaugeChart(score = 0) {
  document.getElementsByClassName(
    'score-text'
  )[0].innerHTML = `<span class="score-result">${score}</span><br> <span class="label-total"> de 1000</span>`;
  const scoreRound = Math.ceil(score / 250);
  for (let i = 1; i <= scoreRound; i++) {
    if (i < scoreRound) {
      document.getElementById(`quarter${i}`).style.background =
        'linear-gradient(0deg,' + colors[i] + ' 100%, rgba(212, 215, 222) 0%)';
    } else {
      if (score > 250) {
        var scoreRest = ((score - 250 * (scoreRound - 1)) / 250) * 100;
      } else {
        var scoreRest = (score / 250) * 100;
      }
      scoreRest = scoreRest.toFixed(2);
      document.getElementById(`quarter${i}`).style.background =
        'linear-gradient(' +
        calculateDeg(scoreRest, scoreRound) +
        ', ' +
        colors[i] +
        ' ' +
        scoreRest +
        '%, rgba(212, 215, 222) 0%)';
    }
  }
}

function resetChart() {
  for (let i = 1; i <= 4; i++) {
    document.getElementById(`quarter${i}`).style.background =
      'linear-gradient(0deg, rgba(212, 215, 222) 100%, rgba(212, 215, 222) 0%)';
  }
}

function calculateDeg(scoreRest = 100, quarther = 1) {
  switch (quarther) {
    case 1:
      return scoreRest * 0.68 + 'deg';
      break;
    case 2:
      return scoreRest * 0.9 + 'deg';
      break;
    case 3:
      return 110 + parseFloat(scoreRest) * 0.3 + 'deg';
      break;
    case 4:
      return (scoreRest < 50 ? 150 : scoreRest > 30 ? 170 : 180) + 'deg';
      break;
  }
}

setInterval(() => {
  resetChart();
  mountGaugeChart(Math.floor(Math.random() * 1000));
}, 1000);
