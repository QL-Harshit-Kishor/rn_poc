/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import { fireEvent, render } from '@app/helper/test-utils';



describe('MyComponent', () => {
    test('renders correctly', () => {
      const { getByText } = render(<App />);
      const textElement = getByText('App prod');
      expect(textElement).toBeDefined();
    });
  
    test('updates state on button click', () => {
      const { getByText } = render(<App />);
      const button = getByText('Submit');
      fireEvent.press(button);
      const updatedText = getByText('Clicked');
      expect(updatedText).toBeDefined();
    });
  });
