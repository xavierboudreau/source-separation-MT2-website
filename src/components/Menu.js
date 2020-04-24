// Taken from https://material-ui.com/components/menus/

import React, {useState, useCallback} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function SimpleMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selection, setSelection] = useState(null);
    const [myFiles, setMyFiles] = useState([]);
    const [isSending, setIsSending] = useState(false);

    const handleClose = (event) => {
        const { myValue } = event.currentTarget.dataset;
        setSelection(myValue);
        props.callback(myValue)
        setAnchorEl(null);
    };

    const handleClick = useCallback(async (event) => {
        //Sets status of menu
        setAnchorEl(event.currentTarget);

        // don't send again while we are sending
        if (isSending) return
        
        // update state
        setIsSending(true)

        // send the actual request
        const response = await (await fetch('http://127.0.0.1:8001/'+props.endpoint,{method: 'GET', headers: {'Content-Type': 'application/json'}})).json()
        
        setMyFiles(response.files)

        // once the request is sent, update state again
        //if (isMounted.current) // only update if we are still mounted
        setIsSending(false)
        
    }, [isSending, setMyFiles, props.endpoint])

    const menuPrompt = selection ? selection : props.prompt;

    return (
        <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
            {menuPrompt}
        </Button>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        > 
            {myFiles.map((filename) => (
                <MenuItem data-my-value = {filename} onClick={handleClose}>
                    {filename}
                </MenuItem>))}
            
        </Menu>
        </div>
    );
}