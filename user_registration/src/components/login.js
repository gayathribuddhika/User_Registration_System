import React, { useState } from "react";
import { Button, Form, Card} from "react-bootstrap";
import axios from "axios";

const LoginUser = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const [formValues, setformValues] = useState(initialValues);
  const [formErrors, setformErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
  };

  function submitForm(e) {
    e.preventDefault();
    const errors = {};
    
    if ( formValues.password.length < 8 ) {
      errors.password = "Password must be at least 8 characters long!";
    } 

    setformErrors(errors);

    if (Object.keys(errors).length === 0) {
      const user = {
        username: formValues.username,
        password: formValues.password,
      };
      console.log(user);

      axios
        .post("http://localhost:5000/api/users/login-user", user)
        .then((response) => {
          alert(response.data.message);
          setformValues(initialValues);
        })
        .catch((err) => {
          if (err.response) {
            setErrorMessage(err.response.data.message);
          }
        });
    }
  }

  return (
    <div className="border d-flex align-items-center justify-content-center">
      <hr />
      <Card border="primary" style={{ width: "40rem", marginTop: "80px" }}>
        <Card.Body style={{ backgroundColor: "lightblue" }}>
          <Card.Title style={{ textAlign: "center" }}>
            <h3 style={{ color: "blue" }}>Login Form</h3>
          </Card.Title>
          <br />
          <Form className="g-2" onSubmit={submitForm}>
            {errorMessage && (
              <div className="error" style={{ color: "red" }}>
                {" "}
                {errorMessage}{" "}
              </div>
            )}
            <br />
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                name="username"
                placeholder="Enter a username"
                value={formValues.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <p style={{ color: "red" }}>{formErrors.password}</p>

            <Button variant="primary" type="submit">
              login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginUser;
