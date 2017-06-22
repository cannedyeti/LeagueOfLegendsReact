const React = require('react')
const RecentMatches = require('./RecentMatches')
const RankedHistory = require('./RankedHistory')

class SummonerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      summonerName: props.summonerName,
      summoner: null,
      inGame: false,
      game: null
    }
  }
  componentDidMount() {
    var name = this.state.summonerName
    fetch('/league/' + name)
      .then(res => res.json())
      .then(sum => this.setState({summoner: sum}))
  }

  render() {
    var sum = this.state.summoner;
    return (
      <div>
        <h1>League Info</h1>
        {console.log("Summoner:", this.state.summoner)}
        {!sum ? <p>Loading...</p> : 
          <div>
            <h1>Account Name: {sum.info.name}</h1>
          </div>}
        {!sum ? null :<RankedHistory rank={sum.ranked_league}/>}
        {!sum ? null : <RecentMatches matches={sum.recent_matches.matches}/>}
      </div>
    );
  }
}

module.exports = SummonerInfo;