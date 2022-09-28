import styled from "styled-components";

const Styles = styled.div`
  padding-top: 50px;

  .content-container {
    padding: 20px 0;
    height: calc(100vh - 50px);
    width: 1fr;
    overflow: auto;
  
    ::-webkit-scrollbar {
      display: none
    }
  }

  .avatar-container {
    display: flex;
    justify-content: space-around;
    width: 59%;
  }

  .profile-img {    
    height: auto;
    width: 30%;
    border: 1px solid #8C72BB;
    border-radius: 10px;
    object-fit: contain;
  }

  .profile-password-container {
    display: flex;
    justify-content: space-between;
    align-content: baseline;
    margin-bottom: 5px;
  }

  .form-card {
    padding: 1.1rem;
    border-radius: 15px;
    border: 1px solid lightgray;
    box-shadow: 2px 2px 8px grey;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .form-file-input {
    margin: 0;
    border: 2px solid white;
  }

  .form-file-input:hover {
    margin: 0;
    background-color: lavender;
    border: 2px solid lavender;
    outline: lavender solid 2px;
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