const React = require('react');
const RecentMatches = require('./RecentMatches');
const RankedHistory = require('./RankedHistory');
const Live = require('./Live');

function UserNav (props) {
  var states
  if (props.live === true) {
    states = ['summary', 'leagues', 'stats', 'live'];
  } else  {
    states = ['summary', 'leagues', 'stats'];
  }
  return(
    <ul>
      {states.map((state) => {
        return (
          <li key={state}>
            <button onClick={props.onSelect.bind(null, state)}>
              {state[0].toUpperCase() + state.substring(1)}
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
      summary: true,
      live: false
    }
    this.changeComponent = this.changeComponent.bind(this);
  }
  componentDidMount() {
    var name = this.state.summonerName

    // GET ALL CHAMPS WHEN PATCH HAPPENS

    // fetch('/league/champ/all')
    // .then(res => res.json())
    // .then(r => console.log("champs", r))

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
      summary: false,
      live: false
    })
    setTimeout(() => {
      if(component === 'summary') {
        this.setState({
          summary: true
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
        {console.log("Summoner:", this.state.summoner)}
        {!sum ? <p>Loading...</p> : 
          <div className="profile-header">
            <img className="profile-icon" src={'http://ddragon.leagueoflegends.com/cdn/7.12.1/img/profileicon/' + sum.info.profileIconId + '.png'} /><span className="summoner-name">{sum.info.name}</span>
          </div>}
        <UserNav live={this.state.inGame} onSelect={this.changeComponent}/>
        {!sum ? null :
          <div>
            {!this.state.summary ? null : <RankedHistory rank={sum.ranked_league}/>}
            {!this.state.summary ? null : <RecentMatches matches={sum.recent_matches.matches}/>}
            {!this.state.live ? null : <Live matchData={sum.match_data}/>}
          </div>
        }
      </div>
    );
  }
}

module.exports = SummonerInfo;