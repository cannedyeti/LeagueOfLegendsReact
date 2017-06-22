const React = require('react');
const RankedLeague = require('./RankedLeague');

class RankedHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ranked: props.rank
    }
  }
  render() {
    return(
      <div>
        {this.state.ranked.map(function(league, index) {
          return (
            <RankedLeague key={index} leagueInfo={league}/>
          )
        })}
      </div>
    )
  }
}

module.exports = RankedHistory;