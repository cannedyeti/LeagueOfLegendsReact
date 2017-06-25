const React = require('react');
const Api = require('../utilities/ChampApi')

class Live extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchData: props.matchData
    }
  }
  render() {
    var champs = Api.champ.champs.data;
    return (
      <div>
        {console.log("match data", this.state.matchData)}
        {console.log('champs', champs)}
      </div>
    )
  }
}


module.exports = Live;