import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    left: 0,
    pointerEvents: 'box-none',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 9999,
  },
  content: {
    flex: 1,
    pointerEvents: 'box-none',
  },
});

export default styles;
