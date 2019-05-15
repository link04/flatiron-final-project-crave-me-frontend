
const initialConversationsState = {
  conversations: []
};

const reducer = (conversationsState = initialConversationsState, action) => {
  switch (action.type) {
    case 'LOAD_CONVERSATIONS':
      return {...conversationsState, conversations: action.payload };
    case 'UPDATE_CONVERSATIONS':
      return {...conversationsState, conversations: [ ...conversationsState.conversations, action.payload] };
    case 'UPDATE_CONVERSATION_MESSAGES':
      const conversationsCopy = [...conversationsState.conversations ];
      const conversationCopy = conversationsCopy.find(conversation => conversation.id === action.payload.conversation_id);
      conversationCopy.messages = [...conversationCopy.messages, action.payload];
      return {...conversationsState, conversations: conversationsCopy };
    case 'DELETE_CONVERSATION':
      const filteredConversations = conversationsState.conversations.filter(conversation => conversation.id !== action.payload.conversation.id);
      return {...conversationsState, conversations: filteredConversations}
    default:
    return conversationsState

  }
}

export default reducer;
