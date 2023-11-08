import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Nav from '../nav';

// test rendering 

test('renders all links', () => {
    render(<Nav />);

    expect(screen.getAllByRole('link')).toHaveLength(3);
});