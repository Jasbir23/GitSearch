import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const width = Dimensions.get('window');

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repoList: [],
      searchText: '',
      isWaiting: true
    };
  }
  componentDidMount() {
    let self = this;
    fetch('https://api.github.com/repositories')
      .then(e => e.json())
      .then(function(response) {
        self.setState({
          repoList: response,
          isWaiting: false
        });
      })
      .catch(error => {});
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 80,
            alignSelf: 'stretch',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'grey'
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Github Repos</Text>
        </View>
        <View>
          <TextInput
            onChangeText={txt => this.setState({ searchText: txt })}
            autoCapitalize={'none'}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            autoCorrect={false}
            placeholder={'search filter'}
            placeholderTextColor={'rgb(153,153,153)'}
            style={{
              width: width - 30,
              height: 42,
              borderWidth: 1,
              borderRadius: 3,
              padding: 5,
              paddingLeft: 15,
              fontSize: 12,
              borderColor: 'rgb(233,238,241)'
            }}
          />
        </View>
        {!this.state.isWaiting ? (
          <ScrollView>
            {this.state.repoList.map((item, index) => {
              if (this.state.searchText === '') {
                return (
                  <View
                    key={item.id}
                    style={{
                      height: 50,
                      alignItems: 'center',
                      borderWidth: 1,
                      justifyContent: 'center'
                    }}
                  >
                    <Text>{item.full_name}</Text>
                  </View>
                );
              }
              if (this.state.searchText !== '') {
                // return undefined;
                if (!item.full_name.startsWith(this.state.searchText)) {
                  return undefined;
                }
                if (item.full_name.startsWith(this.state.searchText)) {
                  return (
                    <View
                      key={item.id}
                      style={{
                        height: 50,
                        alignItems: 'center',
                        borderWidth: 1,
                        justifyContent: 'center'
                      }}
                    >
                      <Text>{item.full_name}</Text>
                    </View>
                  );
                }
              }
            })}
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator />
          </View>
        )}
      </View>
    );
  }
}
