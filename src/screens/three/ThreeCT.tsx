import React, { useEffect } from "react";
import ThreePT from "./ThreePT";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import star from "assets/images/star.svg"

const ThreeCT = () => {
  useEffect(() => {
    // createCube();
    // createLine();
    // createLoader();
    createDonut();
  });

  const createCube = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const threeTag = document.getElementById("three");
    threeTag && threeTag.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff80 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    function animate() {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    }

    animate();
  };

  const createLine = () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      500,
    );
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    const threeTag = document.getElementById("three");
    threeTag && threeTag.appendChild(renderer.domElement);

    const material = new THREE.LineBasicMaterial({ color: 0x0000ff });

    const points = [];
    points.push(new THREE.Vector3(-10, 0, 0));
    points.push(new THREE.Vector3(0, 10, 0));
    points.push(new THREE.Vector3(10, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const line = new THREE.Line(geometry, material);

    scene.add(line);
    renderer.render(scene, camera);
  };

  const createLoader = () => {
    const scene = new THREE.Scene();
    const loader = new GLTFLoader();

    loader.load(
      "path/to/model.glb",
      function (gltf) {
        scene.add(gltf.scene);
      },
      undefined,
      function (error) {
        console.error(error);
      },
    );
  };

  const createDonut = () => {
    // Scene
    const scene = new THREE.Scene();
    //size
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    //camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100,
    );
    camera.position.z = 2;
    scene.add(camera);
    //renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(new THREE.Color("#21282a"), 1);

    const threeTag = document.getElementById("three");
    threeTag && threeTag.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
      // Update sizes
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // Update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // Update renderer
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
    // Objects
    // sphere
    const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
    const material = new THREE.PointsMaterial({
      size: 0.005,
      color: 0x87a7ca,
    });
    const sphere = new THREE.Points(geometry, material);
    scene.add(sphere);

    //particle
    const particlesGeometry = new THREE.BufferGeometry();
    const loader = new THREE.TextureLoader();
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    canvas.height = 100;
    canvas.width = 100;
    if (ctx) {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(50, 50, 25, 0, 2 * Math.PI);
      ctx.fill();
    }

    const _star = loader.load(star);
    const particlesmaterial = new THREE.PointsMaterial({
      size: 0.01,
      map: _star,
      transparent: true,
    });
    const particlesCnt = 2000;
    const posArray = new Float32Array(particlesCnt * 3);
    // xyz,xyz,xyz , xyz
    for (let i = 0; i < particlesCnt * 3; i++) {
      //posArray[i] = Math.random()
      //   posArray[i] = Math.random() - 0.5
      //   posArray[i] = (Math.random() - 0.5) * 5
      posArray[i] = (Math.random() - 0.5) * (Math.random() * 5);
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3),
    );

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesmaterial,
    );
    scene.add(particlesMesh);

    /**
     * Animate
     */

    const clock = new THREE.Clock();

    const animate = () => {
      window.requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();
      // Update objects
      sphere.rotation.y = 0.5 * elapsedTime;
      particlesMesh.rotation.y = -1 * (elapsedTime * 0.1);

      renderer.render(scene, camera);
    };

    animate();
  };

  return <ThreePT />;
};

export default ThreeCT;
