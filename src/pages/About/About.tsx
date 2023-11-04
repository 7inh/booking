import { useEffect } from "react";
import auth from "src/common/instances/firebaseAuth-instance";
import { clearAuthData } from "src/common/internals";
import { clearAllStorage } from "src/common/utils";

const About = () => {
    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                user.getIdToken().then(async () => {
                    window.location.href = "/";
                });
            } else {
                clearAllStorage();
                clearAuthData();
                window.location.href = "/auth/login";
            }
        });
    }, []);

    return null;
};

export default About;
