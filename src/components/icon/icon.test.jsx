import { describe, test, expect } from '@jest/globals'

import { render, screen } from '@testing-library/react'
import { Icon } from './icon';

const iconFixture = (props = {}) => {
    const { getByTestId } = render(<Icon {...props} />)
    const icon = getByTestId('icon')
    return {
        icon,
        getByText: (text) => {
            return screen.getByText(text)
        },
        getComputedStyle: () => {
            return window.getComputedStyle(icon.firstChild);
        }
    }
}

describe('Icon', () => {

    test('renders an SVG element with the correct name', () => {
        const { icon } = iconFixture({ name: 'search' });
        expect(icon).toBeInTheDocument();
        const useElement = icon.querySelector('use');
        expect(useElement).toBeInTheDocument();
        expect(useElement.getAttribute('href')).toEqual('file content#search');
    });

    test('frenders an SVG element with the correct width and height', () => {
        const { icon } = iconFixture({ name: 'search', width: '20px', height: '20px' });
        expect(icon).toBeInTheDocument();
        const computedStyle = window.getComputedStyle(icon);
        expect(computedStyle.getPropertyValue('width')).toEqual('20px');
        expect(computedStyle.getPropertyValue('height')).toEqual('20px');
    });
});