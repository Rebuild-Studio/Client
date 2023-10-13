import * as THREE from "three";

const cartoonShader = new THREE.ShaderMaterial({
    type: 'Cartoon Shader',
      lights: true,
      uniforms: {
        ...THREE.UniformsLib.lights,
        ...THREE.UniformsLib.common,
        uColor: { value: new THREE.Color("#00CCBB") },
        uGlossiness: { value: 3 },
        uTexture: new THREE.Texture(),
        uTime: 0
      },
      vertexShader: /* glsl */ `  
  
        #include <common>
        #include <shadowmap_pars_vertex>    
  
        varying vec3 vNormal;
        varying vec3 vViewDir;
        varying vec2 vUv; //allows data to be used outside
        uniform float uTime;
  
        void main() {
  
          #include <beginnormal_vertex>
          #include <defaultnormal_vertex>
  
          #include <begin_vertex>
  
          #include <worldpos_vertex>
          #include <shadowmap_vertex>
          vUv = uv;
          vec3 pos = position;
       
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 clipPosition = projectionMatrix * viewPosition;
        
          vNormal = normalize(normalMatrix * normal);
          vViewDir = normalize(-viewPosition.xyz);
        
          gl_Position = clipPosition;
        }
      `
      ,
      fragmentShader: /* glsl */  ` 
      #include <common>
      #include <packing>
      #include <lights_pars_begin>
      #include <shadowmap_pars_fragment>
      #include <shadowmask_pars_fragment>
  
      uniform vec3 uColor;
      uniform float uGlossiness;

      uniform sampler2D uTexture;

      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec2 vUv;

      #ifdef USE_MAP
          uniform sampler2D map;
      #endif

      uniform vec3 diffuse;
      
      void main() {
        // shadow map
        #if NUM_DIR_LIGHTS >0
          DirectionalLightShadow directionalShadow = directionalLightShadows[0];
        #endif
  
        #if NUM_POINT_LIGHTS > 0
          PointLight pointLights[ NUM_POINT_LIGHTS ];
        #endif

        //vec3 texture = texture2D(uTexture, vUv).rgb;
        #ifdef USE_MAP
          vec3 texture = texture2D(map, vUv).rgb;
        #endif
  
        float shadow = getShadow(
          directionalShadowMap[0],
          directionalShadow.shadowMapSize,
          directionalShadow.shadowBias,
          directionalShadow.shadowRadius,
          vDirectionalShadowCoord[0]
        );
      
        // directional light
        float NdotL = dot(vNormal, directionalLights[0].direction);
        float lightIntensity = smoothstep(0.0, 0.01, NdotL * shadow); 
        vec3 directionalLight = directionalLights[0].color * lightIntensity;
      
        // specular reflection
        vec3 halfVector = normalize(directionalLights[0].direction + vViewDir);
        float NdotH = dot(vNormal, halfVector);
      
        float specularIntensity = pow(NdotH * lightIntensity, 1000.0 / uGlossiness);
        float specularIntensitySmooth = smoothstep(0.05, 0.1, specularIntensity);
      
        vec3 specular = specularIntensitySmooth * directionalLights[0].color;
      
        // rim lighting
        float rimDot = 1.0 - dot(vViewDir, vNormal);
        float rimAmount = 0.6;
      
        float rimThreshold = 0.2;
        float rimIntensity = rimDot * pow(NdotL, rimThreshold);
        rimIntensity = smoothstep(rimAmount - 0.01, rimAmount + 0.01, rimIntensity);
      
        vec3 rim = rimIntensity * directionalLights[0].color;
      
        #ifdef USE_MAP
          gl_FragColor = vec4(texture * diffuse * (ambientLightColor + directionalLight + specular + rim), 1.0);
        #else
          gl_FragColor = vec4(diffuse * (ambientLightColor + directionalLight/2.5 + specular + rim), 1.0); //directional light intensity reduced for MXStudio
        #endif

        //gl_FragColor = vec4(texture * uColor * (ambientLightColor + directionalLight + specular + rim), 1.0);
      }
        
      `
});

const waveShader = new THREE.ShaderMaterial({
  uniforms:{
    u_time: Date.now(),
    ...THREE.UniformsLib.lights,
    ...THREE.UniformsLib.common,
    uTime: 0,
    uTexture: new THREE.Texture(),
  },

  vertexShader: /* glsl */ `

  // Normal
  varying vec2 vUv;
  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vViewDir;


  void main(void) {

    vec4 result;
    vec3 pos = position;

    vUv = uv;
    result = vec4(position.x, sin((position.z)*5.0 + uTime)/10.0 + position.y, position.z, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * result;


  }
  `,

  fragmentShader: /* glsl */ `

    uniform float uTime;
    uniform vec3 diffuse;

    #ifdef USE_MAP
      uniform sampler2D map;
    #endif

    varying vec2 vUv;

    void main(){

      #ifdef USE_MAP
        vec3 texture = texture2D(map, vUv).rgb;
      #endif

      #ifdef USE_MAP
        gl_FragColor = vec4(texture * diffuse, 1.0);
      #else
        gl_FragColor = vec4(diffuse, 1.0);
      #endif
    }
  `,
});


