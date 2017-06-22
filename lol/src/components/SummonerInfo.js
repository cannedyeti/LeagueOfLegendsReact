const React = require('react');
const RecentMatches = require('./RecentMatches');
const RankedHistory = require('./RankedHistory');
const Live = require('./Live');

function UserNav (props) {
  var states
  if (props.live === true) {
    states = ['home', 'leagues', 'stats', 'live'];
  } else  {
    states = ['home', 'leagues', 'stats'];
  }
  return(
    <ul>
      {states.map((state) => {
        return (
          <li key={state}>
            <button onClick={props.onSelect.bind(null, state)}>
              {state}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

class SummonerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      summonerName: props.summonerName,
      summoner: null,
      inGame: false,
      game: null,
      leagues: false,
      stats: false,
      home: true,
      live: false
    }
    this.changeComponent = this.changeComponent.bind(this);
  }
  componentDidMount() {
    var name = this.state.summonerName
    fetch('/league/' + name)
      .then(res => res.json())
      .then(sum => {
        if(sum.match_data !=null) {
          this.setState({
            inGame: true,
            summoner: sum
          })
        } else {
          this.setState({
            summoner: sum
          })
        }
      })
    
  }
  changeComponent(component) {
    this.setState({
      leagues: false,
      stats: false,
      home: false,
      live: false
    })
    setTimeout(() => {
      if(component === 'home') {
        this.setState({
          home: true
        }) 
      } else if (component === 'leagues'){
        this.setState({
          leagues: true
        }) 
      } else if (component === 'stats'){
        this.setState({
          stats: true
        }) 
      } else if (component === 'live'){
        this.setState({
          live: true
        }) 
      }
    }, 100)
  }

  render() {
    var sum = this.state.summoner;
    return (
      <div>
        <UserNav live={this.state.inGame} onSelect={this.changeComponent}/>
        <h1>League Info</h1>
        {console.log("Summoner:", this.state.summoner)}
        {!sum ? <p>Loading...</p> : 
          <div>
            <h1>Account Name: {sum.info.name}</h1>
          </div>}
        {!sum ? null :
          <div>
            {!this.state.home ? null : <RankedHistory rank={sum.ranked_league}/>}
            {!this.state.home ? null : <RecentMatches matches={sum.recent_matches.matches}/>}
            {!this.state.live ? null : <Live matchData={sum.match_data}/>}
          </div>
        }
      </div>
    );
  }
}

module.exports = SummonerInfo;