module.exports = {
  development: {
    NODE_ENV: "development",
    PORT: 3000,
    DOMAIN_API: "https://presta.siilak.com/api/",
    WEBSERVICE_KEY: "8LSNZZYUSSE235XFLFSQPRUJ4FMC392B",
    ASSETS_FOLDER: "/assets/"
  },
  production: {
    NODE_ENV: "production",
    PORT: 8080,
    DOMAIN_API: "https://presta.siilak.com/api/",
    WEBSERVICE_KEY: "8LSNZZYUSSE235XFLFSQPRUJ4FMC392B",
    ASSETS_FOLDER: "/assets/"
  }
};
