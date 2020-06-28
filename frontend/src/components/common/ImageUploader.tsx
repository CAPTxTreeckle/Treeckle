import React, { useState } from "react";
import { Image, Form } from "semantic-ui-react";

type Props = {
  onChange: (file: any) => void;
};

type File = {
  lastModified: number;
  lastModifiedDate: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};

function ImageUploader(props: Props) {
  const [file, setFile] = useState<File>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<
    string | ArrayBuffer | null
  >("");

  const handleImageChange = (e: any) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
      props.onChange(file);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="image-upload"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {imagePreviewUrl && (
        <label htmlFor="file-input">
          <Image src={imagePreviewUrl} />
        </label>
      )}
      <Form style={imagePreviewUrl ? { display: "none" } : null}>
        <Form.Input
          label="Select poster image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          id="file-input"
        />
      </Form>
    </div>
  );
}

export default ImageUploader;
