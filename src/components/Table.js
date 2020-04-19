import React from "react"
var Component = React.Component;

class Table extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataPoints: []
    }
  }

  render () {
    return <div><div>Lets table this for now</div> <div>
    <h1>Training Stats</h1>
    <table>
      <thead>
        <tr>
          <th>Epoch</th>
          <th>Training Loss</th>
          <th>Validation Loss</th>
        </tr>
      </thead>
      <tbody>
        {this.state.dataPoints.map(({ node }, index) => (
          <tr key={index}>
            <td>{node.epochNum}</td>
            <td>{node.trainingLoss}</td>
            <td>{node.validationLoss}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>
  }
  componentDidMount(){
    fetch('http://127.0.0.1:8001/graphql',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'}, // This turned my 400 Bad Request to 200 Success!
      body: JSON.stringify({ query: 
      `{
          allEpochs {
              edges {
                  node {
                      epochNum
                      trainingLoss
                      validationLoss
                  }
              }
          }
      }`}),
    })
    .then(response => response.json())
    .then(response => {
        this.setState({dataPoints: response.data.allEpochs.edges})
    })
  }
}

export default Table;

/*
export default ({ dataPoints }) => { 
    <div><div>Hello world!</div> <div>
    <h1>My Site's Files</h1>
    <table>
      <thead>
        <tr>
          <th>Epoch</th>
          <th>Training Loss</th>
          <th>Validation Loss</th>
        </tr>
      </thead>
      <tbody>
        {dataPoints.map(({ node }, index) => (
          <tr key={index}>
            <td>{node.epoch}</td>
            <td>{node.training_loss}</td>
            <td>{node.validation_loss}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    </div>

}
*/