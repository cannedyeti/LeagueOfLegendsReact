const React = require('react');
var PropTypes = require('prop-types');

function Champion(props) {
  return (
    <img 
    style={props.champId.includes(props.champion.id) ? {filter: 'grayscale(0%)'} : {filter: 'grayscale(100%)'} }
    onClick={props.onSelect.bind(null, props.champion.id)}
    className="ultimate-champion-image" alt={props.champion.name} src={"http://ddragon.leagueoflegends.com/cdn/7.12.1/img/champion/" + props.champion.image.full} />
  )
}

module.exports = Champion;

Champion.propTypes = {
  champion: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  champId: PropTypes.array.isRequired,
}