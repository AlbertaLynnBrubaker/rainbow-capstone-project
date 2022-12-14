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

  .groups-list-container {
    display: flex;
    justify-content: center;
    gap: 15px;

    div {
      width: 98%;
    }
  }

  .group-card {   
    width: 100%;
    margin: 20px 5px; 
    padding: 1.1rem;
    border-radius: 15px;
    border: 1px solid lightgray;
    box-shadow: 2px 2px 8px grey;    
    text-decoration: none;
  }

  .group-avatar-img {
    height: 35px;
    width: 35px;
    border: 1px solid #8C72BB;
    border-radius: 35px;
    margin-left: 3px;
  }

  .group-avatar-text {
    color: black;
  }

  .user-card {
    display: flex;
    align-content: baseline;
    gap: 15px;
    padding-bottom: 15px;
  }

  .user-banner {
    display: flex;
    gap: 15px;
    text-decoration: none;

    h6 {
      align-self: flex-end;
    }
  }

  .user-card-img {
    height: 75px;
    width: 75px;
    border: 1px solid #8C72BB;
    border-radius: 15px;
    margin-left: 3px;
  }

  .user-avatar-img {
    height: 35px;
    width: 35px;
    border: 1px solid #8C72BB;
    border-radius: 40px;
    margin-left: 3px;
  }

  .user-avatar-text {
    color: black;
    text-decoration: none;
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

  .form-delete {
    color: black;
    background-color: lavender;
    border: 2px solid white;
  }

  .form-delete:hover {
    color: white;
    background-color: #ED5E53;
    border: 2px solid #ED5E53;
  }
`

export default Styles