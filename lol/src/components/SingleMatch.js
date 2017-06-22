const React = require('react');
const PropTypes = require('prop-types');

class SingleMatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: props.match
    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <div>{this.state.match.champion}</div>
    )
  }
}
SingleMatch.propTypes = {
  match: PropTypes.object.isRequired
};

module.exports = SingleMatch;