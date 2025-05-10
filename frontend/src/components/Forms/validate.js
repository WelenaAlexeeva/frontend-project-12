import * as Yup from 'yup';

export const channelFormValidationSchema = (channelsNames, t) => {
  return Yup.object().shape({
    channelName: Yup
      .string()
      .required(t('formValidation.required'))
      .min(3, t('formValidation.min3'))
      .max(20, t('formValidation.max20'))
      .trim()
      .notOneOf(channelsNames, t('formValidation.notOneOf')),
  });
};

export const registrationFormValidationSchema = (t) => {
  return Yup.object().shape({
    login: Yup
      .string()
      .required(t('formValidation.required'))
      .min(3, t('formValidation.min3'))
      .max(20, t('formValidation.max20'))
      .trim(),
    password: Yup
      .string()
      .min(6, t('formValidation.min6'))
      .required(t('formValidation.required')),
    confirmPassword: Yup
      .string()
      .oneOf([Yup.ref('password')], t('formValidation.oneOf'))
      .required(t('formValidation.required')),
  });
};
