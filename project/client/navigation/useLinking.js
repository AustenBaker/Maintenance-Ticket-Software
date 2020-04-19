import { useLinking } from '@react-navigation/native';
import { Linking } from 'expo';

export default function(containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Root: {
        path: 'test',
        screens: {
          Tickets: 'tickets',
          CreateTicket: 'createticket',
          Profile:  'profile',
          Login:  'login',
          Settings: 'settings',
          Property: 'property',
        },
      },
    },
  });
}
