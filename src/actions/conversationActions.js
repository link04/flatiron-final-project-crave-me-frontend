
export const loadConversations = (conversations) => ({ type: 'LOAD_CONVERSATIONS', payload: conversations })

export const updateConversations = (conversation) => ({type: 'UPDATE_CONVERSATIONS', payload: conversation })

export const updateConversationMessages = (message) => ({type: 'UPDATE_CONVERSATION_MESSAGES', payload: message })

export const deleteConversation = (conversation) => ({type: 'DELETE_CONVERSATION', payload: conversation })
