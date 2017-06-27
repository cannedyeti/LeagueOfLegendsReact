const React = require('react');
const ChampAPI = require('../../utilities/ChampApi');
const SelectedChampion = require('./SelectedChampion');

class RandomChampion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      champ: null
    }
  }
  componentDidMount() {
    var champs = ChampAPI.champ
    for (var c in champs.champs.data) {
      if (champs.champs.data[c].id === this.state.id) {
        this.setState({
          champ: champs.champs.data[c]
        })
      }
    }
  }
  render() {
    var champion = this.state.champ;
    return( 
      <div>
        {!champion ? null : <SelectedChampion champ={champion} />}
      </div>
    )
  }
}

module.exports = RandomChampion;