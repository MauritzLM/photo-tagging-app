import {render, screen} from '@testing-library/react';
import Home from '../page';

// rendering
test('renders home page', () => {
    render(<Home />)

    expect(screen.getByRole('heading').textContent).toBe('Photo tagging app')
});