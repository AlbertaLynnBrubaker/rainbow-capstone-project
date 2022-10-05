import styled from "styled-components";

const Styles = styled.div`
  position: fixed;
  margin: 0;
  left: 0;
  padding-top: 15px;
  width: 20%;
  max-width: 380px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;  
  z-index:800;  

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
    overflow: hidden;
    white-space: nowrap;   
  }

  .user-avatar-img {
    height: 35px;
    width: 35px;
    border: 1px solid #8C72BB;
    border-radius: 35px;
    margin-left: 3px;
  }

  .user-avatar-text {
    color: black;  
  }

  .group-card {   
    /* width: 80%; */
    margin: 5px; 
    padding: 1.1rem;
    border-radius: 15px;
    border: 1px solid lightgray;
    box-shadow: 2px 2px 8px grey;    
    text-decoration: none;

    h3 {
      margin: 0;
      padding: 3px;
    }
  }

  .group-header {
    text-align: center;
  }
`

export default Styles