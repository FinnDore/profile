import { shaderMaterial } from '@react-three/drei';
import type { ReactThreeFiber } from '@react-three/fiber';
import { extend } from '@react-three/fiber';
import type * as THREE from 'three';
import { Vector2 } from 'three';

export type BackgroundMaterialProps = {
    time: number;
    resolution: Vector2;
    zoom: number;
};

const BackgroundMaterial = shaderMaterial(
    {
        time: 0,
        resolution: new Vector2(1, 1),
        zoom: 256
    },
    `
    varying vec3 Normal;
    varying vec3 Position;
  
    void main() {
      Normal = normalize(normalMatrix * normal);
      Position = vec3(modelViewMatrix * vec4(position, 1.0));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    /*glsl*/ `
    #ifdef GL_ES
        precision mediump float;
    #endif
    
   

      #define PI 3.14159265358979323846
      #define TWO_PI 6.28318530717958647693
      #define PHI 1.618033988749894848204586834

      uniform vec2 resolution;
      uniform float time;
      uniform float zoom;


      void main() {
           vec2 pos = zoom * gl_FragCoord.xy / resolution.x;

          vec3 col = vec3(0.0);
          for( int i=0; i<10; i++ ) 
          {
              vec2 a = floor(pos);
              vec2 b = fract(pos);
              
              vec4 w = fract((sin(a.x*7.0+31.0*a.y + 0.001*time)+vec4(0.0,0.0,0.0,0.0))*14.0); // randoms
                      
              col += w.xyz *                                   // color
                     2.0*smoothstep(0.35,0.55,w.w) *           // intensity
                     sqrt( 16.0 *b.x *b.y*(1.-b.x)*(1.0-b.y) ); // pattern
              
              pos /= 2.0; // lacunarity
              col /= 2.0; // attenuate high frequencies
          }
          
          col = pow( col, vec3(0.995,0.927,0.942) );    // contrast and color shape
          
          gl_FragColor = vec4( col, 1.0 );
      }
      `
);

extend({ BackgroundMaterial });

declare module '@react-three/fiber' {
    interface ThreeElements {
        backgroundMaterial: ReactThreeFiber.MaterialNode<
            THREE.ShaderMaterial & BackgroundMaterialProps,
            BackgroundMaterialProps
        >;
    }
}
