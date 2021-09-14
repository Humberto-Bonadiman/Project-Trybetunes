const USER_KEY = 'user';
const TIMEOUT = 1500;
const SUCCESS_STATUS = 'OK';

const readUser = () => JSON.parse(localStorage.getItem(USER_KEY));
const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));

// --------------------------------------------------------------------
// A função simulateRequest simula uma requisição para uma API externa
// Esse tipo de função que "chama outra função" é chamada de
// "currying function" https://javascript.info/currying-partials
// não se preocupe, estudaremos isso mais futuramente
// --------------------------------------------------------------------

const simulateRequest = (response) => (callback) => {
  setTimeout(() => {
    callback(response);
  }, TIMEOUT);
};

/* Para recuperar as informações da pessoa usuária, utilize a função getUser. Ela retornará
um objeto com as informações da pessoa logada caso exista. Atenção: caso não encontre nenhuma
informação da banda ou artista, a API retornará um objeto vazio. */

export const getUser = () => new Promise((resolve) => {
  let user = readUser();
  if (user === null) {
    user = {};
  }
  simulateRequest(user)(resolve);
});

/* Para criar um novo perfil, utilize a função createUser, ela recebe como parâmetro o objeto
que contém as informações da pessoa usuária. */

export const createUser = (user) => new Promise((resolve) => {
  const emptyUser = {
    name: '',
    email: '',
    image: '',
    description: '',
  };
  saveUser({ ...emptyUser, ...user });
  simulateRequest(SUCCESS_STATUS)(resolve);
});

/* Para atualizar as informações da pessoa logada, utilize a função updateUser. Assim como a
função anterior, ela também recebe um objeto com as informações que serão atualizadas, esse
objeto deve conter a mesma estrutura do anterior. */

export const updateUser = (updatedUser) => new Promise((resolve) => {
  saveUser({ ...updatedUser });
  simulateRequest(SUCCESS_STATUS)(resolve);
});
