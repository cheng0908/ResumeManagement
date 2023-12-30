import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
    composes: "visually-hidden-input",
});

interface InputFileUploadProps {
    onFileChange: (file: File | null) => void;
}

const InputFileUpload: React.FC<InputFileUploadProps> = ({ onFileChange }) => {
    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        onFileChange(selectedFile);
    };

    return (
        <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            className="file-upload-button"
        >
            Upload file
            <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
    );
};

export default InputFileUpload;
