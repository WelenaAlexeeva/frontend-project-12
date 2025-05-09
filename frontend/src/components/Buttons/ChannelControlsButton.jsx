import { openModal } from '../../store/slices/modalSlice';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

const ChannelControlsButton = ({ channel, activeChannel, handleClick }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleDel = () => {
    dispatch(openModal({ type: 'deleteChannelModal', channel: channel }));
    console.log('del');
  };

  const handleEdit = () => {
    dispatch(openModal({ type: 'editChannelModal', channel: channel }));
    console.log('ed');
  };

  if (channel.removable) {
    return (
      <div className="dropdown d-flex">
        <button
          onClick={() => { handleClick(channel); }}
          type="button"
          className={`w-100 rounded-0 text-start text-truncate btn ${activeChannel.id === channel.id ? 'btn-secondary' : ''}`}
        >
          <span className="me-1">#</span>
          {channel.name}
        </button>
        <button
          type="button"
          id="channelMenuButton"
          className={`btn dropdown-toggle rounded-0 ${activeChannel.id === channel.id ? 'btn-secondary' : ''}`}
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <span className="visually-hidden">{t('channelControls.hint')}</span>
        </button>
        <ul className="dropdown-menu" aria-labelledby="channelMenuButton">
          <li><a className="dropdown-item" href="#" onClick={() => { handleEdit(); }}>{t('channelControls.rename')}</a></li>
          <li><a className="dropdown-item" href="#" onClick={() => { handleDel(); }}>{t('channelControls.delete')}</a></li>
        </ul>
      </div>
    );
  }

  return (
    <button
      onClick={() => { handleClick(channel); }}
      type="button"
      className={`w-100 rounded-0 text-start text-truncate btn ${activeChannel.id === channel.id ? 'btn-secondary' : ''}`}
    >
      <span className="me-1">#</span>
      {channel.name}
    </button>
  );
};

export default ChannelControlsButton;
