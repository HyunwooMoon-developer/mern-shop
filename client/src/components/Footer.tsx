import { Col, Container, Row } from 'react-bootstrap';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';

const Footer = () => {
  return (
    <Container fluid className="footer bg-dark fixed-bottom">
      <Row className="justify-content-md-center">
        <Col md="6" xs="12">
          <p className="h4 mt-3">&copy; HyunwooMoon 2023</p>
        </Col>
        <Col md="6" xs="12">
          <a
            href="https://github.com/HyunwooMoon-developer"
            target="_blank"
            className="h1"
            style={{ marginRight: '20px' }}
          >
            <AiFillGithub />
          </a>{' '}
          <a
            href="https://www.linkedin.com/in/hyunwoomoon/"
            target="_blank"
            className="h1"
          >
            <AiFillLinkedin />
          </a>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
