import { describe, test, expect, jest } from '@jest/globals'

import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

const buttonFixture = (props = {}) => {
  const onClick = jest.fn()
  const { getByRole } = render(<Button {...props} onClick={onClick} >{ props.children }</Button>)
  const button = getByRole( props.href ? 'link' : 'button')
  return {
    button,
    click: () => {
      fireEvent.click(button)
    },
    onClick,
    getByText: (text) => {
      return screen.getByText(text)
    },
    queryByText: (text) => {
      return screen.queryByText(text)
    },
    getByTestId: (testId) => {
      return screen.getByTestId(testId)
    },
    queryByTestId: (testId) => {
      return screen.queryByTestId(testId)
    }
  }
}

describe('Button component', () => {

  describe('icon', () => {

    test('renders button with icon', () => {
      const { button, getByTestId } = buttonFixture({ iconName: 'search' })
      expect(button).toBeInTheDocument()
      const iconElement = getByTestId('icon')
      expect(iconElement).toBeInTheDocument()
    })

    test('renders button without icon', () => {
      const { button, queryByTestId } = buttonFixture()
      expect(button).toBeInTheDocument()
      const iconElement = queryByTestId('icon')
      expect(iconElement).toBeNull()
    })
  })

  describe('label', () => {

    test('renders button with label', () => {
      const { button, getByText } = buttonFixture({ children: 'Click me', showLabel: true })
      expect(button).toBeInTheDocument()
      const labelElement = getByText('Click me')
      expect(labelElement).toBeInTheDocument()
    })

    test('renders button without label', () => {
      const { button, queryByText } = buttonFixture({ children: 'Click me' })
      expect(button).toBeInTheDocument()
      const labelElement = queryByText('Click me')
      expect(labelElement).toBeNull()
    })
  })

  test('onClick event', () => {
    const { button, click, onClick } = buttonFixture()
    expect(button).toBeInTheDocument()
    click()
    expect(onClick).toHaveBeenCalled()
  })

  test('href', () => {
    const { button } = buttonFixture({ href: 'https://example.com' })
    expect(button).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com')
  })

  describe('target', () => {

    test('target default', () => {
      const { button } = buttonFixture({ href: 'https://example.com' })
      expect(button).toBeInTheDocument()
      expect(screen.getByRole('link')).toHaveAttribute('target', '_blank')
    })

    test('target custom _blank', () => {
      const { button } = buttonFixture({ href: 'https://example.com', target: '_self' })
      expect(button).toBeInTheDocument()
      expect(screen.getByRole('link')).toHaveAttribute('target', '_self')
    })
  })

})