import {getAllByRole, render, screen} from '@testing-library/react';
import Home from '../page';

// rendering
test('renders home page', () => {
    render(<Home />);

    const headings = screen.getAllByRole('heading');

    expect(headings[0].textContent).toBe('Photo tagging app');
});