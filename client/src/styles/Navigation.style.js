import styled from "styled-components";

const Styles = styled.div`
  .wrapper {
    position: fixed;
    margin: 0;
    width: 100%;
    height: 50px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid lightgray;
    box-shadow: 1px 1px 8px gray;
    z-index:900;
  }

  .center-flex {
    display: flex;    
    justify-content: space-evenly;
    align-items: center;
  }

  .btn-icon {
    width: 28px;
    height: 28px;
    color: #8C72BB;
  }

  .logo {
    width: 45px;
    height: 45px;
    border: 1px solid #8C72BB;
    border-radius: 45px;
  }

  .user-banner {
    display: flex;    
    text-decoration: none;
  }

  .user-avatar-img {
    height: 45px;
    width: 45px;
    border: 1px solid #8C72BB;
    border-radius: 40px;
    margin-left: 3px;
  }

  .user-avatar-text {
    color: black;
  }
`

export default Styles