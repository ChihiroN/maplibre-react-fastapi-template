import { CSSProperties, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios, { AxiosError } from 'axios';



const styles: CSSProperties = {
  border: '2px dashed #cccccc',
  borderRadius: '5px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  fontSize:'1rem',
};

const DropzoneComponent = () => {
  // State for the selected file
  const [file, setFile] = useState<File | null>(null);
  // State for handling upload errors
  const [errorMessage, setErrorMessage] = useState('');
  // State for the uploadSucess
  const [uploadSuccess, setUploadSuccess] = useState(false);
  // State to track loading status
  const [isLoading, setIsLoading] = useState(false);  

  // Configure the dropzone hook
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      // Set the first accepted file to state
      setFile(acceptedFiles[0]);
    },
  });
  //las uploader
  // Define the URL for the file upload endpoint
  const URL = 'http://localhost:3001/upload';

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); // Prevent default form submission behavior
    e.stopPropagation(); // This stops the click event from propagating to parent elements

    console.log('upload start');
    console.log(file);
    if (file) {
      console.log('upload file setting exist')
      const formData = new FormData();
      formData.append('upload_file', file);  // Ensure 'upload_file' matches the server's expected key

      try {
        console.log('try upload');
        const response = await axios.post(URL, formData, {
          headers: {
            'Content-Type': 'pointcloud/las'
          },
        });
        console.log(response.data)
        setUploadSuccess(true);  // Set upload success state
        setErrorMessage('');  // Clear any previous error messages
        // setFile(nul) // Clear any previous error messages
        return response.data;

      } catch (error) {
        
        console.log(error)
        const axiosError = error as AxiosError;
        if (axiosError.response && axiosError.response.status === 400) {
          console.log('400 Error!!');
          console.log(axiosError.message);
        } else {
          // Handle other errors or rethrow if needed
          console.error('An unexpected error occurred:', axiosError.message);
        }
        setUploadSuccess(false);  // Ensure upload success is false on error
      }
    }else{
      setErrorMessage('No file selected');
    }
    
  };
  
  const handleDataProcessing = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    console.log('Starting data processing...');
    
    // Here you might call another API endpoint or update the UI accordingly
  };

  return (
    <div {...getRootProps()} style={styles}>
      <input {...getInputProps()} />
      {isDragActive && <p>ここにファイルをドロップしてください。</p>}

      {!file && !isDragActive && (
        <p>
          ファイルをドラッグ＆ドロップするか、<br/>
          ここをクリックしてファイルを選択してください。
        </p>
      )}

      {file && !uploadSuccess &&(
        <div>
          <p>アップロードするファイル名 </p>
          <p>{file.name} </p>
          <button
           className="button is-primary" 
           type="submit" 
           onClick={event => handleSubmit(event)}>Submit</button> 
        </div>
      )}

      {file && uploadSuccess && (
        <div>
          <p>Uploaded </p>
          <p>{file.name} </p>
          <button
            className="button is-success"
            onClick={handleDataProcessing}
          >
            Process Uploaded Data
          </button>
        </div>
        
      )}

      {errorMessage &&
       <p className="error">{errorMessage}</p>
       }
    </div>
  );
};

export default DropzoneComponent;