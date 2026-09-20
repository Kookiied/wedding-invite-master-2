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
      HEART: 0,
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

      this.lastThumbTip = thumbTip;
      this.lastIndexTip = indexTip;

      // HAND HEART GESTURE DETECTION (2-Hand Heart or 1-Hand Finger Heart)
      if (timeMs > this.cooldowns.HEART) {
        let heartDetected = false;

        // 1. TWO-HAND HEART GESTURE (Thumbs touching at bottom point, index tips touching at top arch)
        if (results.landmarks.length >= 2) {
          const hand1 = results.landmarks[0];
          const hand2 = results.landmarks[1];

          const index1 = hand1[8];
          const thumb1 = hand1[4];
          const index2 = hand2[8];
          const thumb2 = hand2[4];

          const indexDist = Math.hypot(index1.x - index2.x, index1.y - index2.y);
          const thumbDist = Math.hypot(thumb1.x - thumb2.x, thumb1.y - thumb2.y);

          const hand1Span = Math.hypot(index1.x - thumb1.x, index1.y - thumb1.y);
          const hand2Span = Math.hypot(index2.x - thumb2.x, index2.y - thumb2.y);

          const avgIndexY = (index1.y + index2.y) / 2;
          const avgThumbY = (thumb1.y + thumb2.y) / 2;

          // Index tips close (<0.16), thumb tips close (<0.16), hands forming open span (>0.03)
          if (indexDist < 0.16 && thumbDist < 0.16 && hand1Span > 0.03 && hand2Span > 0.03 && avgThumbY > avgIndexY - 0.10) {
            heartDetected = true;
          }
        }

        // 2. SINGLE-HAND FINGER HEART (Thumb & Index crossed/pinched, other 3 fingers curled)
        if (!heartDetected && results.landmarks.length >= 1) {
          for (const hand of results.landmarks) {
            const thumbTip = hand[4];
            const indexTip = hand[8];
            const middleTip = hand[12];
            const ringTip = hand[16];
            const pinkyTip = hand[20];
            const wrist = hand[0];

            const thumbIndexDist = Math.hypot(thumbTip.x - indexTip.x, thumbTip.y - indexTip.y);
            const middleWristDist = Math.hypot(middleTip.x - wrist.x, middleTip.y - wrist.y);
            const ringWristDist = Math.hypot(ringTip.x - wrist.x, ringTip.y - wrist.y);
            const pinkyWristDist = Math.hypot(pinkyTip.x - wrist.x, pinkyTip.y - wrist.y);
            const indexWristDist = Math.hypot(indexTip.x - wrist.x, indexTip.y - wrist.y);

            if (thumbIndexDist < 0.05 && middleWristDist < indexWristDist && ringWristDist < indexWristDist && pinkyWristDist < indexWristDist) {
              heartDetected = true;
              break;
            }
          }
        }

        if (heartDetected) {
          this.dispatchEvent('MAGIC_HEART');
          this.cooldowns.HEART = timeMs + COOLDOWN_MS;
        }
      }
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

      // 2. CANDLE BLOW DETECTION (Open-mouth airflow shape)
      const isBlowingAir = (funnelScore > 0.25) || (puckerScore > 0.3 && jawOpenScore > 0.08);
      
      if (isBlowingAir && timeMs > this.cooldowns.BLOW) {
        this.dispatchEvent('MAGIC_BLOW', { confidence: Math.max(funnelScore, puckerScore) });
        this.cooldowns.BLOW = timeMs + COOLDOWN_MS;
      }
    }
  }

  handleGestureResults(results, timeMs) {
    if (results.gestures && results.gestures.length > 0) {
      for (const gList of results.gestures) {
        if (gList && gList.length > 0) {
          const gesture = gList[0];
          if (gesture.categoryName === 'Open_Palm' && gesture.score > CONFIDENCE_THRESHOLD) {
            if (timeMs > this.cooldowns.OPEN_PALM) {
              this.dispatchEvent('MAGIC_OPEN_PALM', { confidence: gesture.score });
              this.cooldowns.OPEN_PALM = timeMs + COOLDOWN_MS;
            }
          }
          if ((gesture.categoryName === 'ILoveYou' || gesture.categoryName === 'Heart') && gesture.score > CONFIDENCE_THRESHOLD) {
            if (timeMs > this.cooldowns.HEART) {
              this.dispatchEvent('MAGIC_HEART', { confidence: gesture.score });
              this.cooldowns.HEART = timeMs + COOLDOWN_MS;
            }
          }
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
