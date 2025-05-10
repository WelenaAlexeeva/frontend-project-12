import Modal from 'react-bootstrap/Modal'
import { closeModal, isOpenedSelector } from '../../store/slices/modalSlice'
import { useSelector, useDispatch } from 'react-redux'

const ModalLayout = ({ children, title = 'Модалка', onHide = closeModal }) => {
  const show = useSelector(isOpenedSelector)
  const dispatch = useDispatch()

  return (
    <Modal
      show={show}
      onHide={() => { dispatch(onHide()) }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {children}
      </Modal.Body>
    </Modal>
  )
}

export default ModalLayout
