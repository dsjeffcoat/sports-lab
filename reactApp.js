function Team(props) {
  let shotPercentageDiv;

  if (props.stats.shots) {
    const shotPercentage = Math.round(
      (props.stats.score / props.stats.shots) * 100
    );
    shotPercentageDiv = (
      <div>
        <strong>Striking %: {shotPercentage}</strong>
      </div>
    );
  }

  return (
    <div className="Team">
      <h2>{props.name}</h2>

      <div className="identity">
        <img src={props.logo} alt={props.name} />
      </div>

      <div>
        <strong>Shots:</strong> {props.stats.shots}
      </div>

      <div>
        <strong>Score:</strong> {props.stats.score}
      </div>

      {shotPercentageDiv}

      <button onClick={props.shotHandler}>Fire!</button>
    </div>
  );
}

//

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resetCount: 0,
      homeTeamStats: {
        shots: 0,
        score: 0
      },
      visitingTeamStats: {
        shots: 0,
        score: 0
      }
    };

    this.shotSound = new Audio("./assets/audio/steelsword.mp3");
    this.scoreSound = new Audio("./assets/audio/cheer2.mp3");
  }

  strike = team => {
    const teamStatsKey = `${team}TeamStats`;
    let score = this.state[teamStatsKey].score;
    this.shotSound.play();

    if (Math.random() > 0.5) {
      score += 1;

      setTimeout(() => {
        this.scoreSound.play();
      }, 100);
    }

    this.setState((state, props) => ({
      [teamStatsKey]: {
        shots: state[teamStatsKey].shots + 1,
        score
      }
    }));
  };

  resetBattle = () => {
    this.setState((state, props) => ({
      resetCount: state.resetCount + 1,
      homeTeamStats: {
        shots: 0,
        score: 0
      },
      visitingTeamStats: {
        shots: 0,
        score: 0
      }
    }));
  };

  render() {
    return (
      <div className="Game">
        <h2>The Battle of {this.props.venue}</h2>
        <div className="stats">
          <Team
            name={this.props.visitingTeam.name}
            logo={this.props.visitingTeam.logoSrc}
            stats={this.state.visitingTeamStats}
            shotHandler={() => this.strike("visiting")}
          />

          <div className="versus">
            <h1>VS</h1>
            <div>
              <h3>
                <strong>Battle Resets:</strong> {this.state.resetCount}
              </h3>
              <button onClick={this.resetBattle}>Reset Battle</button>
            </div>
          </div>

          <Team
            name={this.props.homeTeam.name}
            logo={this.props.homeTeam.logoSrc}
            stats={this.state.homeTeamStats}
            shotHandler={() => this.strike("home")}
          />
        </div>
      </div>
    );
  }
}

//

// Deafault App component that all other compents are rendered through
function App(props) {
  const targaryan = {
    name: "House of Targaryen",
    logoSrc: "./assets/images/House-Targaryen.png"
  };

  const lannister = {
    name: "House of Lannister",
    logoSrc: "./assets/images/House-Lannister.png"
  };

  const stark = {
    name: "House of Stark",
    logoSrc: "./assets/images/House-Stark.png"
  };

  const bolton = {
    name: "House of Bolton",
    logoSrc: "./assets/images/House-Bolton.png"
  };

  return (
    <div className="App">
      <h1 align="center">Time for the Battle of the Champions!</h1>
      <Game
        venue="King's Landing"
        homeTeam={lannister}
        visitingTeam={targaryan}
      />
      <Game venue="Winterfell" homeTeam={stark} visitingTeam={bolton} />
    </div>
  );
}

//Render the application
ReactDOM.render(<App />, document.getElementById("root"));
