import ModalLayout from './ModalLayout';
import EditChannelForm from '../Forms/EditChannelForm';
import { useTranslation } from 'react-i18next';

const EditChannelModal = () => {
  const { t } = useTranslation();
  return (
    <ModalLayout title={t('editChannelModal.title')}>
      <EditChannelForm />
    </ModalLayout>
  );
};

export default EditChannelModal;
