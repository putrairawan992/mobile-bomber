import {ScrollView, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import DefaultText from '../../../atoms/Text/DefaultText';
import {Button, Gap} from '../../../atoms';

interface ModalNotTableSucces {
  show: boolean;
  hide: () => void;
}

export default function ModalNotTableSuccesV2({
  show,
  hide,
}: ModalNotTableSucces) {
  return (
    <Modal
      className="m-0 p-0"
      isVisible={show}
      onBackButtonPress={hide}
      onBackdropPress={hide}>
      <View className="absolute bottom-0 right-0 left-0 bg-container rounded-t-xl bg-neutral-800 pt-4 max-h-[700]">
        <View className="w-[50] h-[4] rounded-full bg-neutral-600 self-center" />
        <Gap height={15} />
        <DefaultText
          title="Order Successfully Created"
          titleClassName="font-inter-bold text-base text-center"
        />
        <Gap height={15} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="px-4">
            <DefaultText
              title={
                'Split bill can be paid by scan this QR,\nask your guest in bill list to scan'
              }
              titleClassName="text-center"
            />
          </View>
        </ScrollView>
        <Gap height={30} />
        <Button
          noRound={true}
          type="primary"
          style={{borderWidth: 0}}
          title="Back to home"
          onPress={() => hide()}
        />
      </View>
    </Modal>
  );
}
