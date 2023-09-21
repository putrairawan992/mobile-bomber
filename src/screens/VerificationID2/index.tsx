import React, {useEffect, useRef, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {useCameraDevices, Camera} from 'react-native-vision-camera';
import {DefaultText, Gap, Layout} from '../../components/atoms';
import {Header} from '../../components/molecules';
import LinearGradient from 'react-native-linear-gradient';
import {IcPicture, IcUploadSecond} from '../../theme/Images';
import {navigationRef} from '../../navigation/RootNavigation';
import colors from '../../styles/colors';

const {width: W} = Dimensions.get('window');

const VerificationID2 = () => {
  const camera = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;
  const [frontImage, setFrontImage] = useState<any>();
  const [backImage, setBackImage] = useState<any>();
  const [typeCamera, setTypeCamera] = useState<any>('');
  const [showCamera, setShowCamera] = useState(false);

  const getPermisionCamera = async () => {
    const cameraPermisionStatus = await Camera.requestCameraPermission();
    console.log({cameraPermisionStatus});
  };

  useEffect(() => {
    getPermisionCamera();
  }, []);

  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera?.current?.takePhoto({});
      if (typeCamera === 'front') {
        setFrontImage(photo.path);
      }
      if (typeCamera === 'back') {
        setBackImage(photo.path);
      }
      setTypeCamera('');
      setShowCamera(false);
    }
  };

  if (device == null) {
    return (
      <View>
        <Text>laoding</Text>
      </View>
    );
  }

  return (
    <>
      {showCamera ? (
        <View style={styles.container}>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={showCamera}
            photo={true}
          />

          <View style={styles.backButton}>
            <TouchableOpacity
              style={styles.buttonBackChild}
              onPress={() => {
                setShowCamera(false);
                setTypeCamera('');
              }}>
              <Text style={{color: 'white', fontWeight: '500'}}>Back</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/images/frameCard.png')}
              style={{width: W - 60}}
              resizeMode="contain"
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.camButton}
              onPress={() => capturePhoto()}
            />
          </View>
        </View>
      ) : (
        <Layout>
          <Header
            hasBackBtn
            transparent
            title="Verification"
            titleStyle={styles.title}
          />
          <Gap height={15} />
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="px-5 py-2">
              <View className="bg-grey-one rounded-lg p-3">
                <DefaultText
                  title="Verification ID"
                  titleClassName="font-inter-bold text-xs text-yellow-600"
                />
                <Gap height={5} />
                <DefaultText
                  title="By verifying your ID, you not only protect your account but also gain access to a world of exclusive experiences and opportunities. Don't miss out on the advantages of being a verified member!"
                  titleClassName="text-xs"
                />
              </View>
              <Gap height={20} />
              <DefaultText
                title={'2/3'}
                titleClassName="font-inter-bold text-xs"
              />
              <Gap height={10} />
              <View className="flex-row items-center mb-2">
                <Image
                  source={IcPicture}
                  resizeMode="contain"
                  className="w-[16] h-[13]"
                />
                <DefaultText
                  title="Photo of the ID (Front)"
                  titleClassName="flex-1 ml-2"
                />
              </View>
              {frontImage ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setShowCamera(true);
                    setTypeCamera('front');
                  }}>
                  <Image
                    source={{
                      uri: `file://'${frontImage}`,
                    }}
                    resizeMode="cover"
                    className="w-full h-[180] rounded-lg"
                  />
                </TouchableOpacity>
              ) : (
                <View className="bg-grey-one rounded-lg p-5 border-[2px] border-neutral-400 border-dotted">
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setShowCamera(true);
                      setTypeCamera('front');
                    }}>
                    <Image
                      source={IcUploadSecond}
                      resizeMode="contain"
                      className="w-[48] h-[48] self-center"
                    />
                    <Gap height={10} />
                    <DefaultText
                      title="Upload your ID Card"
                      titleClassName="font-inter-bold text-lg text-center"
                    />
                    <Gap height={10} />
                    <DefaultText
                      title="Browse files"
                      titleClassName="border-b-[1px] border-b-white self-center"
                    />
                  </TouchableOpacity>
                </View>
              )}

              <Gap height={15} />
              <View className="flex-row items-center mb-2">
                <Image
                  source={IcPicture}
                  resizeMode="contain"
                  className="w-[16] h-[13]"
                />
                <DefaultText
                  title="Photo of the ID (Back)"
                  titleClassName="flex-1 ml-2"
                />
              </View>
              {backImage ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    setShowCamera(true);
                    setTypeCamera('back');
                  }}>
                  <Image
                    source={{
                      uri: `file://'${backImage}`,
                    }}
                    resizeMode="cover"
                    className="w-full h-[180] rounded-lg"
                  />
                </TouchableOpacity>
              ) : (
                <View className="bg-grey-one rounded-lg p-5 border-[2px] border-neutral-400 border-dotted">
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setShowCamera(true);
                      setTypeCamera('back');
                    }}>
                    <Image
                      source={IcUploadSecond}
                      resizeMode="contain"
                      className="w-[48] h-[48] self-center"
                    />
                    <Gap height={10} />
                    <DefaultText
                      title="Upload your ID Card"
                      titleClassName="font-inter-bold text-lg text-center"
                    />
                    <Gap height={10} />
                    <DefaultText
                      title="Browse files"
                      titleClassName="border-b-[1px] border-b-white self-center"
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ScrollView>
          <TouchableOpacity
            className="mt-3"
            activeOpacity={0.8}
            onPress={() => navigationRef.navigate('VerificationID3' as never)}>
            <LinearGradient
              className="py-4"
              colors={['#AA5AFA', '#C111D5']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <DefaultText
                title="Next"
                titleClassName="text-base font-inter-bold text-center"
              />
            </LinearGradient>
          </TouchableOpacity>
        </Layout>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.white,
  },
  buttonBackChild: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#fff',
    width: 100,
  },
  titleInfo: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.0)',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20,
  },
  camButton: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: '#B2BEB5',
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white',
  },
});

export default VerificationID2;
