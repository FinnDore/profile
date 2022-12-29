import { shaderMaterial } from '@react-three/drei';
import type { ReactThreeFiber } from '@react-three/fiber';
import { extend } from '@react-three/fiber';
import type * as THREE from 'three';
import { Texture, Vector2, Vector3 } from 'three';

export type MosaicProps = {
    resolution: Vector2;
    zoom: number;
    xy: Vector3;
    time: number;
    uTexture: THREE.Texture;
};

const MosaicMaterial = shaderMaterial(
    {
        time: 0,
        resolution: new Vector2(1, 1),
        zoom: 1,
        uTexture: new Texture(),
        xy: new Vector3(1, 1, 1)
    },
    `

    #ifdef GL_ES
    precision mediump float;
    #endif
    

    varying vec3 Position;
    varying vec2 vUv;   


    void main() {
        vUv = uv;
        gl_Position =  projectionMatrix * modelViewMatrix * vec4(position, 1.0);  
    }
    `,
    `

    #ifdef GL_ES
    precision mediump float;
    #endif

    uniform vec2 resolution;
    uniform vec2 u_mouse;
    uniform float time;
    uniform sampler2D uTexture;

    #define PI (3.14159265359)
    #define TWO_PI (6.28318530718)

    varying vec2 vUv;

    float blendColorDodge(float base, float blend) {
        return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
    }

    vec3 blendColorDodge(vec3 base, vec3 blend) {
        return vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));
    }

    vec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {
      return (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));
    }

    float blendColorBurn(float base, float blend) {
        return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
    }
    
    vec3 blendColorBurn(vec3 base, vec3 blend) {
        return vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));
    }
    
    vec3 blendColorBurn(vec3 base, vec3 blend, float opacity) {
        return (blendColorBurn(base, blend) * opacity + base * (1.0 - opacity));
    }

    vec3 rgb(int r, int g, int b) {
        return vec3(r, g, b) / 255.0;
    }

    mat2 Rotate(float angle) {
        float s = sin(angle);
        float c = cos(angle);

        return mat2(c, -s, s, c);
    }

    float Shape(vec2 st, vec2 p, float size, float sides, float blur) {
        vec2 pos = vec2(p) - st;
        float a = atan(pos.x, pos.y) + PI;
        float r = TWO_PI / sides;
        float d = cos(floor(0.5 + a / r) * r - a) * length(pos);

        float color = smoothstep(size + blur, size - 0.0, d);

        return color;
    }

    float hollowTriangle(vec2 uv, vec2 position, float size, float blur) {
        float sides = 3.0;

        return Shape(uv, position, size, sides, blur) -
        Shape(uv, position, size - 0.02, sides, blur);
    }

    float ring(vec2 p, float radius, float width) {
        return abs(length(p) - radius * 0.5) - width;
    }

    float smoothedge(float v) {
        return smoothstep(0.0, 1.0 / resolution.x, v);
    }

    vec3 Tiles(vec2 uv) {
        vec3 result = vec3(0.0);
        float zoom =  16.;
        vec2 gv = fract(uv * zoom);
        vec2 id = floor(uv * zoom);
        for (float y = -1.0; y <= 1.0; y++) {
            for (float x = -1.0; x <= 1.0; x++) {
                vec2 tileOffset = vec2(x, y);
                vec2 triangleID = id + tileOffset;
                vec2 tileShift = vec2(mod(triangleID.y, 2.0) * 0.5, 0.0);

                if (
                    hollowTriangle(
                        gv - tileOffset - tileShift,
                        vec2(0.5),
                        0.19,
                        0.001
                    ) ==
                    1.0
                ) {
                    result += vec3(0.51, 0.51, 0.51);
                }

                // Create a new set of UVs named  and rotate them around their center
                vec2 st = (gv - 0.5) * Rotate(PI) + 0.5;

                // Offset the new UVs by half of the width plus
                // an arbitrary value for the Y axis.
                st -= vec2(0.5, 0.37);

                if (
                    hollowTriangle(
                        st - tileOffset + tileShift,
                        vec2(0.5),
                        0.254,
                        0.001
                    ) ==
                    1.0
                ) {
                    result += vec3(0.069, 0.069, 0.069);
                }

                if (
                    hollowTriangle(
                        st - tileOffset + tileShift,
                        vec2(0.5),
                        0.142,
                        0.001
                    ) ==
                    1.0
                ) {
                    result += vec3(0.8, 0.8, 0.8);
                }
            }
        }

        return result;
    }

    void main() {
        vec3 color = vec3(0.0);
        vec2 st =  gl_FragCoord.xy / resolution.x / 150.0;
        st -= vec2(0.5);
        st = Rotate( 2.25 * PI) * st;
        st += vec2(0.5);
        vec2 uv = st * 2.0 - 1.0;
        uv.x *= resolution.x / resolution.y;

        color += Tiles(uv);

        vec3 col = vec3(uv, sin(time));
        float speed = 0.0405;
        vec2 center = vec2(1.5, 0.5);
        float x = center.x - st.x;
        float y = (center.y - st.y) * resolution.x / resolution.y;

        float r = -(x * x + y * y);
        //float r = -sqrt(x*x + y*y);
        float ouuterZz = 0.1 + 0.5 * sin((r + time * speed) / 0.117);
        float innerZ = 1.0 + 0.5 * sin((r + time * speed) / 0.053);
        bool isOuterTrigangle = color.r == 0.069;
        if (isOuterTrigangle && ouuterZz > 0.1) {
            color.rgb = vec3(0.4) * ouuterZz;
        } else if (isOuterTrigangle) {
            color.rgb = vec3(0.0);
        } else {
            color *= innerZ;
        }

        if (color.r == 0.) {
            gl_FragColor = vec4(color, 1.);
            return;
        }

        vec3 bgColor = texture2D(uTexture, vUv).rgb;

        gl_FragColor = vec4(bgColor / 4., 1.); 
        // gl_FragColor = vec4(color, 1.);
        gl_FragColor = vec4(blendColorBurn(color /1.2, bgColor / 3.), 1.0); 
        // gl_FragColor = vec4(vec3(ouuterZz), 1.0);
    }
  `
);

extend({ MosaicMaterial });

declare module '@react-three/fiber' {
    interface ThreeElements {
        mosaicMaterial: ReactThreeFiber.MaterialNode<
            THREE.ShaderMaterial & MosaicProps,
            MosaicProps
        >;
    }
}
