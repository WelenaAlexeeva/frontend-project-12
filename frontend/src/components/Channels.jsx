import {
  Col,
} from 'react-bootstrap';

import { useGetChannelsQuery } from '../services/chatApi';
import { useSelector, useDispatch } from 'react-redux';
import AddChannelButton from './AddChannelButton';
import ChannelControlsButton from './ChannelControlsButton.jsx';
import { setActiveChannel, activeChannelSelector } from '../store/slices/activeChannelSlice.js';

const Channels = () => {
  const { data: channels } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const activeChannel = useSelector(activeChannelSelector);

  const handleAddChannel = () => {
    // add
    console.log('Добавить канал');
  };

  const handleClick = (channel) => {
    dispatch(setActiveChannel(channel));
  };

  return (
    <Col xs={12} md={2} className="border-end px-0 bg-light d-flex flex-column h-100">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <AddChannelButton onClick={handleAddChannel} />
      </div>

      {/* Channels */}
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto">
        {channels?.map((channel) => {
          return (
            <li className="nav-item w-100" key={channel.id}>
              <ChannelControlsButton channel={channel} activeChannel={activeChannel} handleClick={handleClick} />
            </li>
          );
        })}
      </ul>
    </Col>
  );
};

export default Channels;
