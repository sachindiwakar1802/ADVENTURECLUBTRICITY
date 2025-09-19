import { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

export const use3DScene = (options = {}) => {
  const {
    enableOrbitControls = true,
    autoRotate = false,
    cameraPosition = [0, 5, 15],
    backgroundColor = null
  } = options;

  const sceneRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scene, setScene] = useState(null);

  const initializeScene = () => {
    try {
      // Create scene
      const newScene = new THREE.Scene();
      if (backgroundColor) {
        newScene.background = new THREE.Color(backgroundColor);
      }

      // Create camera
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(...cameraPosition);

      // Create renderer
      const renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      sceneRef.current = newScene;
      rendererRef.current = renderer;
      cameraRef.current = camera;
      setScene(newScene);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const addToScene = (object) => {
    if (sceneRef.current && object) {
      sceneRef.current.add(object);
    }
  };

  const removeFromScene = (object) => {
    if (sceneRef.current && object) {
      sceneRef.current.remove(object);
    }
  };

  const animate = (animationFunction) => {
    const render = () => {
      if (animationFunction) {
        animationFunction();
      }
      
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      requestAnimationFrame(render);
    };
    render();
  };

  const handleResize = () => {
    if (cameraRef.current && rendererRef.current) {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
  };

  useEffect(() => {
    initializeScene();
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return {
    scene: sceneRef.current,
    renderer: rendererRef.current,
    camera: cameraRef.current,
    isLoading,
    error,
    addToScene,
    removeFromScene,
    animate,
    handleResize
  };
};
