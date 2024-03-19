
var UserProfile = (function () {
    var udata;
    var initialResponses;
    var getUserData = function () {
      return udata;
    };
    var setUserData = function (UserData) {
        udata = UserData;
    };
    var getInitialResponses = function () {
      return initialResponses;
    };
    var setInitialResponses = function (val) {
      initialResponses= val;
    };


    return {
      getUserData: getUserData,
      setUserData: setUserData,
      getInitialResponses: getInitialResponses,
      setInitialResponses: setInitialResponses,
    }
  
  })();
  
  export default UserProfile;