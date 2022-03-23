import userReducer from './userSlice';
import filesReducer from './filesSlice';

const reducer = {
  user: userReducer,
  files: filesReducer,
};

export default reducer;
