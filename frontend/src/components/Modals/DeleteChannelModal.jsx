import { Button } from 'react-bootstrap';
import ModalLayout from './ModalLayout';
import { closeModal } from '../../store/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { channelSelector } from '../../store/slices/modalSlice';
import { useRemoveChannelMutation } from '../../services/chatApi';
import { setActiveChannel } from '../../store/slices/activeChannelSlice';
import { activeChannelSelector } from '../../store/slices/activeChannelSlice';
import { defaultChannel } from '../../store/slices/activeChannelSlice';
import { toast } from 'react-toastify';

const DeleteChannelModal = () => {
  const dispatch = useDispatch();
  const currentChannel = useSelector(channelSelector);
  const activeChannel = useSelector(activeChannelSelector);
  const [removeChannel] = useRemoveChannelMutation();

  const handleСancel = () => {
    dispatch(closeModal());
  };

  const handleDelChannel = async () => {
    if (activeChannel.id === currentChannel.id) {
      dispatch(setActiveChannel(defaultChannel));
    }
    await removeChannel(currentChannel);
    dispatch(closeModal());
    toast.success('Канал удалён');
  };

  return (
    <ModalLayout title="Удалить канал">
      <p className="lead">Уверены?</p>
      <div className="d-flex justify-content-end gap-2">
        <Button className="btn-secondary" onClick={handleСancel}>Отменить</Button>
        <Button className="btn-danger" onClick={handleDelChannel}>Удалить</Button>
      </div>
    </ModalLayout>
  );
};

export default DeleteChannelModal;
