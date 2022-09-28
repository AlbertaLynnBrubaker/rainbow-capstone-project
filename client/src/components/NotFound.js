import { NavButton } from "../tools/hooks"
import Styles from '../styles/HomeWall.style'
import Container from "react-bootstrap/esm/Container"


export const NotFound = () => {
  return (
    <Styles>
      <Container>
        <h1>Page Not Found</h1>
        <NavButton className="form-submit" />
      </Container>
    </Styles>
  )
}