// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Surface } from "react-360-web"
import PoseCameraController from "./PoseCameraController"

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options
  })

  const defaultSurface = r360.getDefaultSurface()
  defaultSurface.setShape(Surface.SurfaceShape.Cylinder)
  defaultSurface.resize(5000, 472)

  // Render your app content to the default cylinder surface
  r360.renderToSurface(
    r360.createRoot("Hello360", {
      /* initial props */
    }),
    r360.getDefaultSurface()
  )

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL("360_world.jpg"))

  // Remove default Controlls
  r360.controls.clearCameraControllers()
  r360.controls.clearRaycasters()
  r360.controls.clearEventChannels()

  // Use camera controller
  r360.controls.addCameraController(new PoseCameraController())
}

window.React360 = { init }
