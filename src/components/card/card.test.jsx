import { describe, test, expect } from '@jest/globals'

import { render, screen } from '@testing-library/react'
import { Card } from './card';

const cardFixture = (props = {}) => {
    const defaultProps = {
        children: 'Test Content',
        border: true,
        ...props,
    };
    const { getByTestId } = render(<Card {...defaultProps} >{ defaultProps.children }</Card>)
    const card = getByTestId('card');
    return {
        card,
        defaultProps,
        getByText: (text) => {
            return screen.getByText(text)
        }
    }
}

describe('Card', () => {
    test('renders the card with the correct content', () => {
        const content = 'Test Content';
        const { card } = cardFixture({ children: content });
        expect( card.textContent ).toBe(content);
    });

    test('renders the card with a border when the `border` prop is true', () => {
        const { card } = cardFixture();
        expect(card).toHaveAttribute('class', 'cardWithBorder')
    });

    test('renders the card without a border when the `border` prop is false', () => {
        const { card } = cardFixture({ border: false });
        expect(card).not.toHaveAttribute('class', 'cardWithBorder')
    });
});