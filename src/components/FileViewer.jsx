import React, { useEffect, useState } from "react";
import moment from "moment";

const FileViewer = ({ base64File, fileName, fileType, createdAt }) => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [formattedTime, setFormattedTime] = useState(null);

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

    // Use moment to format date and time
    const formattedDateTime = moment(createdAt);
    const today = moment().startOf("day");

    if (formattedDateTime.isSame(today, "day")) {
      // If the date is today, display "Today" instead of the formatted date
      setFormattedDate("Today");
    } else {
      setFormattedDate(formattedDateTime.format("DD-MM-YYYY"));
    }
    setFormattedTime(formattedDateTime.format("HH:mm a"));

    // Cleanup the URL when the component unmounts
    return () => URL.revokeObjectURL(url);
  }, [base64File, fileType]);

  return (
    <div>
      <p>{fileName}</p>
      <br />
      <p>{formattedDate}</p>
      <br />
      {fileUrl && (
        <>
          {fileType.startsWith("image") ? (
            // Display image
            <div className="flex">
              <img
                src={fileUrl}
                alt={fileName}
                style={{ maxWidth: "100%", maxHeight: "500px" }}
              />

              <p className="ml-3">{formattedTime}</p>
            </div>
          ) : (
            // Display PDF
            <div>
              <iframe
                title="File Viewer"
                src={fileUrl}
                width="100%"
                height="500px"
              />
              <p>{formattedDate}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FileViewer;
