const React = require('react');
const PropTypes = require('prop-types');

class SelectedChampion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      champ: props.champ
    }
  }
  render() {
    var champion = this.state.champ
    return(
      <div>
        <img alt={champion.name} src={"http://ddragon.leagueoflegends.com/cdn/7.12.1/img/champion/" + champion.image.full} />
      </div>
    )
  }
}

module.exports = SelectedChampion;

SelectedChampion.propTypes = {
  champ: PropTypes.object.isRequired,
}