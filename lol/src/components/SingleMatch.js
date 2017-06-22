const React = require('react');
const PropTypes = require('prop-types');

class SingleMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: props.game,
      matchInfo: null,
      win: false,
      player: null
    }
    this.checkWin = this.checkWin.bind(this);
  }
  componentDidMount() {
    var matchId = this.state.match.gameId
    fetch('https://na1.api.riotgames.com/lol/match/v3/matches/' + matchId + '?api_key=RGAPI-2e3d4429-ce3a-4f34-8301-3ca68c214c9c')
    .then(res => res.json())
    .then(result => this.setState({matchInfo: result}))
    setTimeout(() => {
      var matchInfo = this.state.matchInfo;
      this.checkWin(matchInfo)
    },800)
  }

  checkWin(info) {
    var champ = this.state.match.champion;
    var searchedPlayer = info.participants.filter(function(player) {
      return player.championId === champ
    })
    var player = searchedPlayer[0]
    var winner = info.teams.filter(function(team) {
      return team.teamId === player.teamId
    })
    if (winner[0].win === 'Win') {
      this.setState({win: true, player: player});
    } else {
      this.setState({win: false, player: player});
    }
  }

  render() {
    // var matchInfo = this.state.matchInfo;
    var player = this.state.player;
    return (
      <div
        style={this.state.win === true ? {background: 'green'} :  {background: 'red'} }
      >
      {!this.state.win ? <p>Loss</p> : <p>Win</p>}
        {/*{console.log("player", player, "GameID", this.state.match)}*/}
        <h2>Champion Id: {this.state.match.champion}</h2>
        {!player ? null : <p>{player.stats.kills}/{player.stats.deaths}/{player.stats.assists}</p>}
         {!player ? null : <ul className="matchInfo">
          <li>Champ Level: {player.stats.champLevel}</li>
          <li>Gold Earned: {player.stats.goldEarned}</li>
          <li>Total Damage Dealt to Champs: {player.stats.totalDamageDealtToChampions}</li>
          <li>Creep Score: {player.stats.totalMinionsKilled}</li>
        </ul>}
      </div>
    )
  }
}
SingleMatch.propTypes = {
  game: PropTypes.object.isRequired
};

module.exports = SingleMatch;