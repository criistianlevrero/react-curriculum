import { describe, test, expect, jest } from '@jest/globals'

import { render, screen } from '@testing-library/react'
import { Canvas } from './canvas';

describe('Canvas', () => {
    test('renders canvas element', () => {
        const draw = jest.fn();
        const resize = jest.fn();
        render(<Canvas draw={draw} resize={resize} />);
        const canvasElement = screen.getByTestId('canvas');
        expect(canvasElement).toBeInTheDocument();
    });
});