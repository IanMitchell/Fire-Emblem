var ChildTable = React.createClass({
  getInitialState: function() {
    return {childrenData: []};
  },

  componentDidMount: function() {
    var request = new XMLHttpRequest();
    request.open('GET', '/resources/children.json', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        this.setState({childrenData: JSON.parse(request.response).children});
      } else {
        console.log("Error opening Children JSON");
      }
    }.bind(this);

    request.onerror = function() {
      console.log("Error connecting to Children JSON");
    };

    request.send();
  },

  render: function() {
    var childNodes = null;

    if (this.state.childrenData.length > 0) {
      childNodes = this.state.childrenData.map(function(child) {
        return (
          <Child key={child.id} data={child} />
        );
      });
    }

    return (
      <table id="children-table">
        <thead>
          <tr>
            <td>Name</td>
            <td>HP</td>
            <td>Strength</td>
            <td>Magic</td>
            <td>Skill</td>
            <td>Speed</td>
            <td>Luck</td>
            <td>Defense</td>
            <td>Resistance</td>
            <td>Classes</td>
          </tr>
        </thead>
        <tbody>
          {childNodes}
        </tbody>
      </table>
    );
  }
});

React.render(<ChildTable />, document.getElementById('child-table'));
