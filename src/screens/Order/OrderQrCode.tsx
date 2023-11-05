import * as React from 'react';
import {Text, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export default function OrderQrCode() {
  const [datas, setData] = React.useState('kosong');

  return (
    <QRCodeScanner
      onRead={({data}) => setData(data)}
      flashMode={RNCamera.Constants.FlashMode.torch}
      showMarker={true}
      topContent={
        <View>{datas && <Text>Succes Scan QR Code {datas}</Text>}</View>
      }
    />
  );
}
