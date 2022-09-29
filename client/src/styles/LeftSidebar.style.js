import styled from "styled-components";

const Styles = styled.div`
  .wrapper {
    position: fixed;
    margin: 0;
    left: 0;
    padding-top: 50px;
    width: 30%;
    max-width: 380px;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    
    z-index:800;
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