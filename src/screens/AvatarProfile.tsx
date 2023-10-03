import React from 'react';
import {
  Image,
  ImageProps,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';

interface AvatarProps extends ImageProps {
  onChange?: (file: ImageOrVideo) => void;
  visible?: boolean;
  onPickImage?: any;
}

export const Avatar = (props: AvatarProps) => {
  const [uri, setUri] = React.useState(props.source?.uri || undefined);

  const chooseImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setUri(image.path);
        props.onChange?.(image);
      })
      .finally(props.onPickImage());
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setUri(image.path);
        props.onChange?.(image);
      })
      .finally(props.onPickImage());
  };

  const ImageIcon = () => {
    return (
      <Image
        style={styles.icon}
        source={require('../assets/images/image-gallery.png')}
      />
    );
  };

  const CameraIcon = () => {
    return (
      <Image
        style={styles.icon}
        source={require('../assets/images/photo-camera.png')}
      />
    );
  };

  return (
    <>
      <TouchableOpacity onPress={chooseImage}>
        <Image
          style={styles.avatar}
          {...props}
          source={uri ? {uri} : props.source}
        />
      </TouchableOpacity>
      <Modal
        isVisible={props.visible}
        onBackButtonPress={() => props.onPickImage()}
        onBackdropPress={() => props.onPickImage()}
        style={{justifyContent: 'flex-end', margin: 0}}>
        <SafeAreaView style={styles.options}>
          <TouchableOpacity style={styles.option} onPress={chooseImage}>
            <ImageIcon />
            <Text>Library </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={openCamera}>
            <CameraIcon />
            <Text>Camera </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    margin: 10,
  },
  avatar: {
    paddingTop: 20,
    height: 60,
    width: 60,
    borderRadius: 100,
    padding: 20,
  },
  options: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
