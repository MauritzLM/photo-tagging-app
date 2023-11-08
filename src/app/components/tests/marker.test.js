import { queryByTestId, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import Marker from '../marker';


describe('test rendering', () => {
    test('component renders correctly', () => {
        render(<Marker character={'lion'} x={5} y={5} display={'block'}/>);
    
        const marker = screen.queryByTestId('marker');
    
        expect(marker).toBeVisible();
        expect(marker.textContent).toBe('lion');
    });

    test('does not render when display = none', () => {
        render(<Marker character={'lion'} x={5} y={5} display={'none'}/>);
    
        const marker = screen.queryByTestId('marker');
    
        expect(marker).not.toBeVisible();
    });
});


