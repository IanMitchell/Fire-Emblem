var SupportTable = React.createClass({
  getInitialState: function() {
    return {characterData: []};
  },

  componentDidMount: function() {
    var request = new XMLHttpRequest();
    request.open('GET', '/resources/characters.json', true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        this.setState({characterData: JSON.parse(request.response).characters});
      } else {
        console.log("Error opening Character JSON");
      }
    }.bind(this);

    request.onerror = function() {
      console.log("Error connecting to Character JSON");
    };

    request.send();
  },

  render: function() {
    var tableHeader = null,
        characterRows = null;

    if (this.state.characterData.length > 0) {
      tableHeader = this.state.characterData.map(function(character) {
        return (
          <td><img src={'resources/images/' + character.name + '.gif'} /></td>
        );
      });

      characterRows = this.state.characterData.map(function(character, index) {
        return (
          <tr>
            <td><img src={'resources/images/' + character.name + '.gif'} /></td>

            {
              this.state.characterData.map(function(char) {
                if (character.spouses.indexOf(char.key) > -1) {
                  return (
                    <SupportCell key={character.key + '-' + char.key} disabled='false' storageKey={character.name + "-" + char.name} />
                  );
                }
                else {
                  return (<SupportCell key={character.key + '-' + char.key} disabled='true' />);
                }
              }, this)
            }

          </tr>
        );
      }, this);
    }

    return (
      <table>
        <thead>
          <tr>
            <td></td>
            {tableHeader}
          </tr>
        </thead>
        <tbody>
          {characterRows}
        </tbody>
      </table>
    );
  }
});

React.render(<SupportTable />, document.getElementById('support-table'));
