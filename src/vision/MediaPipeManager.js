import { FilesetResolver, HandLandmarker, FaceLandmarker, GestureRecognizer } from '@mediapipe/tasks-vision';

class MediaPipeManager {
  constructor() {
    this.vision = null;
    this.handLandmarker = null;
    this.faceLandmarker = null;
    this.gestureRecognizer = null;
    this.isInitialized = false;
    this.isInitializing = false;
  }

  async initialize() {
    if (this.isInitialized) return true;
    if (this.isInitializing) {
      while (this.isInitializing) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      return this.isInitialized;
    }

    this.isInitializing = true;
    try {
      console.log('✨ [MagicEngine] Loading MediaPipe Vision Tasks...');
      
      this.vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      // Attempt initialization with GPU delegate, fallback to CPU on error
      const createModels = async (delegate) => {
        return await Promise.all([
          HandLandmarker.createFromOptions(this.vision, {
            baseOptions: {
              modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
              delegate
            },
            runningMode: "VIDEO",
            numHands: 2,
            minHandDetectionConfidence: 0.4,
            minHandPresenceConfidence: 0.4,
            minTrackingConfidence: 0.4
          }),
          FaceLandmarker.createFromOptions(this.vision, {
            baseOptions: {
              modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
              delegate
            },
            runningMode: "VIDEO",
            outputFaceBlendshapes: true,
            outputFacialTransformationMatrixes: true,
            numFaces: 1
          }),
          GestureRecognizer.createFromOptions(this.vision, {
            baseOptions: {
              modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
              delegate
            },
            runningMode: "VIDEO",
            numHands: 1
          })
        ]);
      };

      let models;
      try {
        models = await createModels("GPU");
      } catch (gpuError) {
        console.warn('✨ [MagicEngine] GPU delegate failed, falling back to CPU:', gpuError);
        models = await createModels("CPU");
      }

      this.handLandmarker = models[0];
      this.faceLandmarker = models[1];
      this.gestureRecognizer = models[2];
      
      this.isInitialized = true;
      console.log('✨ [MagicEngine] MediaPipe Initialization Complete.');
      return true;
    } catch (error) {
      console.error('✨ [MagicEngine] MediaPipe Initialization Failed:', error);
      return false;
    } finally {
      this.isInitializing = false;
    }
  }

  getHandLandmarker() { return this.handLandmarker; }
  getFaceLandmarker() { return this.faceLandmarker; }
  getGestureRecognizer() { return this.gestureRecognizer; }
}

export const mediaPipeManager = new MediaPipeManager();
