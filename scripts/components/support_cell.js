var SupportCell = React.createClass({
  getInitialState: function() {
    return {sRank: false};
  },

  componentDidMount: function() {
    if (this.props.disabled == 'false') {
      localforage.getItem(this.props.storageKey).then(function(value) {
        if (value !== null) {
          this.setState({sRank: value});

          if (this.state.sRank) {
            window.dispatchEvent(new CustomEvent('supportClick', {'detail': [this.props.storageKey.split('-')[0], this.props.storageKey.split('-')[1], this.state.sRank]}));
          }
        }
      }.bind(this)).catch(function(error) {
        console.error(error);
      });

      window.addEventListener('supportClick', this.updateCell);
    }
  },

  updateCell: function(event) {
    // Sync partner cell state
    if (this.props.storageKey.indexOf(event.detail[0]) > -1 &&
        this.props.storageKey.indexOf(event.detail[1]) > -1) {
      localforage.setItem(this.props.storageKey, event.detail[2]).then(function(value) {
        this.setState({sRank: event.detail[2]});
      }.bind(this)).catch(function(error) {
        console.error(error);
      });
    }
    // If new match, clear all other matches for this character
    else if (event.detail[2]) {
      if (this.props.storageKey.indexOf(event.detail[0]) > -1 ||
          this.props.storageKey.indexOf(event.detail[1]) > -1) {
        localforage.setItem(this.props.storageKey, false).then(function(value) {
          this.setState({sRank: false});
        }.bind(this)).catch(function(error) {
          console.error(error);
        });
      }
    }
  },

  handleClick: function(event) {
    if (this.props.disabled == 'false') {
      localforage.setItem(this.props.storageKey, !this.state.sRank).then(function(value) {
        this.setState({sRank: !this.state.sRank});
        window.dispatchEvent(new CustomEvent('supportClick', {'detail': [this.props.storageKey.split('-')[0], this.props.storageKey.split('-')[1], this.state.sRank]}));
      }.bind(this)).catch(function(error) {
        console.error(error);
      });
    }
  },

  render: function() {
    var text = this.state.sRank ? 'S' : '-';
    var sClass = '';

    if (this.props.disabled == 'true') {
      text = '';
      sClass = "disabled";
    }
    if (this.state.sRank) {
      sClass = 'selected';
    }

    return (
      <td className={sClass} onClick={this.handleClick}><span>{text}</span></td>
    );
  }
});
