const React = require('react');


class RankedHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      league: props.leagueInfo
    }
  }
  leagueType() {
    var queue = this.state.league.queueType;
    if(queue === 'RANKED_FLEX_SR') {
      return 'Flex 5:5'
    } else if (queue === 'RANKED_FLEX_TT') {
      return 'Flex 3:3'
    } else if (queue === 'RANKED_SOLO_5x5') {
      return 'Solo/Duo'
    }
  }
  render() {
    var league = this.state.league;
    var link = "./img/" + league.tier.toLowerCase() + ".png"
    return(
      <div className="row ranked-league-container">
        {console.log(this.state.league)}
        <div className="col-xs-3">
          <img alt={league.tier} className='rank-image' src={link} />
        </div>
        <div className="col-xs-3">
          <p className='ranked-league-rank'>{league.tier[0] + league.tier.substring(1).toLowerCase()} {league.rank}</p>
          <p className='ranked-league-point'>{league.leaguePoints}lp</p>
        </div>
        <div className="col-xs-3">
          <p className='ranked-league-type'>{this.leagueType()}</p>
          <p className='ranked-league-name'>{league.leagueName}</p>
        </div>
        <div className="col-xs-3">
          <p className='ranked-league-win-loss'>{league.wins}W/{league.losses}L</p>
          <p className='ranked-league-win-percentage'>{Math.ceil((league.wins/(league.losses+league.wins))*100)}%</p>
        </div>
      </div>
    )
  }
}

module.exports = RankedHistory;