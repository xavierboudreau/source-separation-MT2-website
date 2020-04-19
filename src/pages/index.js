import React, {useEffect} from "react"
import Table from "../components/Table"
import Layout from "../components/Layout"


const IndexPage = () => {
    useEffect(() => {
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
            console.log(response.data.allEpochs)
            //const dataPoints = response.data.allEpochs.edges
            console.log('done!')
        })
    }, [])

    // TODO: figure out how to use data from useEffect here
    return <Layout> <Table/> </Layout>
    
}

export default IndexPage

