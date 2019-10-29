#!/bin/bash

# Clear watchman watches
watchman watch-del-all

# Delete the `node_modules` folder
rm -rf node_modules yarn.lock
#rm -rf node_modules && yarn install

# Reset Metro Bundler cache
yarn cache clean

#Remove the cache
rm -rf $TMPDIR/metro-*
rm -rf $TMPDIR/react-*

# Remove haste cache
#rm -rf /tmp/haste-map-react-native-packager-*
rm -rf $TMPDIR/haste-map-react-native-packager-*
