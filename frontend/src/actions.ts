export const actionCreator: <T, P>(type: T) => (payload: P) => Action<T, P> = (type) => (payload) => ({
    type,
    payload
});

type Action<T, P> = {
    type: T,
    payload: P
};