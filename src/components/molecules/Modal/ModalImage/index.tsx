import {Image, ImageSourcePropType, TouchableOpacity} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Close} from '../../../../assets/icons';

interface ModalImage {
  show: boolean;
  hide: () => void;
  image: ImageSourcePropType;
}

export default function ModalImage({show, hide, image}: ModalImage) {
  return (
    <Modal
      className="m-0 p-0"
      isVisible={show}
      onBackButtonPress={hide}
      onBackdropPress={hide}>
      <TouchableOpacity
        activeOpacity={0.7}
        className="absolute top-10 left-5 z-10"
        onPress={hide}>
        <Close color="#fff" size={30} />
      </TouchableOpacity>
      <Image
        source={image}
        resizeMode="cover"
        className="self-center w-[90%] h-[40%] rounded-lg"
      />
    </Modal>
  );
}
