"use client";

import { useEffect } from "react";

export default function StatueExperience() {
  useEffect(() => {
    const target = document.querySelector<HTMLElement>("[data-statue-model]");
    if (!target) return;
    const statueTarget = target;

    let disposed = false;
    let frame = 0;
    let renderer: import("three").WebGLRenderer | undefined;
    let sceneObserver: IntersectionObserver | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let disposeScene = () => {};
    let statueKeydown: ((event: KeyboardEvent) => void) | undefined;
    let cleanupListenersRef = () => {};

    async function initialize() {
      try {
        const THREE = await import("three");
        if (disposed) return;

        const scene = new THREE.Scene();
        disposeScene = () => {
          scene.traverse((object) => {
            if (!(object instanceof THREE.Mesh)) return;
            object.geometry.dispose();
            const materials = Array.isArray(object.material) ? object.material : [object.material];
            materials.forEach((material) => material.dispose());
          });
        };
        const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
        camera.position.set(0, 0.1, 7.3);
        camera.lookAt(0, -0.05, 0);

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.15;
        renderer.domElement.className = "statue-canvas";
        renderer.domElement.setAttribute("aria-hidden", "true");
        statueTarget.append(renderer.domElement);
        statueTarget.classList.add("has-3d-statue");

        scene.add(new THREE.HemisphereLight(0xf8ddb2, 0x21140c, 2.1));
        const keyLight = new THREE.DirectionalLight(0xffd49a, 4.3);
        keyLight.position.set(-3, 5, 5);
        scene.add(keyLight);
        const rimLight = new THREE.DirectionalLight(0x9bb9dc, 3.2);
        rimLight.position.set(3, 2, -4);
        scene.add(rimLight);
        const fillLight = new THREE.PointLight(0xffbd70, 1.6, 12);
        fillLight.position.set(0, 1, 4);
        scene.add(fillLight);

        const bronze = new THREE.MeshStandardMaterial({
          color: 0x896340,
          metalness: 0.72,
          roughness: 0.3,
        });
        const darkBronze = new THREE.MeshStandardMaterial({
          color: 0x453321,
          metalness: 0.62,
          roughness: 0.38,
        });
        const highlightBronze = new THREE.MeshStandardMaterial({
          color: 0xb28a54,
          metalness: 0.76,
          roughness: 0.27,
        });
        const statue = new THREE.Group();
        scene.add(statue);

        function addMesh(
          geometry: import("three").BufferGeometry,
          material: import("three").Material,
          position: [number, number, number],
          parent = statue,
        ) {
          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(...position);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          parent.add(mesh);
          return mesh;
        }

        function addLimb(
          start: import("three").Vector3,
          end: import("three").Vector3,
          radius: number,
          material: import("three").Material,
        ) {
          const direction = new THREE.Vector3().subVectors(end, start);
          const mesh = addMesh(
            new THREE.CylinderGeometry(radius * 0.82, radius, direction.length(), 10),
            material,
            [
              (start.x + end.x) / 2,
              (start.y + end.y) / 2,
              (start.z + end.z) / 2,
            ],
          );
          mesh.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 1, 0),
            direction.normalize(),
          );
          return mesh;
        }

        addMesh(new THREE.BoxGeometry(1.75, 0.17, 1.12), darkBronze, [0, -2.04, 0]);
        addMesh(new THREE.BoxGeometry(1.48, 0.22, 0.94), bronze, [0, -1.84, 0]);
        addMesh(new THREE.BoxGeometry(1.22, 0.55, 0.78), darkBronze, [0, -1.45, 0]);
        addMesh(new THREE.BoxGeometry(1.48, 0.14, 0.94), highlightBronze, [0, -1.11, 0]);
        addMesh(new THREE.BoxGeometry(1.02, 0.16, 0.67), bronze, [0, -0.96, 0]);

        addLimb(new THREE.Vector3(-0.2, -0.91, 0), new THREE.Vector3(-0.17, -0.1, 0), 0.17, darkBronze);
        addLimb(new THREE.Vector3(0.2, -0.91, 0), new THREE.Vector3(0.17, -0.1, 0), 0.17, darkBronze);
        addMesh(new THREE.BoxGeometry(0.68, 0.1, 0.42), bronze, [0, -0.82, 0.02]);
        addMesh(new THREE.BoxGeometry(0.46, 0.16, 0.48), darkBronze, [-0.17, -0.97, 0.12]);
        addMesh(new THREE.BoxGeometry(0.46, 0.16, 0.48), darkBronze, [0.17, -0.97, 0.12]);

        const coat = addMesh(new THREE.CapsuleGeometry(0.34, 0.64, 5, 12), bronze, [0, 0.36, 0]);
        coat.scale.set(1.15, 1, 0.78);
        const coatHem = addMesh(new THREE.CylinderGeometry(0.46, 0.51, 0.42, 12), bronze, [0, -0.11, 0]);
        coatHem.scale.z = 0.8;
        addMesh(new THREE.CylinderGeometry(0.13, 0.14, 0.2, 10), highlightBronze, [0, 0.93, 0]);
        const head = addMesh(new THREE.SphereGeometry(0.27, 16, 12), bronze, [0, 1.26, 0]);
        head.scale.set(0.85, 1.14, 0.86);
        addMesh(new THREE.SphereGeometry(0.25, 14, 8), darkBronze, [0, 1.43, -0.045]).scale.set(0.95, 0.53, 0.86);
        addMesh(new THREE.ConeGeometry(0.065, 0.14, 8), highlightBronze, [0, 1.23, 0.235])
          .rotation.x = Math.PI / 2;

        const leftShoulder = new THREE.Vector3(-0.36, 0.67, 0);
        const leftElbow = new THREE.Vector3(-0.54, 0.13, 0.01);
        const leftHand = new THREE.Vector3(-0.49, -0.42, 0.12);
        const rightShoulder = new THREE.Vector3(0.36, 0.67, 0);
        const rightElbow = new THREE.Vector3(0.53, 0.15, 0.1);
        const rightHand = new THREE.Vector3(0.49, -0.39, 0.15);
        addLimb(leftShoulder, leftElbow, 0.145, bronze);
        addLimb(leftElbow, leftHand, 0.105, bronze);
        addLimb(rightShoulder, rightElbow, 0.145, bronze);
        addLimb(rightElbow, rightHand, 0.105, bronze);
        addMesh(new THREE.SphereGeometry(0.11, 9, 7), highlightBronze, [-0.49, -0.48, 0.12]);
        addMesh(new THREE.SphereGeometry(0.11, 9, 7), highlightBronze, [0.49, -0.45, 0.15]);

        addMesh(new THREE.CylinderGeometry(0.045, 0.025, 0.49, 8), darkBronze, [0, 0.34, 0.27]);
        for (const y of [0.51, 0.31, 0.11]) {
          addMesh(new THREE.SphereGeometry(0.035, 8, 6), highlightBronze, [0, y, 0.274]);
        }

        const floor = new THREE.Mesh(
          new THREE.CircleGeometry(1.4, 40),
          new THREE.MeshBasicMaterial({ color: 0xd4ad7e, transparent: true, opacity: 0.12 }),
        );
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -2.12;
        scene.add(floor);

        const resize = () => {
          const bounds = statueTarget.getBoundingClientRect();
          if (!bounds.width || !bounds.height || !renderer) return;
          renderer.setSize(bounds.width, bounds.height, false);
          camera.aspect = bounds.width / bounds.height;
          camera.updateProjectionMatrix();
          renderer.render(scene, camera);
        };

        let isVisible = false;
        let isDragging = false;
        let pointerX = 0;
        let pointerY = 0;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const render = () => {
          frame = 0;
          if (!renderer || disposed) return;
          if (isVisible && !prefersReducedMotion && !isDragging && document.visibilityState === "visible") {
            statue.rotation.y += 0.0018;
          }
          renderer.render(scene, camera);
          if (isVisible && !prefersReducedMotion && !isDragging && document.visibilityState === "visible") {
            frame = window.requestAnimationFrame(render);
          }
        };

        const requestRender = () => {
          if (!frame) frame = window.requestAnimationFrame(render);
        };

        const canvas = renderer.domElement;
        canvas.addEventListener("pointerdown", (event) => {
          isDragging = true;
          pointerX = event.clientX;
          pointerY = event.clientY;
          canvas.setPointerCapture(event.pointerId);
          canvas.classList.add("is-dragging");
        });
        canvas.addEventListener("pointermove", (event) => {
          if (!isDragging) return;
          statue.rotation.y += (event.clientX - pointerX) * 0.012;
          statue.rotation.x = THREE.MathUtils.clamp(
            statue.rotation.x + (event.clientY - pointerY) * 0.006,
            -0.12,
            0.24,
          );
          pointerX = event.clientX;
          pointerY = event.clientY;
          requestRender();
        });
        const endDrag = () => {
          isDragging = false;
          canvas.classList.remove("is-dragging");
          requestRender();
        };
        canvas.addEventListener("pointerup", endDrag);
        canvas.addEventListener("pointercancel", endDrag);
        statueKeydown = (event) => {
          const keyStep = 0.12;
          if (event.key === "ArrowLeft") statue.rotation.y -= keyStep;
          else if (event.key === "ArrowRight") statue.rotation.y += keyStep;
          else if (event.key === "ArrowUp") statue.rotation.x = Math.max(-0.12, statue.rotation.x - keyStep);
          else if (event.key === "ArrowDown") statue.rotation.x = Math.min(0.24, statue.rotation.x + keyStep);
          else return;
          event.preventDefault();
          requestRender();
        };
        resize();
        resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(statueTarget);
        sceneObserver = new IntersectionObserver(([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible) requestRender();
          else if (frame) {
            window.cancelAnimationFrame(frame);
            frame = 0;
          }
        });
        sceneObserver.observe(statueTarget);
        const onVisibilityChange = () => {
          if (document.visibilityState === "visible") requestRender();
        };
        document.addEventListener("visibilitychange", onVisibilityChange);
        statueTarget.addEventListener("keydown", statueKeydown);
        const cleanupListeners = () => {
          document.removeEventListener("visibilitychange", onVisibilityChange);
          if (statueKeydown) statueTarget.removeEventListener("keydown", statueKeydown);
        };
        cleanupListenersRef = cleanupListeners;
      } catch (error) {
        if (!disposed) {
          console.error("Could not initialize the interactive Rizal statue.", error);
        }
        statueTarget.classList.remove("has-3d-statue");
        renderer?.dispose();
        renderer?.domElement.remove();
        disposeScene();
      }
    }

    void initialize();

    return () => {
      disposed = true;
      if (frame) window.cancelAnimationFrame(frame);
      sceneObserver?.disconnect();
      resizeObserver?.disconnect();
      cleanupListenersRef();
      disposeScene();
      renderer?.dispose();
      renderer?.domElement.remove();
      statueTarget.classList.remove("has-3d-statue");
    };
  }, []);

  return null;
}
