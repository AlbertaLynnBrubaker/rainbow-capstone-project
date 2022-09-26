import styled from "styled-components"

export const Background = styled.div`
  height: 100%;
  width: 100%;
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
`