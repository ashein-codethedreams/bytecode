import React, { useEffect, useState } from "react";

const FileViewer = ({ base64File, fileName, fileType }) => {
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    // Decode the Base64 string to binary data
    const binaryData = atob(base64File);

    // Convert the binary data to an ArrayBuffer
    const arrayBuffer = new ArrayBuffer(binaryData.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }

    // Create a Blob from the ArrayBuffer
    const blob = new Blob([arrayBuffer], { type: fileType });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    setFileUrl(url);

    // Cleanup the URL when the component unmounts
    return () => URL.revokeObjectURL(url);
  }, [base64File, fileType]);

  return (
    <div>
      <h2>{fileName}</h2>
      {fileUrl && (
        <>
          {fileType.startsWith("image") ? (
            // Display image
            <img
              src={fileUrl}
              alt={fileName}
              style={{ maxWidth: "100%", maxHeight: "500px" }}
            />
          ) : (
            // Display PDF
            <iframe
              title="File Viewer"
              src={fileUrl}
              width="100%"
              height="500px"
              frameBorder="0"
            />
          )}
        </>
      )}
    </div>
  );
};

export default FileViewer;
