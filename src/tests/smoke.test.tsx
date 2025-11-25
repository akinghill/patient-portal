import { render, screen } from '@testing-library/react';

describe('test scaffold', () => {
  it('runs a basic assertion', () => {
    expect(1 + 1).toBe(2);
  });

  it('renders simple react content', () => {
    render(<div>Hello World</div>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });
});
