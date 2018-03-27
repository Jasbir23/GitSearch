import { StyleSheet, Dimensions } from 'react-native';
const width = Dimensions.get('window');

const gitStyles = StyleSheet.create({
  itemContainer : {
                  height: 50,
                  alignItems: 'center',
                  borderWidth: 1,
                  justifyContent: 'center',
                  flexDirection: 'row'
                },
                inputStyle : {
              width: width - 30,
              height: 42,
              borderWidth: 1,
              borderRadius: 3,
              padding: 5,
              paddingLeft: 15,
              fontSize: 12,
              borderColor: 'rgb(233,238,241)'
            },
            spinnerContainer : {
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingTop: 40
            },
            headerContainer: {
            height: 80,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'grey'
          }
});
export default gitStyles;