const cartoonWaveShader = new THREE.ShaderMaterial({
  type: 'Cartoon Shader',
    lights: true,
    uniforms: {
      ...THREE.UniformsLib.lights,
      ...THREE.UniformsLib.common,
      uColor: { value: new THREE.Color("#00CCBB") },
      uGlossiness: { value: 3 },
      uTexture: new THREE.Texture(),
      uTime: 0
    },
    vertexShader: /* glsl */ `  

      #include <common>
      #include <shadowmap_pars_vertex>    

      varying vec3 vNormal;
      varying vec3 vViewDir;
      varying vec2 vUv; //allows data to be used outside
      uniform float uTime;
      vec4 result;

      void main() {

        #include <beginnormal_vertex>
        #include <defaultnormal_vertex>

        #include <begin_vertex>

        #include <worldpos_vertex>
        #include <shadowmap_vertex>
        vUv = uv;
        vec3 pos = position;

        result = vec4(position.x, sin((position.z)*5.0 + uTime)/10.0 + position.y, position.z, 1.0);
     
        vec4 modelPosition = modelMatrix * result;
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 clipPosition = projectionMatrix * viewPosition;

        
      
        vNormal = normalize(normalMatrix * normal);
        vViewDir = normalize(-viewPosition.xyz);
      
        gl_Position = clipPosition;
      }
    `
    ,
    fragmentShader: /* glsl */  ` 
    #include <common>
    #include <packing>
    #include <lights_pars_begin>
    #include <shadowmap_pars_fragment>
    #include <shadowmask_pars_fragment>

    uniform vec3 uColor;
    uniform float uGlossiness;

    uniform sampler2D uTexture;

    varying vec3 vNormal;
    varying vec3 vViewDir;
    varying vec2 vUv;

    #ifdef USE_MAP
        uniform sampler2D map;
    #endif

    uniform vec3 diffuse;
    
    void main() {
      // shadow map
      #if NUM_DIR_LIGHTS >0
        DirectionalLightShadow directionalShadow = directionalLightShadows[0];
      #endif

      #if NUM_POINT_LIGHTS > 0
        PointLight pointLights[ NUM_POINT_LIGHTS ];
      #endif

      //vec3 texture = texture2D(uTexture, vUv).rgb;
      #ifdef USE_MAP
        vec3 texture = texture2D(map, vUv).rgb;
      #endif

      float shadow = getShadow(
        directionalShadowMap[0],
        directionalShadow.shadowMapSize,
        directionalShadow.shadowBias,
        directionalShadow.shadowRadius,
        vDirectionalShadowCoord[0]
      );
    
      // directional light
      float NdotL = dot(vNormal, directionalLights[0].direction);
      float lightIntensity = smoothstep(0.0, 0.01, NdotL * shadow); 
      vec3 directionalLight = directionalLights[0].color * lightIntensity;
    
      // specular reflection
      vec3 halfVector = normalize(directionalLights[0].direction + vViewDir);
      float NdotH = dot(vNormal, halfVector);
    
      float specularIntensity = pow(NdotH * lightIntensity, 1000.0 / uGlossiness);
      float specularIntensitySmooth = smoothstep(0.05, 0.1, specularIntensity);
    
      vec3 specular = specularIntensitySmooth * directionalLights[0].color;
    
      // rim lighting
      float rimDot = 1.0 - dot(vViewDir, vNormal);
      float rimAmount = 0.6;
    
      float rimThreshold = 0.2;
      float rimIntensity = rimDot * pow(NdotL, rimThreshold);
      rimIntensity = smoothstep(rimAmount - 0.01, rimAmount + 0.01, rimIntensity);
    
      vec3 rim = rimIntensity * directionalLights[0].color;
    
      #ifdef USE_MAP
        gl_FragColor = vec4(texture * diffuse * (ambientLightColor + directionalLight + specular + rim), 1.0);
      #else
        gl_FragColor = vec4(diffuse * (ambientLightColor + directionalLight/2.5 + specular + rim), 1.0); //directional light intensity reduced for MXStudio
      #endif

      //gl_FragColor = vec4(texture * uColor * (ambientLightColor + directionalLight + specular + rim), 1.0);
    }
      
    `
});



export {cartoonShader, waveShader, cartoonWaveShader}

