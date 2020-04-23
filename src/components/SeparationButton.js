import React, {useCallback, useState} from "react"
import ReactPlayer from "react-player"


export default () => {
    const [isSending, setIsSending] = useState(false);
    const [vocals, setVocals] = useState();
    
    const handleClick = useCallback(async ()=>{
        if (isSending) return;

        setIsSending(true);
        const response = await fetch('http://127.0.0.1:8001/separate', {method: 'GET',});
        var reader = response.body.getReader();
        
        reader.read().then((result) => {
            var blob = new Blob([result.value], { type: 'audio/x-wav' });
            console.log(blob);
            var url = window.URL.createObjectURL(blob);
            console.log(url);
            setVocals(url);
        });
        
        setIsSending(false);

    }, [isSending, vocals]);

    const playerError = (err) => {console.log(err)};


    const prompt = isSending ? 'Extracting vocals, please wait' :  'Hello'

    const playButton = vocals!==undefined ? <ReactPlayer url={vocals} controls height={'100px'} onError={playerError}/> : null //playing

    return <div>
            <button onClick={handleClick}>{prompt}</button>
            {playButton}
        </div>
}