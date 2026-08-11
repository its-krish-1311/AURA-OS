import '@testing-library/jest-dom';

jest.mock('lucide-react', () => {
  const React = require('react');

  return new Proxy({}, {
    get: (_target, iconName) => {
      if (iconName === '__esModule') return true;
      return (props) => React.createElement('svg', { ...props, 'data-icon': String(iconName) });
    },
  });
});
