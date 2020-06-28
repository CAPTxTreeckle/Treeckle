import React, { useContext, useState } from "react";
import axios from "axios";
import { Header, Form } from "semantic-ui-react";
import { Context } from "../../../contexts/UserProvider";

function UploadCsv() {
  const userContext = useContext(Context);
  const [file, setFile] = useState(null);

  //TODO: error handling for incorrectly formatted csv files
  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Stop form submit
    fileUpload(file).then((response: any) => {
      console.log(response.data);
    });
  };

  const onChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const fileUpload = (file: any) => {
    const url = "../auth/newAccountRequestCSV";
    const formData = new FormData();
    formData.append("csvFile", file);
    const config = {
      headers: {
        Authorization: `Bearer ${userContext.token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <Header>File Upload</Header>
      <Form.Input type="file" onChange={onChange} />
      <Form.Button content="Upload .csv" fluid primary onChange={onChange} />
    </Form>
  );
}

export default UploadCsv;
