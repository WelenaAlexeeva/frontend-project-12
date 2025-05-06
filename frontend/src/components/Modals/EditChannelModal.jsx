import ModalLayout from './ModalLayout';
import EditChannelForm from '../EditChannelForm';

const EditChannelModal = () => {
  return (
    <ModalLayout title="Переименовать канал">
      <EditChannelForm />
    </ModalLayout>
  );
};

export default EditChannelModal;
