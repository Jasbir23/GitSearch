import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Image
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {observer} from 'mobx-react';
import gitStyles from './git-search-styles';
import MainStore from './store/main-store';

@observer
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      searchText: '',
      filteredUsers: [],
      isWaiting: true
    };
  }
  componentDidMount() {
    MainStore.setAllUsers();
  }
  getNewResults(txt) {
    let self = this;
    this.setState({
      searchText: txt
    });
    if (txt !== '') {
      MainStore.setIsWaiting(true);
      MainStore.setSearchResults(txt);
      // Todo, use debounce to control API call throttle
    }
  }


  renderList() {
    if (this.state.searchText !== '' && MainStore.filteredUsers !== []) {
      return (
        <ScrollView>
          {MainStore.filteredUsers.items.map((item, index) => {
            return (
              <View
                key={item.id}
                style={gitStyles.itemContainer}
              >
                <Image
                  style={{ height: 50, width: 50, borderRadius: 25 }}
                  source={{ uri: item.avatar_url }}
                />
                <Text>{item.login}</Text>
              </View>
            );
          })}
        </ScrollView>
      );
    }
    return (
      <FlatList
        data={MainStore.allUsers}
        renderItem={(item, index) => this.renderItem(item, index)}
        keyExtractor={(item, index) => item.id}
      />
    );
  }

  renderItem(item, index) {
    return (
      <View
        key={item.id}
        style={gitStyles.itemContainer}
      >
        <Image
          style={{ height: 50, width: 50, borderRadius: 25 }}
          source={{ uri: item.item.avatar_url }}
        />
        <Text>{item.item.login}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={gitStyles.headerContainer}
        >
          <Text style={{ fontWeight: 'bold' }}>Github Repos</Text>
        </View>
        <View>
          <TextInput
            onChangeText={txt => this.getNewResults(txt)}
            autoCapitalize={'none'}
            underlineColorAndroid={'rgba(0,0,0,0)'}
            autoCorrect={false}
            placeholder={'search filter'}
            placeholderTextColor={'rgb(153,153,153)'}
            style={gitStyles.inputStyle}
          />
        </View>
        {!MainStore.isWaiting ? (
          this.renderList()
        ) : (
          <View
            style={gitStyles.spinnerContainer}
          >
            <ActivityIndicator />
          </View>
        )}
      </View>
    );
  }
}
