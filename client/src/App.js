import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col } from 'reactstrap';
import './App.css';

function App() {
  const [file, setFile] = useState({});
  const fileEl = useRef();
  const [text, setText] = useState("");

  function onFileChange(e) {
    const file = e.target.files[0];
    console.log("file", file);
    setFile(e.target.files[0]);
  }

  function onFormSubmit(e) {
    e.preventDefault();

    console.log("setting file", {file});

    let formData = new FormData();
    formData.append("file", file)
    console.log("form data", formData);
    //axios.post('/uploadpdf', file, {}).then((res) => console.log("res", res));
    // console.log("formData.keys", formData.keys());
    // console.log("formData.values", formData.values());
    axios({
      method: "post",
      url: "/uploadpdf",
      data: formData
    }).then((res) => {
      console.log("res", res);
      setText(res.data);
    }).catch((err) => {
      console.log("err", err);
    });
  }

  return (
    <div className="App">
      <Form onSubmit={onFormSubmit}>
        <FormGroup>
          <Label for="pdf"></Label>
          <Input type="file" onChange={onFileChange} name="file" id="pdf" ref={fileEl} />
        </FormGroup>
        <FormGroup>
          <Button type="submit">Submit</Button>
        </FormGroup>
      </Form>
      <Container>
        <Row>
          <Col>
            {text}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
