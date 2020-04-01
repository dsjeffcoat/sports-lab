class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shots: 0,
      score: 0
    };

    this.shotSound = new Audio("./assets/audio/steelsword.mp3");
    this.scoreSound = new Audio("./assets/audio/cheer2.mp3");
  }

  shotHandler = () => {
    let score = this.state.score;
    this.shotSound.play();

    if (Math.random() > 0.5) {
      score += 1;

      setTimeout(() => {
        this.scoreSound.play();
      }, 100);
    }

    this.setState((state, props) => ({
      shots: state.shots + 1,
      score
    }));
  };

  render() {
    let shotPercentageDiv;

    if (this.state.shots) {
      const shotPercentage = Math.round(
        (this.state.score / this.state.shots) * 100
      );
      shotPercentageDiv = (
        <div>
          <strong>Striking %: {shotPercentage}</strong>
        </div>
      );
    }

    return (
      <div className="Team">
        <h2>{this.props.name}</h2>

        <div className="identity">
          <img src={this.props.logo} alt={this.props.name} />
        </div>

        <div>
          <strong>Shots:</strong> {this.state.shots}
        </div>

        <div>
          <strong>Score:</strong> {this.state.score}
        </div>

        {shotPercentageDiv}

        <button onClick={this.shotHandler}>Fire!</button>
      </div>
    );
  }
}

function Game(props) {
  return (
    <div className="Game">
      <h2>The Battle of {props.venue}</h2>
      <div className="stats">
        <Team
          name={props.visitingTeam.name}
          logo={props.visitingTeam.logoSrc}
        />
        <div className="versus">
          <h1>VS</h1>
        </div>
        <Team name={props.homeTeam.name} logo={props.homeTeam.logoSrc} />
      </div>
    </div>
  );
}

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
