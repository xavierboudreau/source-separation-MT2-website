import React, {useState, useEffect} from "react"
import {Chart} from 'react-charts'
import './Chart.css';


export default () => {
  const [queryResults, setQueryResults] = useState([])
  
  const axes = React.useMemo(
    () => [
      { primary: true, 
        type: 'linear', 
        position: 'bottom', 
        show: true },
      { type: 'linear', position: 'left', show: true }
    ],
    []
  )
  
  useEffect(() => {
      fetch('http://127.0.0.1:8001/graphql',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'}, // This turned 400 Bad Request to 200 Success!
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
    }).then(response => response.json())
    .then(response => {
        setQueryResults(response.data.allEpochs.edges)
    })
  },[])
  
  var chartData = React.useMemo(
    () => [
      {
        label: 'Training Loss',
        data: queryResults.map(edge => 
          [edge.node.epochNum, edge.node.trainingLoss])
      },
      {
        label: 'Validation Loss',
        data: queryResults.map(edge => 
          [edge.node.epochNum, edge.node.validationLoss]
        )
      }
    ], [queryResults])
  

  const primaryCursor = React.useMemo(() => ({
    render: props => (
      <span style={{ fontSize: '1rem' }}>
        Epoch {' '}
        {(props.formattedValue || '').toString()}
      </span>
    )
  }),
  []
)

var lineChart = (
  <div className="ChartContainer">
    <Chart data={chartData} axes={axes} primaryCursor={primaryCursor} tooltip />
  </div>
)

  return <div>
      {lineChart}
    </div> 
}