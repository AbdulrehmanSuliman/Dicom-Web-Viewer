import React, { useEffect, useState } from 'react';
import DisplayCanvas from './DisplayCanvas';
import styles from './MainGui.module.css'
import Toolbar from './Toolbar';
import cornerstone from "cornerstone-core";
import cornerstoneMath from "cornerstone-math";
import cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

cornerstoneTools.init();

cornerstoneTools.init({
  mouseEnabled: true,
  touchEnabled: true,
  globalToolSyncEnabled: false,
  showSVGCursors: false
});

const fontFamily =
  "Work Sans, Roboto, OpenSans, HelveticaNeue-Light, Helvetica Neue Light, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif";

cornerstoneTools.textStyle.setFont(`16px ${fontFamily}`);

// Set the tool width
cornerstoneTools.toolStyle.setToolWidth(2);

// Set color for inactive tools
cornerstoneTools.toolColors.setToolColor("rgb(255, 255, 0)");

// Set color for active tools
cornerstoneTools.toolColors.setActiveColor("rgb(0, 255, 0)");

function MainGui() {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [imageIds, setImageIds] = useState([]);
    let element;

    useEffect(() => {
        element = document.getElementById("dicomImage");
        cornerstone.enable(element);
    });
    const handleFileChange = e => {
        const files = Array.from(e.target.files);
        setUploadedFiles(files);
        const imageIds = files.map(file => {
          return cornerstoneWADOImageLoader.wadouri.fileManager.add(file);
        });
        setImageIds(imageIds);
        const StackScrollMouseWheelTool =
          cornerstoneTools.StackScrollMouseWheelTool;
        const stack = {
          currentImageIdIndex: 0,
          imageIds
        };
        cornerstone.loadImage(imageIds[0]).then(image => {
          cornerstone.displayImage(element, image);
          cornerstoneTools.addStackStateManager(element, ["stack"]);
          cornerstoneTools.addToolState(element, "stack", stack);
        });
        cornerstoneTools.addTool(StackScrollMouseWheelTool);
        cornerstoneTools.setToolActive("StackScrollMouseWheel", {});
      };
    


    return (<div className={styles['MainGui']}>
        <Toolbar onBrowse={handleFileChange}/>
        <DisplayCanvas />
    </div>);
}

export default MainGui;