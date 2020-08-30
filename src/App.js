import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import { createStore, applyMiddleware } from 'redux';
import 'intl';
import 'intl/locale-data/jsonp/en';
import reducers from './redux/reducers';
import NavigationService from './NavigationService';
import StackNavigator from './navigators/StackNavigator';

export const store = createStore(reducers, {}, applyMiddleware(thunk));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                >
                    <StackNavigator />
                </NavigationContainer>
            </Provider>
        );
    }
}
export default App;
