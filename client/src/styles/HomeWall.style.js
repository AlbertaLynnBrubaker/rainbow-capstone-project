import styled from "styled-components";

const Styles = styled.div`
  padding-top: 50px;

  #scrollable-div {
    height: calc(100vh - 50px);
    width: 1fr;
    overflow: auto;
  
    ::-webkit-scrollbar {
      display: none
    }
  }

  .form-card {   
    margin: 20px 5px; 
    padding: 1.1rem;
    border-radius: 15px;
    border: 1px solid lightgray;
    box-shadow: 2px 2px 8px grey;    
  }

  .form-card > form {
    display:flex;
    flex-direction: column;
    gap:15px;
  }

  .form-textarea {
    border: 2px solid white;
    border-radius: 10px;
  }

  .form-textarea:hover {
    border: 2px solid lavender;
    border-radius: 10px;
    background-color: lavender;
    outline: lavender solid 2px;
  }

  .form-textarea:focus {
    border: 2px solid lavender;
    border-radius: 10px;
    outline: lavender solid 2px;
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