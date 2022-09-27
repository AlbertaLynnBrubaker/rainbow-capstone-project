import styled from "styled-components";

const Styles = styled.div`
  .content-container {
    padding-top: 80px;
  }

  .form-card {
    padding: 1.1rem;
    border-radius: 25px;
    border: 1px solid lightgray;
    box-shadow: 2px 2px 8px grey;
  }

  .form-textarea {
    border: 0;
    border-radius: 15px;
  }

  .form-textarea:hover {
    border: 0;
    border-radius: 15px;
    background-color: lavender;
  }

  .form-file-input {
    width: 60%;
    margin: 0;
    background-color: lavender;
    border: 2px solid white;
  }

  .form-file-input:hover {
    width: 60%;
    margin: 0;
    color: white;
    background-color: #8C72BB;
    border: 2px solid #8C72BB;
  }

  .form-file-inline {
    padding-top: 1rem;
    display: flex;
    justify-content: space-evenly;
  }

  .form-submit {
    color: black;
    background-color: lavender;
    border: 2px solid white;
  }

  .form-submit:hover {
    color: white;
    background-color: #8C72BB;
    border: 2px solid #8C72BB;
  }
`

export default Styles