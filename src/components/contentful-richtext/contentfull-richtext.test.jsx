import { describe, test, expect } from '@jest/globals'

import { render, screen } from '@testing-library/react'
import Richtext from './contentful-richtext';

describe('Richtext', () => {
  test('renders the richtext with the correct content', () => {
    const content = {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Test Content',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    };
    const { getByTestId } = render(<Richtext content={content} />);
    const richtextElement = getByTestId('richtext');
    expect(richtextElement.innerHTML).toBe('<p>Test Content</p>');
  });
});