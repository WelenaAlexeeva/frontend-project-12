import React, { useEffect, useRef } from 'react';
import { Form, InputGroup, FormControl } from 'react-bootstrap';
import SendMessageButton from './SendMessageButton';
import { useFormik } from 'formik';
import { useAddMessageMutation } from '../services/chatApi';
import filter from 'leo-profanity';

const MessagesForm = ({ channelId }) => {
  const [addMessage] = useAddMessageMutation();
  const messageFormField = useRef(null);

  useEffect(() => {
    messageFormField.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: async (values) => {
      try {
        const body = filter.clean(values.message.trim());
        if (!body || !channelId) return;

        const username = localStorage.getItem('username');

        await addMessage({ body, channelId, username });
        formik.values.message = '';
        messageFormField.current.focus();
      }
      catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
      }
    },
  });

  return (
    <Form noValidate className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <InputGroup hasValidation>
        <FormControl
          ref={messageFormField}
          name="message"
          id="message"
          onChange={formik.handleChange}
          value={formik.values.message}
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2"
          autoComplete="off"
        />
        <SendMessageButton disabled={!formik.values.message || false} />
      </InputGroup>
    </Form>
  );
};

export default MessagesForm;
