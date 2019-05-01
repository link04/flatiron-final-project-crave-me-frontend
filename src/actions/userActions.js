export const loadingManager = () => ({ type: 'UPDATE_LOADING'})

export const removeUser = () => ({ type: 'REMOVE_USER' })

export const createUser = (user) => ({ type: 'CREATE_USER', payload: user })

export const setUserCrave = (crave, matches) => ({ type: 'SET_USER_CRAVE', payload: {crave: crave, matches:matches}})

export const setUserMatches = (matches) => ({ type: 'SET_USER_MATCHES', payload: matches })

export const updateUser = (coordinates) => ({ type: 'UPDATE_USER', payload: coordinates })
