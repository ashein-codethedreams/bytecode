import { Button, Upload, message } from "antd";
import { UploadOutlined, SendOutlined } from "@ant-design/icons";
import { useState } from "react";

const ChatArea = () => {
  const [fileList, setFileList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadButton = <Button icon={<UploadOutlined />}></Button>;

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    // Store the selected file in the component's state
    if (newFileList.length > 0) {
      setSelectedFile(newFileList[0].originFileObj);
    }
  };

  const convertFileToBytecode = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        // Extract the Base64 content without the data URI prefix

        const base64Content = reader.result.split(",")[1];

        resolve(base64Content);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSendClick = async () => {
    try {
      if (selectedFile) {
        setLoading(true);

        const bytecode = await convertFileToBytecode(selectedFile);

        const body = {
          file_type: selectedFile.type,
          file_bytes: bytecode,
        };
        const response = await fetch(
          "http://192.168.0.121:8080/api/conversations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);
        message.success("File sent successfully");
      }
    } catch (error) {
      console.error("Error sending file:", error);
      message.error("Error sending file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-[300px] border-2 border-red-500 h-[300px] mb-2">
        TEXT AREA
      </div>
      <div className="flex">
        <Upload
          action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <div className="mt-8">
          <Button
            disabled={fileList.length < 1 || loading}
            icon={<SendOutlined />}
            onClick={handleSendClick}
          >
            {loading ? "Sending..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
