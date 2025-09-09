const FIREBASE_CONFIG = {
    dev: {},
    prod: {},
};

const hosts = {
    dev: {
        API_HOST: "http://localhost:6969/api",
        FIREBASE: FIREBASE_CONFIG.dev,
    },
    prod: {
        API_HOST: "https://tam-van-be.onrender.com",
        FIREBASE: FIREBASE_CONFIG.prod,
    },
};

const hostByEnv = new Proxy(hosts, {
    get: (target, prop) => {
        return Reflect.get(target, prop);
    },
});

const environment = import.meta.env.VITE_ENV === "production" ? "prod" : "dev";
const { API_HOST, FIREBASE } = hostByEnv[environment];
export { API_HOST, FIREBASE };
