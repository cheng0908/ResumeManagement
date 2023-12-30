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
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    onFileChange(file);
  };

  return (
    <div>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        className="file-upload-button"
      >
        Upload file
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>
      {selectedFile && (
        <p className="file-name">{'Selected File: ${selectedFile.name}'}</p>
      )}
    </div>
  );
};

export default InputFileUpload;
