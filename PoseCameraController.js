// @flow
import type { Quaternion, Vec3, CameraController } from "react-360-web"
import * as posenet from "@tensorflow-models/posenet"

const DEFAULT_FOV = Math.PI / 6
const HALF_PI = Math.PI / 2

/**
 * Creates quaternion by a rotation given as axis and angle
 * Q = [cos(angle / 2), v * sin(angle / 2)]
 *
 * @param {Array} axis The axis around which to rotate
 * @param {number} angle The angle in radians
 * @returns {Quaternion}
 */
const fromAxisAngle = (axis: Vec3, angle: number) => {
  const halfAngle = angle * 0.5
  const [a, b, c] = axis
  const sin = Math.sin(halfAngle)
  const cos = Math.cos(halfAngle)
  const sin_norm = sin / Math.sqrt(a * a + b * b + c * c)
  return [cos, a * sin_norm, b * sin_norm, c * sin_norm]
}

function consoleLogBlob(blob) {
  const reader = new FileReader()
  reader.addEventListener("loadend", e => {
    const text = e.srcElement.result
    console.log("%c ", `font-size:480px; background:url(${text}) no-repeat;`)
  })
  reader.readAsDataURL(blob)
}

export default class PoseCameraController implements CameraController {
  _rotationAngle = 0
  _rotDir = 0.1
  _media = null
  _pm = null

  constructor() {
    const pose = this.loadPoseNet()
    const cam = this.loadWebcam()
    Promise.all([pose, cam]).then(values => {
      this._pm = values[0]
      this._media = values[1]
      this.grabNewFrame()
    })
  }

  loadWebcam() {
    return navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  }

  loadPoseNet() {
    return posenet.load({
      architecture: "MobileNetV1",
      outputStride: 16,
      inputResolution: 257,
      multiplier: 0.75
      // architecture: "ResNet50",
      // outputStride: 32,
      // inputResolution: 257,
      // quantBytes: 2,
      // multiplier: 1
    })
  }

  grabNewFrame() {
    const track = this._media.getVideoTracks()[0]
    const imageCapture = new ImageCapture(track)
    imageCapture.grabFrame().then(imageBitmap => {
      this.frameGrabbed(imageBitmap)
    })
  }

  frameGrabbed(imageBitmap) {
    const { width, height } = imageBitmap
    const offscreen = new OffscreenCanvas(imageBitmap.width, imageBitmap.height)
    const ctx = offscreen.getContext("2d")
    ctx.drawImage(imageBitmap, 0, 0, width, height)
    const imageData = ctx.getImageData(0, 0, width, height)

    this._pm.estimateSinglePose(imageData).then(pose => {
      //console.log("Pose detected", pose.keypoints[0].position)
      // offscreen.convertToBlob().then(blob => {
      //   consoleLogBlob(blob)
      // })

      const noseX = pose.keypoints[0].position.x
      const leftEyeX = pose.keypoints[1].position.x
      const rightEyeX = pose.keypoints[2].position.x
      if (Math.abs(leftEyeX - noseX) > Math.abs(rightEyeX - noseX)) {
        this._rotDir = 0.01
      } else {
        this._rotDir = -0.01
      }

      setTimeout(() => {
        this.grabNewFrame()
      }, 500)
    })
  }

  fillCameraProperties(position: Vec3, rotation: Quaternion): boolean {
    this._rotationAngle += this._rotDir
    const q = fromAxisAngle([0, 1, 0], this._rotationAngle)
    for (let i = 0; i < 4; i++) rotation[i] = q[i]
    return true
  }
}
