import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useGetMessagesQuery } from '../services/chatApi';
import {
  Container,
  Row,
  Col,
  Navbar,
  Button,
  Nav,
} from 'react-bootstrap';
import Channels from '../components/Channels';
import { useSelector } from 'react-redux';
import { activeChannelSelector } from '../store/slices/activeChannelSlice';
import MessageForm from '../components/MessageForm';
import MessageItem from '../components/MessageItem';

function HomePage() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const activeChannel = useSelector(activeChannelSelector);
  const { data: messages, isLoading } = useGetMessagesQuery();
  const currentСhannelMessages = messages?.filter((message) => message.channelId === activeChannel.id);
  const count = currentСhannelMessages ? currentСhannelMessages.length : 0;

  const logOut = () => {
    auth.logOut();
    navigate('/login');
  };

  const token = localStorage.getItem('jwtToken');

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
  }, [token, navigate]);

  return (
    <div className="vh-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          {/* Navbar */}
          <Navbar className="shadow-sm navbar-light bg-white">
            <Container>
              <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                  {auth.loggedIn && (<Button variant="primary" onClick={logOut}>Выйти</Button>)}
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          {/* Main Content */}
          <Container className="my-4 overflow-hidden rounded shadow h-100">
            <Row className="h-100 bg-white flex-md-row">

              <Channels />

              {/* Chat Area */}
              <Col className="p-0 h-100">
                <div className="d-flex flex-column h-100">

                  {/* Channel Info */}
                  <div className="bg-light mb-4 p-3 shadow-sm small">
                    <p className="m-0">
                      <b>
                        #
                        {activeChannel.name}
                      </b>
                    </p>
                    <span className="text-muted">
                      { count }
                      {' '}
                      сообщений
                    </span>
                  </div>

                  {/* Messages */}
                  <div id="messages-box" className="chat-messages overflow-auto px-5 flex-grow-1">
                    {currentСhannelMessages?.map((message) => {
                      return (
                        <MessageItem key={message.id} username={message.username} message={message.message.message} />
                      );
                    })}
                  </div>

                  {/* Message form */}
                  <div className="mt-auto px-5 py-3">
                    <MessageForm
                      channelId={activeChannel.id}
                      isLoading={isLoading}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      {/* Toastify Placeholder */}
      <div className="Toastify"></div>
    </div>
  );
}

export default HomePage;
