# hybrid_cordova
## Cordova app with vue and bootstraps.
npm install.
cordova platform add browser.
cordova run browser.

## To develop with android or ios 
cordova platform add android.
cordova run android.
cordova run ios.

## Redeploy when code changed
npm run dev.
cordova run browser.

## Deploy app production mode
npm run prod.
cordova run browser.

# Cordova CLI

cordova run ios --buildFlag='-UseModernBuildSystem=0'.
cordova build ios --buildFlag='-UseModernBuildSystem=0'.

# Dev mode
npm run dev.
node web.js.

# Build cordova app
## Android 
cordova build android --release.
https://cordova.apache.org/docs/en/latest/guide/platforms/android/.

#Create jks from local machine
keytool -genkey -v -keystore hau-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias hau.android.key

#Sign key file with app 
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore hau-release-key.jks app-release-unsigned.apk hau.android.key

#ZIP before deploy
zipalign -v 4 app-release-unsigned.apk hau-release.apk

#Macos
~/Library/Android/sdk/build-tools/26.0.2/zipalign -v 4 hau-release.apk hau-release-1000.apk

# Import cer from play console to keystore machine
keytool -importcert -file upload_cert.der -keystore keystore.jks -alias "hau-upload-app" 


# Import cert file to jks file
keytool -import -v -trustcacerts -alias hau-release-key -file upload_cert.der  -keystore hau-release-key.jks  -keypass 123456 -storepass 123456
# Dang dung key hau-release-key.jks tai may mac
# Android app id new hau.edu.vn
# IOS app id hau.namvietjsc.edu.vn
