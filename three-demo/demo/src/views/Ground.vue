<!--
 * @FilePath: \U-UCAREd:\NoteBook\three-demo\demo\src\views\Ground.vue
 * @Author: huangzq
 * @Date: 2020-09-18 17:24:36
 * @LastEditors: huangzq
 * @LastEditTime: 2020-09-18 18:06:15
-->
<template>
  <div id="container"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import Stats from "three/examples/jsm/libs/stats.module.js";

export default {
  data() {
    return {
      camera: null,
      controls: null,
      scene: null,
      renderer: null,
      stats: null,
      texture: null,
    };
  },

  mounted() {
    this.initScene();
    this.initCamera();
    this.initStats();
    this.initLight();
    this.initRender();
    this.loadGLTF();
    this.addSkybox();
    this.initControls();

    this.animate();
  },
  methods: {
    //初始化场景
    initScene() {
      this.scene = new THREE.Scene();
      this.clock = new THREE.Clock();
      this.scene.add(new THREE.AxesHelper(400));
    },

    //初始化相机
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        2000
      );

      this.camera.position.set(0, 10, 50);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    },
    //初始化光照
    initLight() {
      // 初始化灯光
      // 环境光 能保持整体都是亮点
      let ambientLight = new THREE.AmbientLight(0x666666);
      // 点光源 就像灯泡一样的效果  白色灯光 亮度0.6
      let pointLight = new THREE.PointLight(0xffffff, 0.6);

      // 将灯光加入到场景中
      this.scene.add(ambientLight);
      // 将灯光加到摄像机中 点光源跟随摄像机移动
      // 为什么这样做  因为这样可以让后期处理时的辉光效果更漂亮
      this.camera.add(pointLight);

      var directionalLight = new THREE.DirectionalLight(0xffffff, 0.3); //模拟远处类似太阳的光源
      directionalLight.color.setHSL(0.1, 1, 0.95);
      directionalLight.position.set(0, 200, 0).normalize();
      this.scene.add(directionalLight);
    },
    //初始化控制器
    initControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    },

    initRender() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true });

      // 初始化渲染器
      this.renderer = new THREE.WebGLRenderer({
        // 开启抗锯齿
        antialias: true,
        // 开启背景透明
        alpha: true,
      });
      // 把自动清除颜色缓存关闭 这个如果不关闭 后期处理这块会不能有效显示
      // 如果不这样做，每次调用效果组合器的render()函数时，之前渲染的场景会被清理掉。通过这种方法，我们只会在render循环开始时，把所有东西清理一遍。
      this.renderer.autoClear = false;
      // 背景透明 配合 alpha
      this.renderer.setClearColor(0xffffff, 0);
      this.renderer.setPixelRatio(window.devicePixelRatio);

      // 伽马值启动 更像人眼观察的场景
      this.renderer.gammaInput = true;
      this.renderer.gammaOutput = true;

      this.renderer.setSize(window.innerWidth, window.innerHeight);

      document.body.appendChild(this.renderer.domElement);

      //添加窗口监听事件（resize-onresize即窗口或框架被重新调整大小）
      window.addEventListener("resize", this.onWindowResize, false);

      //鼠标交互
      window.addEventListener("click", this.onMouseClick, false);
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
      this.composer.setSize(window.innerWidth, window.innerHeight);
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
      this.renderer.clear();
      this.renderer.render(this.scene, this.camera);

      var delt = this.clock.getDelta();
      this.controls.update(delt);
      requestAnimationFrame(this.animate);
    },

    //加载GLTF
    loadGLTF() {
      return new Promise((resolve) => {
        let gltfLoader = new GLTFLoader();
        gltfLoader.setPath(`/`);
        gltfLoader.load(
          `ground/HT科幻地面.gltf`,
          (obj) => {
            this.scene.add(obj.scene);
            resolve();
          },
          function (xhr) {
            if (xhr.lengthComputable) {
              var percentComplete = (xhr.loaded / xhr.total) * 100;
              console.log(Math.round(percentComplete, 2) + "% downloaded");
            }
          }
        );
      });
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