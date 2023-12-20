import { Button, Input, Upload } from "antd";
import { UploadOutlined, SendOutlined } from "@ant-design/icons";
import { useState } from "react";

const ChatArea = () => {
  const [fileList, setFileList] = useState([]);

  const uploadButton = <Button icon={<UploadOutlined />}></Button>;

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
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
            disabled={fileList.length < 1}
            icon={<SendOutlined />}
          ></Button>
        </div>
      </div>
    </div>
  );
};
export default ChatArea;
