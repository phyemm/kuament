<!--
 * @FilePath: \U-UCAREd:\NoteBook\three-demo\demo\src\views\Earth.vue
 * @Author: huangzq
 * @Date: 2020-09-18 17:24:36
 * @LastEditors: huangzq
 * @LastEditTime: 2020-09-29 17:57:13
-->
<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
// import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
// import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
// import { CopyShader } from "three/examples/jsm/shaders/CopyShader.js";
// import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";
import Stats from "three/examples/jsm/libs/stats.module.js";
import * as Glow from "../assets/js/glow";

export default {
  data() {
    return {
      camera: null,
      controls: null,
      scene: null,
      renderer: null,
      stats: null,
      texture: null,
      blurScene: null,
      hasGlow: false,
      cloud: null,
    };
  },

  async mounted() {
    this.initScene();
    this.initCamera();
    this.initStats();
    this.initLight();
    this.initRender();
    this.initEarth();
    this.initCloud();
    this.createOutGlow();
    this.addSkybox();
    this.initControls();
    this.animate();
  },
  methods: {
    //初始化场景
    initScene() {
      this.scene = new THREE.Scene();
      this.clock = new THREE.Clock();
      //   this.scene.add(new THREE.AxesHelper(400));
    },

    //初始化相机
    initCamera() {
      //   this.camera = new THREE.PerspectiveCamera(
      //     45,
      //     window.innerWidth / window.innerHeight,
      //     1,
      //     2000
      //   );

      //   this.camera.position.set(0, 10, 50);
      //   this.camera.lookAt(new THREE.Vector3(0, 0, 0));
      this.camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      this.camera.position.set(0, 0, -28);
      this.scene.add(this.camera); // this is required cause there is a light under camera
    },
    //初始化光照
    initLight() {
      // 初始化灯光
      // 环境光 能保持整体都是亮点
      let ambientLight = new THREE.AmbientLight(0x393939, 0.5);

      // 将灯光加入到场景中
      this.scene.add(ambientLight);

      let spotLight = new THREE.SpotLight(0xffffff, 1.2);
      spotLight.position.set(-26, 11, -11);
      spotLight.angle = 0.2;
      spotLight.castShadow = false;
      spotLight.penumbra = 0.4;
      spotLight.distance = 124;
      spotLight.decay = 1;
      spotLight.shadow.camera.near = 50;
      spotLight.shadow.camera.far = 200;
      spotLight.shadow.camera.fov = 35;
      spotLight.shadow.mapSize.height = 1024;
      spotLight.shadow.mapSize.width = 1024;
      this.scene.add(spotLight);

      let light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(5, 3, 5);
      this.scene.add(light);
    },
    //初始化控制器
    initControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.autoRotate = true;
      this.controls.autoRotateSpeed = 0.5;
    },

    initRender() {
      this.renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
      });

      // 背景透明 配合 alpha
      this.renderer.setClearColor(0x000000, 0);
      //   this.renderer.setPixelRatio(window.devicePixelRatio);

      // 伽马值启动 更像人眼观察的场景
      this.renderer.gammaInput = true;
      this.renderer.gammaOutput = true;

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.domElement.style.position = "relative";
      this.renderer.domElement.style.width = window.innerWidth / 2 + "px";
      this.renderer.domElement.style.height = window.innerHeight / 2 + "px";
      document.body.appendChild(this.renderer.domElement);

      //添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
      window.addEventListener("resize", this.onWindowResize, false);
    },
    getTexture(name) {
      let loader = new THREE.TextureLoader();

      return loader.load(name);
    },
    initEarth() {
      let earth = new THREE.Mesh(
        new THREE.SphereGeometry(5, 32, 32),
        new THREE.MeshPhongMaterial({
          map: this.getTexture("earth4.jpg"),
          bumpMap: this.getTexture("earth_bump.jpg"),
          bumpScale: 0.15,
          specularMap: this.getTexture("earth_spec.jpg"),
          specular: new THREE.Color("#909090"),
          shininess: 5,
          transparent: true,
        })
      );
      this.scene.add(earth);
    },
    initCloud() {
      this.cloud = new THREE.Mesh(
        new THREE.SphereGeometry(5.2, 40, 40),
        new THREE.MeshPhongMaterial({
          map: this.getTexture("earth_cloud.png"),
          transparent: true,
          opacity: 1,
          blending: THREE.AdditiveBlending,
        })
      );
      this.scene.add(this.cloud);
    },
    createOutGlow() {
      //
      this.blurScene = new THREE.Scene();
      this.blurScene.add(Glow.createOuterGlow());

      let blurRenderTarget = new THREE.WebGLRenderTarget(
        window.innerWidth,
        window.innerHeight,
        {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          format: THREE.RGBAFormat,
          stencilBuffer: true,
        }
      );

      let blurRenderPass = new RenderPass(this.blurScene, this.camera);
      let sceneRenderPass = new RenderPass(this.scene, this.camera);

      this.blurComposer = new EffectComposer(this.renderer, blurRenderTarget);
      this.blurComposer.addPass(blurRenderPass);

      this.sceneComposer = new EffectComposer(this.renderer, blurRenderTarget);
      this.sceneComposer.addPass(sceneRenderPass);

      let effectBlend = new ShaderPass(Glow.AdditiveBlendShader, "tSampler1");
      effectBlend.uniforms[
        "tSampler2"
      ].value = this.blurComposer.renderTarget2.texture;
      effectBlend.renderToScreen = true;

      this.sceneComposer.addPass(effectBlend);
      this.hasGlow = true;
    },
    // 初始化性能插件
    initStats() {
      this.stats = new Stats();
      this.stats.domElement.style.position = "absolute";
      this.stats.domElement.style.left = "0px";
      this.stats.domElement.style.top = "0px";
      document.body.appendChild(this.stats.domElement);
    },
    //窗口监听函数
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    //region 放置天空盒
    addSkybox() {
      //   let urls = [
      //     "image/star_sky/right.jpg", // right
      //     "image/star_sky/left.jpg", // left
      //     "image/star_sky/top.jpg", // top
      //     "image/star_sky/bottom.jpg", // bottom
      //     "image/star_sky/front.jpg", // front
      //     "image/star_sky/back.jpg", // back
      //   ];

      //   this.scene.background = new THREE.CubeTextureLoader().load(urls);
      var skyMap = new THREE.TextureLoader().load("/ground/image/星空球2.jpg");
      this.scene.background = skyMap;
    },
    animate() {
      this.stats.update();
      // 由于把renderer autoClear  关闭了 所以我们要在渲染函数中手动清除
      //   this.renderer.clear();
      //   this.renderer.render(this.scene, this.camera);
      if (this.hasGlow) {
        // let rotationSpeed = 0.001;

        // this.camera.position.x =
        //   this.camera.position.x * Math.cos(rotationSpeed) -
        //   this.camera.position.z * Math.sin(rotationSpeed);
        // this.camera.position.z =
        //   this.camera.position.z * Math.cos(rotationSpeed) +
        //   this.camera.position.x * Math.sin(rotationSpeed);

        // TODO: 云层的旋转
        this.cloud.rotation.y += 0.0005;

        this.blurComposer.render();
        this.sceneComposer.render();
      } else {
        this.renderer.render(this.scene, this.camera);
      }
      var delt = this.clock.getDelta();
      this.controls.update(delt);
      requestAnimationFrame(this.animate);
    },

    beforeDestroy() {
      var canvas = document.getElementById("canvas");
      var gl = canvas.getContext("webgl");

      canvas.addEventListener(
        "webglcontextlost",
        function (e) {
          console.log(e);
        },
        false
      );

      gl.getExtension("WEBGL_lose_context").loseContext();
    },
  },
};
</script>
<style  scoped>
</style>