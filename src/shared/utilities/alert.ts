import { Alert } from 'react-native';

type ShowAlertParams = {
  title: string;
  body?: string;
  okButtonText?: string;
  onPressAction?: (value: string) => void;
};

const alert = (params: ShowAlertParams) => {
  const core = {
    title: '',
    body: '',
    okButtonText: 'OK',
    onPressAction: () => {},
  };
  const data = { ...core, ...params };
  const { title, body, okButtonText, onPressAction } = data;
  Alert.alert(
    title,
    body,
    [{ text: okButtonText, onPress: () => onPressAction('confirm') }],
    { userInterfaceStyle: 'dark' }
  );
};

export { alert };
