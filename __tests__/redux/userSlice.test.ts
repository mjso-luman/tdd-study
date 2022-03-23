import userReducer, { updateRole } from '../../src/redux/reducers/userSlice';

describe('userSlice', () => {
  it('should return the initial state', () => {
    const initialState = undefined;
    const action = { type: '' };
    const result = userReducer(initialState, action);
    expect(result).toEqual({ role: 'general' });
  });
  it('should update role', () => {
    const initialState = undefined;
    const action = updateRole('admin');
    const result = userReducer(initialState, action);
    expect(result).toEqual({ role: 'admin' });
  });
});
