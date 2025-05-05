export const apiPath = '/api/v1';

const routes = {
  homePagePath: '/',
  loginPagePath: '/login',
  registrationPagePath: '/signup',
  apiLogin: [apiPath, 'login'].join('/'),
  apiAddChannel: [apiPath, 'channels'].join('/'),
};

export default routes;
