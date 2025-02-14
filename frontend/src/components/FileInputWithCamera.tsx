import React, { useRef } from 'react';
import { CameraFill } from "react-bootstrap-icons"
const FileInputWithCamera = ({ onFileSelect }: any) => {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        if (fileInputRef) {
            //@ts-ignore
            fileInputRef.current.click();
        }

    };

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        onFileSelect(file)

    };

    return (
        <div>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
                accept="image/*"
            />

            <CameraFill size={15} className="m-1" onClick={handleButtonClick} />
        </div>
    );
};

export default FileInputWithCamera;