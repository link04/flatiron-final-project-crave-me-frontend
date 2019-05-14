export const loadingManager = () => ({ type: 'UPDATE_LOADING'})

export const removeUser = () => ({ type: 'REMOVE_USER' })

export const createUser = (user, user_token) => ({ type: 'CREATE_USER', payload: {user:user, user_token:user_token }})

export const setUserCrave = (crave, matches) => ({ type: 'SET_USER_CRAVE', payload: {crave: crave, matches:matches}})

export const setUserMatches = (matches) => ({ type: 'SET_USER_MATCHES', payload: matches })

export const updateUser = (user) => ({ type: 'UPDATE_USER', payload: user })
