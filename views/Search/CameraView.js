import { Camera, CameraType } from 'expo-camera'
import { StyleSheet } from 'react-native'

export default function CameraView() {
    return <Camera style={styles.camera} typle={CameraType.back} />
}

const styles = StyleSheet.create({
    camera: {
        flex: 1
    }
})
