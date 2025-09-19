export const sceneConfigs = {
  intro: {
    cameraPosition: [0, 3, 10],
    lighting: {
      ambientLightIntensity: 0.5,
      directionalLightPosition: [5, 10, 7]
    },
    fog: {
      color: 0x000000,
      near: 5,
      far: 20
    },
    objects: {
      backgroundColor: '#000000',
      terrainType: 'simple',
      particleCount: 100
    }
  },
  mountainAscent: {
    cameraPosition: [0, 5, 15],
    lighting: {
      ambientLightIntensity: 0.4,
      directionalLightPosition: [10, 15, 10]
    },
    fog: {
      color: 0xaaaaaa,
      near: 10,
      far: 50
    },
    objects: {
      mountainCount: 5,
      treeCount: 30,
      snowParticleCount: 200
    }
  },
  forestJourney: {
    cameraPosition: [0, 4, 12],
    lighting: {
      ambientLightIntensity: 0.6,
      directionalLightPosition: [0, 10, 0]
    },
    fog: {
      color: 0x006400,
      near: 7,
      far: 30
    },
    objects: {
      treeCount: 50,
      firefliesCount: 100
    }
  },
  riverAdventure: {
    cameraPosition: [0, 6, 15],
    lighting: {
      ambientLightIntensity: 0.5,
      directionalLightPosition: [-10, 10, 5]
    },
    fog: {
      color: 0x5555aa,
      near: 15,
      far: 60
    },
    objects: {
      waterSurface: true,
      riverLength: 100,
      splashesCount: 100
    }
  },
  campfireGathering: {
    cameraPosition: [0, 3, 8],
    lighting: {
      ambientLightIntensity: 0.3,
      directionalLightPosition: [2, 4, 4]
    },
    fog: {
      color: 0x220000,
      near: 5,
      far: 25
    },
    objects: {
      campfireParticles: 100,
      logCount: 10,
      glowingEmbersCount: 50
    }
  }
};
