const getEnv = (varName) => {
  const value = process.env[varName];

  if (!value) {
    throw `${varName} environment variable missing.`;
  }

  return value;
};

module.exports.getEnv = getEnv;