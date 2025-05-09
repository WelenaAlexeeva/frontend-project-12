import { exists } from "i18next";
import AddChannelForm from "../components/Forms/AddChannelForm";
import LoginPage from "../pages/LoginPage";

export default {
  translation: {
    nav: {
      homePage: 'Вернуться на главную',
      registrationPage: 'Регистрация',
      navbarBrandText: 'Hexlet Chat',
      logoutButton: 'Выйти',
    },
    loginPage: {
      textBellowForm: 'Нет аккаунта?'
    },
    loginForm: {
      title: 'Войти',
      login: 'Ваш ник',
      password: 'Пароль',
      submitButton: 'Войти',
      errors: {
        illegalPassOrLogin: 'Неверные имя пользователя или пароль',
      },
  
    },
    registrationForm: {
      title: 'Регистрация',
      login: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submitButton: 'Зарегистрироваться',
      errors: {
        exists: 'Такой пользователь уже существует',
      }

    },

    channelInfo: {
      messages: {
        count_one: '{{count}} сообщение',
        count_few: '{{count}} сообщения',
        count_many: '{{count}} сообщений',
      },
    },

    channelControls: {
      hint: 'Управление каналом',
      rename: 'Переименовать',
      delete: 'Удалить',
    },

    channelForm: {
      channelName: 'Имя канала',
      cancelBtn: 'Отменить',
      submitBtn: 'Отправить',
      errors: {
        exists: 'Такое имя уже существует!',
      },
    },
    
    addChannelModal: {
      title: 'Добавить канал',
    },
    editChannelModal: {
      title: 'Переименовать канал',
    },
    deleteChannelModal: {
      title: 'Удалить канал',
      text: 'Уверены?',
      cancelButton: 'Отменить',
      deleteButton: 'Удалить',
    },
  

    messageForm: {
      ariaLabel: 'Новое сообщение',
      placeholder: 'Введите сообщение...',
      submitButton: 'Отправить',
      error: 'Ошибка при отправке сообщения',
    },
    
    formValidation: {
      required: 'Обязательное поле',
      min6: 'Не менее 6 символов',
      min3: 'От 3 до 20 символов',
      max20: 'От 3 до 20 символов',
      notOneOf: 'Имя должно быть уникальным',
      oneOf: 'Пароли должны совпадать',

    },
    toasts: {
      error: {
        connectionError: 'Ошибка соединения',
        authError: 'Ошибка авторизации',
        commonError: 'Ошибка',
      },
      success: {
        channel: {
          add: 'Канал создан',
          rename: 'Канал переименован',
          delete: 'Канал удалён',
        },
      },
    },
  
    


    notFound: {
      title: '404 - Страница не найдена',
      body: 'Извините, запрашиваемая страница не существует'
    },
  },
};