const LOGIN = '/';
const CHAT_ROOM_LIST = '/rooms';
const CHAT_ROOM = '/rooms/:id';

const routes = {
  login: LOGIN,
  chatRoomList: CHAT_ROOM_LIST,
  chatRoom: id => (id ? `/rooms/${id}` : CHAT_ROOM),
};

export default routes;
