const React = require('react');
const PropTypes = require('prop-types');
const ItemSelect = require('./ItemSelect');
const SumAPI = require('../../utilities/SummonerSpellApi');

class SelectedChampion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      champ: props.champ,
      smite: false,
      summoners: []
    }
  }

  randomAdjective() {
    var choices = ['Lit', 'Dank', '1%', 'Dick-sucking', 'Fukkboi', 'Long Schlong', 'Feeder', 'FaZe', 'Clavo\'s Bitch', 'Fuck Trent', 'Gay', 'Thicc']
    return (choices[Math.floor(Math.random()*choices.length)]);
  }


  render() {
    var champion = this.state.champ
    return(
      <div>
        <img alt={champion.name} src={"http://ddragon.leagueoflegends.com/cdn/7.12.1/img/champion/" + champion.image.full} />
        <h3>{this.randomAdjective()} {champion.name}</h3>
        {/*<img src={'http://ddragon.leagueoflegends.com/cdn/7.12.1/img/spell/'}/>*/}
        <ItemSelect smiteBool={this.state.smite}/>
      </div>
    )
  }
}

module.exports = SelectedChampion;

SelectedChampion.propTypes = {
  champ: PropTypes.object.isRequired,
}