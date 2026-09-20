import { mediaPipeManager } from '../vision/MediaPipeManager';

// Constants for gesture detection
const CONFIDENCE_THRESHOLD = 0.55;
const COOLDOWN_MS = 2000;
const SNAP_VELOCITY_THRESHOLD = 0.05;

class MagicInteractionEngine {
  constructor() {
    this.videoElement = null;
    this.canvasElement = null;
    this.canvasCtx = null;
    this.isRunning = false;
    this.lastVideoTime = -1;
    this.animationFrameId = null;

    // Cooldown trackers
    this.cooldowns = {
      SMILE: 0,
      KISS: 0,
      SNAP: 0,
      OPEN_PALM: 0,
      BLOW: 0,
    };

    this.lastThumbTip = null;
    this.lastIndexTip = null;
  }

  async start(videoElement, canvasElement) {
    if (this.isRunning) return;
    
    this.videoElement = videoElement;
    this.canvasElement = canvasElement;

    const initialized = await mediaPipeManager.initialize();
    if (!initialized) {
      console.error('✨ [MagicEngine] Failed to start: MediaPipe not initialized.');
      return false;
    }

    this.isRunning = true;
    console.log('✨ [MagicEngine] Started processing frames.');
    this.processFrame();
    return true;
  }

  stop() {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    console.log('✨ [MagicEngine] Stopped.');
  }

  processFrame = () => {
    if (!this.isRunning || !this.videoElement) return;

    if (this.videoElement.currentTime !== this.lastVideoTime) {
      this.lastVideoTime = this.videoElement.currentTime;
      const startTimeMs = performance.now();

      // Hand Landmarks
      const handLandmarker = mediaPipeManager.getHandLandmarker();
      if (handLandmarker) {
        const handResults = handLandmarker.detectForVideo(this.videoElement, startTimeMs);
        this.handleHandResults(handResults, startTimeMs);
      }

      // Face Landmarks & Expressions
      const faceLandmarker = mediaPipeManager.getFaceLandmarker();
      if (faceLandmarker) {
        const faceResults = faceLandmarker.detectForVideo(this.videoElement, startTimeMs);
        this.handleFaceResults(faceResults, startTimeMs);
      }

      // Gestures
      const gestureRecognizer = mediaPipeManager.getGestureRecognizer();
      if (gestureRecognizer) {
        const gestureResults = gestureRecognizer.recognizeForVideo(this.videoElement, startTimeMs);
        this.handleGestureResults(gestureResults, startTimeMs);
      }
    }

    this.animationFrameId = requestAnimationFrame(this.processFrame);
  };

  handleHandResults(results, timeMs) {
    if (results.landmarks && results.landmarks.length > 0) {
      const landmarks = results.landmarks[0];
      const indexTip = landmarks[8];
      const thumbTip = landmarks[4];

      this.dispatchEvent('MAGIC_HAND_MOVE', { 
        x: indexTip.x, 
        y: indexTip.y,
        z: indexTip.z,
        raw: landmarks
      });

      const distance = Math.sqrt(
        Math.pow(indexTip.x - thumbTip.x, 2) +
        Math.pow(indexTip.y - thumbTip.y, 2)
      );

      if (this.lastThumbTip && this.lastIndexTip && timeMs > this.cooldowns.SNAP) {
        const prevDistance = Math.sqrt(
          Math.pow(this.lastIndexTip.x - this.lastThumbTip.x, 2) +
          Math.pow(this.lastIndexTip.y - this.lastThumbTip.y, 2)
        );
        const velocity = (prevDistance - distance);
        
        if (velocity > SNAP_VELOCITY_THRESHOLD && distance < 0.1) {
          this.dispatchEvent('MAGIC_SNAP');
          this.cooldowns.SNAP = timeMs + COOLDOWN_MS;
        }
      }

      this.lastThumbTip = thumbTip;
      this.lastIndexTip = indexTip;
    } else {
      this.dispatchEvent('MAGIC_HAND_LOST');
    }
  }

  handleFaceResults(results, timeMs) {
    if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
      const blendshapes = results.faceBlendshapes[0].categories;
      
      let smileScore = 0;
      let puckerScore = 0;
      let funnelScore = 0;
      let jawOpenScore = 0;
      
      for (const shape of blendshapes) {
        if (shape.categoryName === 'mouthSmileLeft' || shape.categoryName === 'mouthSmileRight') {
          smileScore = Math.max(smileScore, shape.score);
        }
        if (shape.categoryName === 'mouthPucker') {
          puckerScore = shape.score;
        }
        if (shape.categoryName === 'mouthFunnel') {
          funnelScore = shape.score;
        }
        if (shape.categoryName === 'jawOpen') {
          jawOpenScore = shape.score;
        }
      }

      // 1. SMILE DETECTION (Triggers Hero Flowers)
      if (smileScore > CONFIDENCE_THRESHOLD && timeMs > this.cooldowns.SMILE) {
        this.dispatchEvent('MAGIC_SMILE', { confidence: smileScore });
        this.cooldowns.SMILE = timeMs + COOLDOWN_MS;
      }

      // 2. CANDLE BLOW DETECTION (Open-mouth airflow shape: funnel > 0.25 or pucker with open jaw)
      const isBlowingAir = (funnelScore > 0.25) || (puckerScore > 0.3 && jawOpenScore > 0.08);
      
      if (isBlowingAir) {
        // If they are blowing air, NEVER evaluate it as a kiss, even if blow is on cooldown.
        if (timeMs > this.cooldowns.BLOW) {
          this.dispatchEvent('MAGIC_BLOW', { confidence: Math.max(funnelScore, puckerScore) });
          this.cooldowns.BLOW = timeMs + COOLDOWN_MS;
        }
        return; // Stop processing further facial expressions for this frame
      }

      // 3. KISS DETECTION (Very tight lip compression: pucker > 0.85 & jaw closed & no funneling & no smiling)
      const isKissing = (puckerScore > 0.85 && jawOpenScore < 0.05 && funnelScore < 0.15 && smileScore < 0.15);
      if (isKissing) {
        if (timeMs > this.cooldowns.KISS) {
          this.dispatchEvent('MAGIC_BLOW_KISS', { confidence: puckerScore });
          this.cooldowns.KISS = timeMs + COOLDOWN_MS;
        }
      }
    }
  }

  handleGestureResults(results, timeMs) {
    if (results.gestures && results.gestures.length > 0) {
      const gesture = results.gestures[0][0];
      if (gesture.categoryName === 'Open_Palm' && gesture.score > CONFIDENCE_THRESHOLD) {
        if (timeMs > this.cooldowns.OPEN_PALM) {
          this.dispatchEvent('MAGIC_OPEN_PALM', { confidence: gesture.score });
          this.cooldowns.OPEN_PALM = timeMs + COOLDOWN_MS;
        }
      }
    }
  }

  dispatchEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, { detail });
    window.dispatchEvent(event);
  }
}

export const magicInteractionEngine = new MagicInteractionEngine();
