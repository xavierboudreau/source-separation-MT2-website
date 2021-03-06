import React, {useCallback, useState} from "react"
//import Table from "../components/Table"
import Layout from "../components/Layout"
import FancyChart from "../components/Chart"
import DropFile from "../components/DropFile"
import Menu from "../components/Menu"
import SeparationButton from "../components/SeparationButton"
 

const IndexPage = () => {
    const [selectedFile, setSelectedFile] = useState(null)
    const [selectedModel, setSelectedModel] = useState(null)
    // Tells React that setSelectedModelMemo won't change unless selectedModel changes
    const setSelectedModelMemo = useCallback(setSelectedModel, [selectedModel])
    const setSelectedFileMemo = useCallback(setSelectedFile, [selectedFile])

    const fileSelection = useCallback((selection) => {
        setSelectedFileMemo(selection);
    }, [setSelectedFileMemo])
    
    const modelSelection = useCallback((selection) => {
        setSelectedModelMemo(selection);
    }, [setSelectedModelMemo])

    return  <Layout>
                <h1>Vocal Separation Project M&T2</h1>
                <h2>Try it out</h2>
                <div style={{padding: '10px'}}><DropFile/></div>
                <div style = {{display: 'flex', flex_direction: 'row'}}> 
                    <Menu prompt = 'Select a file' endpoint = 'my-files' callback = {fileSelection}/>
                    <Menu prompt = 'Select a model' endpoint = 'my-models' callback = {modelSelection}/>
                </div>
                <SeparationButton selectedFile={selectedFile} selectedModel={selectedModel}/>
                <h2>Training Stats</h2>
                <FancyChart/> 
            </Layout>
    
}

export default IndexPage

