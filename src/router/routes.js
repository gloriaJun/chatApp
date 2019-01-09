const LOGIN = '/';
const CHAT_HOME = '/chat';
const CHAT_ROOM = `${CHAT_HOME}/:id`;

const routes = {
  login: LOGIN,
  chatHome: CHAT_HOME,
  chatRoom: id => (id ? `${CHAT_HOME}/${id}` : CHAT_ROOM),
};

export default routes;
