const FIREBASE_CONFIG = {
    dev: {
        apiKey: "AIzaSyCZhvf-ynyiL3ntY_Y44RtGTmaJqgpC8M4",
        authDomain: "kamimind-dev.firebaseapp.com",
        projectId: "kamimind-dev",
        storageBucket: "kamimind-dev.appspot.com",
        messagingSenderId: "824342917424",
        appId: "1:824342917424:web:b70a39883487a40bfa58f5",
        measurementId: "G-VNWNZS98WF",
    },
    prod: {
        apiKey: "AIzaSyAAo0ayi23YKGuRXMIVqNBgUl38hG5HIms",
        authDomain: "sound-mantra-399504.firebaseapp.com",
        projectId: "sound-mantra-399504",
        storageBucket: "sound-mantra-399504.appspot.com",
        messagingSenderId: "1080099493815",
        appId: "1:1080099493815:web:e770f98f56bfb7ebaefa32",
        measurementId: "G-CJD0VT460X",
    },
};

const hosts = {
    dev: {
        API_HOST: "https://api.dev.kamimind.ai/api",
        CORE_HOST: "https://api.dev.kamimind.ai/core",
        INDEX_HOST: "https://api.dev.kamimind.ai/index",
        VOICE_HOST: "https://tts.dev.kamimind.ai/api/v2",
        FIREBASE: FIREBASE_CONFIG.dev,
    },
    prod: {
        API_HOST: "https://api.kamimind.ai/api",
        CORE_HOST: "https://api.kamimind.ai/core",
        INDEX_HOST: "https://api.kamimind.ai/index",
        VOICE_HOST: "https://tts.kamimind.ai/api/v2",
        FIREBASE: FIREBASE_CONFIG.prod,
    },
};

const hostByEnv = new Proxy(hosts, {
    get: (target, prop) => {
        return Reflect.get(target, prop);
    },
});

const environment = import.meta.env.VITE_ENV === "production" ? "prod" : "dev";
const { API_HOST, CORE_HOST, INDEX_HOST, VOICE_HOST, FIREBASE } = hostByEnv[environment];
export { API_HOST, CORE_HOST, INDEX_HOST, VOICE_HOST, FIREBASE };
