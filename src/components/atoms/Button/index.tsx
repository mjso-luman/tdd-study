import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../../../fixtures/theme';

type ButtonProps = {
  title: string;
  type?: 'primary' | 'secondary' | 'disabled';
  width?: number;
  fontSize?: number;
  height?: number;
  onPress(): void;
};

const Button = (props: ButtonProps) => {
  const { title, onPress, type } = props;
  const styles = getStyles(theme, props);

  return (
    <TouchableOpacity onPress={type === 'disabled' ? () => {} : onPress}>
      <View style={styles.root}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;

const getBackgroundColor = (theme: any, type: string) => {
  switch (type) {
    case 'primary':
      return theme.primary;
    case 'secondary':
      return theme.secondary;
    case 'disabled':
      return '#ccc';
    default:
      return theme.primary;
  }
};
const getStyles = (theme: any, props: ButtonProps) =>
  StyleSheet.create({
    root: {
      width: props?.width || '100%',
      height: props?.height || 60,
      backgroundColor: getBackgroundColor(theme, props.type || 'primary'),
      borderRadius: 15,
    },
    title: {
      fontSize: props?.fontSize || 15,
      width: '100%',
      height: props?.height || 60,
      lineHeight: props?.height || 60,
      paddingLeft: 10,
      paddingRight: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      color: 'white',
    },
  });
