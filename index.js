import React from "react"
import { AppRegistry, StyleSheet, View, asset, Image } from "react-360"

export default class Hello360 extends React.Component {
  render() {
    return (
      <View style={styles.panel}>
        <Image style={styles.fullSize} source={asset("mop_4680x472.jpg")} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  panel: {
    width: 4680,
    height: 472
  },
  fullSize: {
    width: "100%",
    height: "100%"
  }
})

AppRegistry.registerComponent("Hello360", () => Hello360)
