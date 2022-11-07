import React, { useEffect, useRef } from 'react';
import styles from './Toolbar.module.css'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

function Toolbar(props) {
    const ref = useRef(null);
    
    useEffect(() => {
        if (ref.current !== null) {
          ref.current.setAttribute("directory", "");
          ref.current.setAttribute("webkitdirectory", "");
        }
      }, [ref]);

    const toolbarIcons = [
        {
            'id': 'browse-file-icon',
            'image': <FileUploadOutlinedIcon fontSize='medium' />,
            'disabled': false,
            'action': props.onBrowse
        },
        {
            'id': 'test',
            'image': <FileUploadOutlinedIcon fontSize='medium' />,
            'disabled': true,
        },
    ]

    const iconClicked=( id)=>{
        if (id === 'browse-file-icon'){
            ref.current?.click();
        }
    }
    
    // const handleSelectFile=(event)=>{
    //     props.onBrowse(event.target.files)
    // }

    return ( <div className={styles['toolbar']}>
        {toolbarIcons.map((icon,i)=>(
            <button key={icon.id} className={styles['circle']} disabled={icon.disabled} onClick={()=>{iconClicked(icon.id);}}>
                <div className={styles['icon-container']} >
                    {icon.image}
                </div>
            </button>
        ))}
        <input type="file" id="file-browser-dialogue" ref={ref} hidden onChange={props.onBrowse}/>
    </div> );
}

export default Toolbar;