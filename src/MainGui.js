import React, { useState } from 'react';
import DisplayCanvas from './DisplayCanvas';
import styles from './MainGui.module.css'
import Toolbar from './Toolbar';
function MainGui() {
    const [data, setData] = useState()

    const handleBrowse=(files)=>{
        setData(files);
    }

    return (<div className={styles['MainGui']}>
        <Toolbar onBrowse={handleBrowse}/>
        <DisplayCanvas data={data}/>
    </div>);
}

export default MainGui;