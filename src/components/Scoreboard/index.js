import './index.css'

const Scoreboard = props => {
  const {score, playAgain} = props
  return (
    <div className="scoreboard-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/match-game-trophy.png"
        alt="trophy"
        className="trophy"
      />
      <p className="scoreboard-heading">YOUR SCORE</p>
      <p className="total-score">{score}</p>
      <button type="button" className="resetBtn" onClick={playAgain}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/match-game-play-again-img.png"
          alt="reset"
        />
        PLAY AGAIN
      </button>
    </div>
  )
}

export default Scoreboard
