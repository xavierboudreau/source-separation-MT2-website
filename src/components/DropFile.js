// Adapted from https://github.com/krissnawat/simple-react-upload/blob/master/src/App.js
//  Which was in turn adapted from https://bootsnipp.com/snippets/DOXy4

import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class DropFile extends Component {
    constructor(props) {
        super(props);
        this.state = {selectedFile: null}
    }

    checkMimeType=(event)=>{
        //getting file object
        let files = event.target.files 
        //define message container
        let err = []
        // list allow mime type
        const types = ['audio/mpeg', 'audio/x-m4a', 'audio/x-wav']
        // loop access array
        for(let x = 0; x<files.length; x++) {
            // compare file type find doesn't matach
            console.log(files[x].type)
                if (types.every(type => files[x].type !== type)) {
                // create error message and assign to container   
                err[x] = files[x].type+' is not a supported format\n';
            }
            };
            for(let z = 0; z<err.length; z++) {// if message not same old that mean has error 
                // discard selected file
            toast.error(err[z])
            event.target.value = null
        }
        return true;
    }

    maxSelectFile=(event)=>{
    let files = event.target.files
        if (files.length > 1) { 
            const msg = 'Only 1 file can be uploaded at a time'
            event.target.value = null
            toast.warn(msg)
            return false;
        }
    return true;
    }

    checkFileSize=(event)=>{
        let files = event.target.files
        let size = 10000000 
        let err = []; 

        for(let x = 0; x<files.length; x++) {
            if (files[x].size > size) {
                err[x] = files[x].type+'is too large, please pick a smaller file\n';
            }
        };

        for(let z = 0; z<err.length; z++) {// if message not same old that mean has error 
            // discard selected file
            toast.error(err[z])
            event.target.value = null
        }
        return true;
    }
    
    onChangeHandler=event=>{
        var files = event.target.files
        if(this.maxSelectFile(event) && this.checkMimeType(event) && this.checkFileSize(event)){ 
            this.setState({selectedFile: files})
        }
    }

    onClickHandler = () => {
        if (this.state.selectedFile == null){
            toast.warn('Nothing to upload...')
            return;
        }

        const data = new FormData()

        for(let x = 0; x<this.state.selectedFile.length; x++) {
            data.append('file', this.state.selectedFile[x])
        }

        axios.post("http://localhost:8001/upload", data)
        .then(_ => {toast.success('upload success')})
        .catch(_ => {toast.error('upload fail')})
    }

    render() {
    return (
        <div className="container">
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <div className="form-group files">
                        <label htmlFor = "form-control">Upload a music file (wav,mp3,etc...) for vocal extraction!</label>
                        <input id="form-control" type="file" className="form-control" multiple onChange={this.onChangeHandler}/>
                    </div>  
                    <ToastContainer />
                    <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
                </div>
            </div>
        </div>
    );
  }
}

export default DropFile;