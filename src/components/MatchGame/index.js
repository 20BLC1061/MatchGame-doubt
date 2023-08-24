import './index.css'
import {Component} from 'react'
import Scoreboard from '../Scoreboard'

class MatchGame extends Component {
  state = {
    category: 'FRUIT',
    mainImageUrl:
      'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
    timerDisplay: 60,
    score: 0,
    isGameOver: false,
  }

  componentDidMount() {
    this.intervalId = setInterval(this.statusChange, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  playAgain = () => {
    this.setState({
      category: 'FRUIT',
      mainImageUrl:
        'https://assets.ccbp.in/frontend/react-js/match-game/orange-img.png',
      timerDisplay: 60,
      score: 0,
      isGameOver: false,
    })
    this.intervalId = setInterval(this.statusChange, 1000)
  }

  decrementTimer = () => {
    this.setState(prevState => ({
      timerDisplay: prevState.timerDisplay > 0 ? prevState.timerDisplay - 1 : 0,
    }))
  }

  statusChange = () => {
    const {timerDisplay} = this.state
    if (timerDisplay !== 0) {
      this.decrementTimer()
    } else {
      clearInterval(this.intervalId)
      this.setState({
        isGameOver: true,
      })
    }
  }

  randomImage = imageUrl => {
    const {imagesList} = this.props
    const {mainImageUrl} = this.state
    const randomNumber = Math.ceil(Math.random() * imagesList.length)
    const ImageData = imagesList[randomNumber]
    if (mainImageUrl !== imageUrl) {
      this.setState({
        isGameOver: true,
      })
    } else if (mainImageUrl === imageUrl) {
      this.setState(prevState => ({
        mainImageUrl: ImageData.imageUrl,
        score: prevState.score + 1,
      }))
    }
  }

  onClickTab = tabId => {
    this.setState({
      category: tabId,
    })
  }

  render() {
    const {imagesList, tabsList} = this.props
    const {category, mainImageUrl, timerDisplay, score, isGameOver} = this.state
    const filteredCategoryList = imagesList.filter(
      images => images.category === category,
    )
    return (
      <div className="app-container">
        <nav className="navbar">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/match-game-website-logo.png"
            alt="website logo"
          />
          <ul className="scoreboard">
            <li className="score">
              <p>
                Score: <span>{score}</span>
              </p>
            </li>
            <li className="scoreboard">
              <img
                src="https://assets.ccbp.in/frontend/react-js/match-game-timer-img.png"
                alt="timer"
                className="timer-logo"
              />
              <p className="timer">{timerDisplay} sec</p>
            </li>
          </ul>
        </nav>
        <div className="game-dashboard">
          {isGameOver ? (
            <Scoreboard score={score} playAgain={this.playAgain} />
          ) : (
            <>
              <img src={mainImageUrl} alt="match" />
              <ul className="navigation-buttons">
                {tabsList.map(tabs => (
                  <li key={tabs.tabId}>
                    <button
                      type="button"
                      className={`navigation-option ${
                        category === tabs.tabId ? 'active' : ''
                      }`}
                      onClick={() => this.onClickTab(tabs.tabId)}
                    >
                      {tabs.displayText}
                    </button>
                  </li>
                ))}
              </ul>
              <ul className="thumbnails">
                {filteredCategoryList.map(imageDetails => (
                  <li key={imageDetails.id}>
                    <img
                      src={imageDetails.thumbnailUrl}
                      alt="thumbnail"
                      className="thumbnail-image"
                      id={imageDetails.id}
                      onClick={() => this.randomImage(imageDetails.imageUrl)}
                    />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default MatchGame
