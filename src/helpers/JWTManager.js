const JWTManager = () => {
  let JWT = null;

  const getToken = () => JWT;

  const setToken = (token) => {
      JWT = token;
      return true;
  };

  const deleteToken = () => {
      JWT = null;
      return true;
  };

  return {
      getToken,
      setToken,
      deleteToken
  };
};

export default JWTManager();