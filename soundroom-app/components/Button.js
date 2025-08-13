import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components/native';

const StyledButton = styled(TouchableOpacity)`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 10px;
  border-radius: 10px; // Rounded UI
  align-items: center;
`;

const ButtonText = styled(Text)`color: ${(props) => props.theme.colors.background}; font-family: ${(props) => props.theme.fonts.header};`;

export default function Button({ title, onPress }) {
  return (
    <StyledButton onPress={onPress}>
      <ButtonText>{title}</ButtonText>
    </StyledButton>
  );
}