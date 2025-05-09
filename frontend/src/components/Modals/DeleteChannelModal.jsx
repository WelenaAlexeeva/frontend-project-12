import { Button } from 'react-bootstrap';
import ModalLayout from './ModalLayout';
import { closeModal } from '../../store/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { channelSelector } from '../../store/slices/modalSlice';
import { useRemoveChannelMutation } from '../../services/chatApi';
import { setActiveChannel } from '../../store/slices/activeChannelSlice';
import { activeChannelSelector } from '../../store/slices/activeChannelSlice';
import { defaultChannel } from '../../store/slices/activeChannelSlice';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';


const DeleteChannelModal = () => {
  const dispatch = useDispatch();
  const currentChannel = useSelector(channelSelector);
  const activeChannel = useSelector(activeChannelSelector);
  const [removeChannel] = useRemoveChannelMutation();
  const { t } = useTranslation();


  const handleСancel = () => {
    dispatch(closeModal());
  };

  const handleDelChannel = async () => {
    if (activeChannel.id === currentChannel.id) {
      dispatch(setActiveChannel(defaultChannel));
    }
    await removeChannel(currentChannel);
    dispatch(closeModal());
    toast.success(t('toasts.success.channel.delete'));

  };

  return (
    <ModalLayout title={t('deleteChannelModal.title')}>
      <p className="lead">{t('deleteChannelModal.text')}</p>
      <div className="d-flex justify-content-end gap-2">
        <Button className="btn-secondary" onClick={handleСancel}>{t('deleteChannelModal.cancelButton')}</Button>
        <Button className="btn-danger" onClick={handleDelChannel}>{t('deleteChannelModal.deleteButton')}</Button>
      </div>
    </ModalLayout>
  );
};

export default DeleteChannelModal;
