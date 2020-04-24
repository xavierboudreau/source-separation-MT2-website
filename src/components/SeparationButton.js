import React, {useCallback, useState} from "react"
import ReactPlayer from "react-player"
import { ToastContainer, toast } from 'react-toastify';


export default (props) => {
    const [isSending, setIsSending] = useState(false);
    const [vocals, setVocals] = useState();
    
    const handleClick = useCallback(async ()=>{
        if (isSending) return;
        if (props.selectedFile==null || props.selectedModel==null){
            toast.warn('Please select a file and a model')
            return
        }

        setIsSending(true);
        const response = await fetch('http://127.0.0.1:8001/separate', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                filename: props.selectedFile,
                modelname: props.selectedModel
            })
        });
        var reader = response.body.getReader();
        
        reader.read().then((result) => {
            var blob = new Blob([result.value], { type: 'audio/x-wav' });
            var url = window.URL.createObjectURL(blob);
            setVocals(url);
            if (url) toast.success('Vocals extracted!');
        });
        
        setIsSending(false);

    }, [isSending, props.selectedFile, props.selectedModel]);

    const playerError = (err) => {console.log(err)};

    const prompt = isSending ? 'Extracting vocals, please wait' :  'Extract Vocals'

    const playButton = vocals!==undefined ? <ReactPlayer url={vocals} controls height={'100px'} onError={playerError}/> : null //playing

    return  <div>
                <button onClick={handleClick}>{prompt}</button>
                <ToastContainer/>
                {playButton}
            </div>
}