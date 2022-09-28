import styled from "styled-components";

const Styles = styled.div`
  

  .comment-container {
    display: flex;
    flex-direction: column;
    width: 90%;
    gap: 15px;
    padding: 15px 0;
    border-top: 1px solid lightgray;
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
    height: 35px;
    width: 35px;
    border: 1px solid #8C72BB;
    border-radius: 40px;
    margin-left: 3px;
  }

  .user-avatar-text {
    color: black;
  }

  .comment-img-container {
    width: 35%;
  }

  .comment-img {
    width: 100%; 
    object-fit: contain;
    border: 1px solid #8C72BB;
    border-radius: 10px;
  }

  .edit-comment-form {
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

  .remove-container {
    display: flex;
    justify-content: center;
  }

  .form-remove {
    color: black;
    background-color: lavender;
    border: 2px solid white;
  }

  .form-remove:hover {
    color: white;
    background-color: #8C72BB;
    border: 2px solid #8C72BB;
  }
`

export default Styles