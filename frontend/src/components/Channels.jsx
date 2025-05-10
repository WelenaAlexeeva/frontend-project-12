import { Col } from 'react-bootstrap'
import { useGetChannelsQuery } from '../services/chatApi'
import { useSelector, useDispatch } from 'react-redux'
// import AddChannelButton from './Buttons/AddChannelButton.jsx';
import ChannelControlsButton from './Buttons/ChannelControlsButton.jsx'
import { setActiveChannel, activeChannelSelector } from '../store/slices/activeChannelSlice.js'
import { openModal } from '../store/slices/modalSlice.js'
import { useTranslation } from 'react-i18next'

const Channels = () => {
  const { data: channels } = useGetChannelsQuery()
  const activeChannel = useSelector(activeChannelSelector)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleOpenModal = () => {
    dispatch(openModal({ type: 'addChannelModal' }))
  }

  const handleClick = (channel) => {
    dispatch(setActiveChannel(channel))
  }

  return (
    <Col xs={12} md={2} className="border-end px-0 bg-light d-flex flex-column h-100">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channelsList.channels')}</b>
        <button onClick={handleOpenModal} type="button" className="p-1 btn-sm btn btn-outline-primary d-flex align-items-center">
          +
        </button>
      </div>

      {/* Channels */}
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels?.map((channel) => {
          return (
            <li className="nav-item w-100" key={channel.id}>
              <ChannelControlsButton channel={channel} activeChannel={activeChannel} handleClick={handleClick} />
            </li>
          )
        })}
      </ul>
    </Col>
  )
}

export default Channels
