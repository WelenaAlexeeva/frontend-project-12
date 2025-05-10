import ModalLayout from './ModalLayout'
import AddChannelForm from '../Forms/AddChannelForm'
import { useTranslation } from 'react-i18next'

const AddChannelModal = () => {
  const { t } = useTranslation()
  return (
    <ModalLayout title={t('addChannelModal.title')}>
      <AddChannelForm />
    </ModalLayout>
  )
}

export default AddChannelModal
