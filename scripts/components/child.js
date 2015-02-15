var Child = React.createClass({
  getInitialState: function() {
    return {father: 'None', mother: 'None'};
  },

  componentDidMount: function() {
    window.addEventListener('supportClick', this.updateChild);
  },

  updateChild: function(event) {
    var mother, father;

    // Assign Parents
    if (this.props.data.father.indexOf(event.detail[0]) > -1) {
      father = event.detail[0];
    }
    else if (this.props.data.father.indexOf(event.detail[1]) > -1) {
      father = event.detail[1];
    }

    if (this.props.data.mother.indexOf(event.detail[0]) > -1) {
      mother = event.detail[0];
    }
    else if (this.props.data.mother.indexOf(event.detail[1]) > -1) {
      mother = event.detail[1];
    }

    // Respond to Event
    if (!event.detail[2]) {
      if (mother !== undefined && father !== undefined &&
          this.state.mother == mother && this.state.father == father) {
        console.log(this.props.data.name + " Reset: " + mother + ", " + father);
        this.setState({father: 'None', mother: 'None'});
      }
    }
    else {
      if (mother !== undefined && father !== undefined) {
        console.log(this.props.data.name + " Set: " + mother + ", " + father);
        this.setState({father: father, mother: mother});
      }
    }
  },

  renderStats: function() {
    var statNodes = [];
    var i;

    if (this.state.father == 'None' || this.state.mother == 'None') {
      for (i = 0; i < 8; i++) {
        statNodes[i] = <td>0% (+0)</td>;
      }
    }
    else {
      if (this.props.data.stats[this.state.father] !== undefined) {
        for (i = 0; i < 8; i++) {
          statNodes[i] =
            <td>
              {this.props.data.stats[this.state.father].growth[i]}%
              ({this.props.data.stats[this.state.father].max[i]})
            </td>;
        }
      }
      else {
        for (i = 0; i < 8; i++) {
          statNodes[i] =
            <td>
              {this.props.data.stats[this.state.mother].growth[i]}%
              ({this.props.data.stats[this.state.mother].max[i]})
            </td>;
        }
      }
    }

    return statNodes;
  },

  // TODO: Formatting fixes
  renderClasses: function() {
    if (this.state.father == 'None' || this.state.mother == 'None') {
      return (<td>None</td>);
    }
    else {
      if (this.props.data.stats[this.state.father] !== undefined) {
        return (
          <td>
            {this.props.data.stats[this.state.father].classes.map(function(job) {
              return (job);
            })}
          </td>
        );
      }
      else {
        return (
          <td>
            {this.props.data.stats[this.state.mother].classes.map(function(job) {
              return (job);
            })}
          </td>
        );
      }
    }
  },

  render: function() {
    return (
      <tr>
        <td>{this.props.data.name}</td>
        {this.renderStats()}
        {this.renderClasses()}
      </tr>
    );
  }
});
