import { CommonActions } from '@react-navigation/native';

let navigator;
function setTopLevelNavigator(navigatorRef) {
    navigator = navigatorRef;
}

const navigate = name => {
    navigator.dispatch(
        CommonActions.navigate({
            name
        })
    );
};

const back = () => {
    navigator.dispatch(CommonActions.goBack());
};

export default {
    navigate,
    setTopLevelNavigator,
    back
};
