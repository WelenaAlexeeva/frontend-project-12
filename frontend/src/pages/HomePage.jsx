import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetChannelsQuery, useGetMessagesQuery } from '../services/chatApi';
import { Container, Row, Col } from 'react-bootstrap';



function HomePage() {
  const navigate = useNavigate();

  const token = localStorage.getItem('jwtToken');

  const { data: channels } = useGetChannelsQuery();
  const { data: messages } = useGetMessagesQuery();
  console.log(channels);
  console.log(messages);


  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

  }, [token, navigate]);

  return (
    <Container>
      <Row>
        <Col>1 of 2</Col>
        <Col>2 of 2</Col>
      </Row>
      <Row>
        <Col>1 of 3</Col>
        <Col>2 of 3</Col>
        <Col>3 of 3</Col>
      </Row>
    </Container>
    );

}

export default HomePage;