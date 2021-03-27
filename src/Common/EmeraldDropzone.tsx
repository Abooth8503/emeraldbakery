import * as React from 'react';
import { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { FaSpinner } from 'react-icons/fa/index';

const SpinSpinner = styled(FaSpinner)`
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
  animation: spin 1.5s infinite;
`;

interface Props {
  // eslint-disable-next-line @typescript-eslint/ban-types
  uploadDoc: Function;
}

function EmeraldDropzone(props: Props): React.ReactElement {
  const [isUploading, set] = useState(false);
  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    if (acceptedFiles.length === 0) {
      return;
    }

    // fire function uploadDoc from props
    props.uploadDoc(acceptedFiles, set(false));
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.jpeg,.png,.jpg',
  });

  function ClickUpload(e: React.MouseEvent): void {
    e.preventDefault();
    set(true);
  }

  return (
    <div id='uploadDoc' {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <React.Fragment>
          <Button style={{ width: '100%' }} onClick={ClickUpload}>
            Upload File(s)
          </Button>
          {isUploading === true ? (
            <SpinSpinner style={{ marginTop: '5px' }} data-testid='spinner' />
          ) : null}
        </React.Fragment>
      )}
    </div>
  );
}

export default EmeraldDropzone;
