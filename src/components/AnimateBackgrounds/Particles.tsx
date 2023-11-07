import { useEffect } from "react";
import BoxBase from "src/components/Boxs/BoxBase";
import { useEffectOnce } from "src/hooks/utils/useEffectOnce";

const Particles = () => {
    useEffectOnce(() => {
        window.loadParticles();
    });

    useEffect(() => {
        return () => {
            window.destroyParticles();
        };
    }, []);

    return (
        <BoxBase
            id="particles-js"
            sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                maxHeight: "inherit",
            }}
        ></BoxBase>
    );
};

export default Particles;
