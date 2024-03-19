var onlineUsersFunc = (function () {
    var onlineUsers = new Map();
    let onlineUserIds = {};
    let currentChatWindow = new Map();
    var getUserData = function (userId) 
    {
      return onlineUsers.get(userId);
    };
    var setUserData = function (userId, socketId) {
        onlineUsers.set(userId, socketId);
        onlineUserIds[userId]=true;
    };
    var setCurrentChatWindow = function(userId,windowId){
        currentChatWindow.set(userId, windowId);
    }
    var getCurrentChatWindow = function(userId) {
        return currentChatWindow.get(userId);
    }
    return {
        getUserData: getUserData,
        setUserData: setUserData,
        onlineUsers: onlineUsers,
        currentChatWindow: currentChatWindow,
        onlineUserIds: onlineUserIds,
        setCurrentChatWindow: setCurrentChatWindow,
        getCurrentChatWindow: getCurrentChatWindow,
      }
  })();
  
export default onlineUsersFunc;