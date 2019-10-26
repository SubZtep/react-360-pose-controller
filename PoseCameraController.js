// @flow
import {
  type Quaternion,
  type Vec3,
  type CameraController
} from "react-360-web"

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

export default class MousePanCameraController implements CameraController {
  rotationAngle = 0

  fillCameraProperties(position: Vec3, rotation: Quaternion): boolean {
    this.rotationAngle += 0.01
    const q = fromAxisAngle([0, 1, 0], this.rotationAngle)
    for (let i = 0; i < 4; i++) rotation[i] = q[i]
    return true
  }
}
