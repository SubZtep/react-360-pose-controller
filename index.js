import React from "react"
import { AppRegistry, asset, StyleSheet, View, Image } from "react-360"

import { NativeModules } from "react-360"
const { ControllerInfo } = NativeModules

export default class Hello360 extends React.Component {
  componentDidMount() {
    ControllerInfo.getControllers().then(ctrls => {
      //console.log("--- CONTROLLERS", ctrls)
    })
  }

  render() {
    return (
      <View style={styles.mainView}>
        <Image style={styles.fullPic} source={asset("mop_4680x472.jpg")} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainView: {
    height: 472,
    width: 4680
  },
  fullPic: {
    width: "100%",
    height: "100%"
  }
})

AppRegistry.registerComponent("Hello360", () => Hello360)
