// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {
  ReactInstance,
  Surface,
  Module,
  ControllerInfoInst
} from "react-360-web"
import PoseCameraController from "./PoseCameraController"

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,

    ...options
  })

  const panoramaPicSurface = new Surface(
    5000,
    472,
    Surface.SurfaceShape.Cylinder
  )

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot("Hello360", {
      /* initial props */
    }),
    panoramaPicSurface
  )

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL("360_world.jpg"))

  r360.controls.clearCameraControllers()
  r360.controls.clearRaycasters()
  r360.controls.clearEventChannels()

  r360.controls.addCameraController(new PoseCameraController())
}

window.React360 = { init }
