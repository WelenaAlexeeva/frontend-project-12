import { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { Button, Container, Row, Spinner, Form, InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setActiveChannel } from '../store/slices/activeChannelSlice';
import { closeModal } from '../store/slices/modalSlice';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useGetChannelsQuery } from '../services/chatApi';
import { useAddChannelMutation } from '../services/chatApi';
import * as Yup from 'yup';

const AddChannelForm = () => {
  const inputRef = useRef(null);
  const [addChannel] = useAddChannelMutation();
  const { data: channels } = useGetChannelsQuery();
  const channelsNames = channels.map((item) => item.name);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    channelName: Yup
      .string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .trim()
      .notOneOf(channelsNames, 'Имя должно быть уникальным'),
  });

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: { channelName: '' },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const { channelName } = values;
      try {
        const newChannelName = filter.clean(channelName.trim());
        if (channelsNames.includes(newChannelName)) {
          throw new Error('Такое имя уже существует!');
        }
        const newChannel = await addChannel({ name: newChannelName });
        formik.values.channelName = '';
        dispatch(setActiveChannel(newChannel.data));
        dispatch(closeModal());
        toast.success('Канал создан');
      }
      catch (error) {
        toast.error('Ошибка');
        console.log(error);
      }
    },
  });

  return (
    <Container>
      <Form onSubmit={formik.handleSubmit}>
        <Row className="mb-3">
          <Form.Group>
            <Form.Label className="visually-hidden" htmlFor="channelName">Имя канала</Form.Label>
            <InputGroup>
              <Form.Control
                ref={inputRef}
                type="text"
                name="channelName"
                id="channelName"
                onChange={formik.handleChange}
                value={formik.values.channelName}
                className={`${formik.errors.channelName ? 'is-invalid' : ''}`}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors?.channelName}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="d-flex justify-content-end gap-2">
            <Button
              className="btn-secondary"
              onClick={() => { dispatch(closeModal()); }}
            >
              Отменить
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Отправить'}
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
};

export default AddChannelForm;
