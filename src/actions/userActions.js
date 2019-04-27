export const loadingManager = () => ({ type: 'UPDATE_LOADING'})

export const removeUser = () => ({ type: 'REMOVE_USER' })

export const createUser = (user) => ({ type: 'CREATE_USER', payload: user })
