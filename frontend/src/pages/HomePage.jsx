import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetMessagesQuery } from '../services/chatApi'
import { Container, Row, Col } from 'react-bootstrap'
import Channels from '../components/Channels'
import { useSelector } from 'react-redux'
import { activeChannelSelector } from '../store/slices/activeChannelSlice'
import MessageForm from '../components/Forms/MessageForm.jsx'
import MessageItem from '../components/MessageItem'
import selectModal from '../components/Modals/selectModal.js'
import { typeSelector } from '../store/slices/modalSlice.js'
import { useTranslation } from 'react-i18next'
import routes from '../routes.js'

function HomePage() {
  const navigate = useNavigate()
  const activeChannel = useSelector(activeChannelSelector)
  const { data: messages, isLoading } = useGetMessagesQuery()
  const currentСhannelMessages = messages?.filter(message => message.channelId === activeChannel.id)
  const count = currentСhannelMessages ? currentСhannelMessages.length : 0
  const { t } = useTranslation()

  const token = localStorage.getItem('jwtToken')
  const modalType = useSelector(typeSelector)
  const Modal = selectModal[modalType]

  useEffect(() => {
    if (!token) {
      navigate(routes.loginPagePath, { replace: true })
      return
    }
  }, [token, navigate])

  return (
    <div className="h-100" id="chat">
      <div className="d-flex flex-column h-100">

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
                    {t('channelInfo.messages.count', { count: count })}
                  </span>
                </div>

                {/* Messages */}
                <div id="messages-box" className="chat-messages overflow-auto px-5 flex-grow-1">
                  {currentСhannelMessages?.map(message => {
                    return (
                      <MessageItem key={message.id} username={message.username} message={message.body} />
                    )
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

      {/* Toastify Placeholder */}
      <div className="Toastify"></div>
      {Modal ? <Modal /> : ''}
    </div>
  )
}

export default HomePage
