import styled from "styled-components";

const Styles = styled.div`
  margin: 5px;
  display: flex;
  flex-direction: column;
  gap: 15px; 

  .post-card {     
    display: flex;
    flex-direction: column;
    margin: 20px 0; 
    padding: 1.1rem;
    border-radius: 15px;
    border: 1px solid lightgray;
    box-shadow: 2px 2px 8px grey;
    gap: 15px;   
  }

  .btn-container {
    display: flex;
    justify-content: space-evenly
  }

  .user-banner {
    display: flex;
    gap: 15px;
    text-decoration: none;
  }

  .user-avatar-img {
    height: 50px;
    width: 50px;
    border: 1px solid #8C72BB;
    border-radius: 40px;
    margin-left: 3px;
  }

  .user-avatar-text {
    color: black;
  }

  .post-container {
    display: flex;
    flex-direction: column;
  }

  .post-img {    
    height: auto;
    width: auto;
    border: 1px solid #8C72BB;
    border-radius: 10px;
    object-fit: contain;
  }

  .comment-form {
    display:flex;
    flex-direction: column;
    border-top: 1px solid lightgray;
    gap:15px;
  }

  .post-form {
    display:flex;
    flex-direction: column;    
    gap:15px;
  }

  .form-textarea {
    margin-top: 15px;
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