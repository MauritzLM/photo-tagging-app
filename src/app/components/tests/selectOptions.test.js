import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import SelectOptions from '../selectOptions';

// mock props
let x = 5;
let y = 5;
let z = 5;
let handleFormSubmitMock = jest.fn().mockImplementation((e) => e.preventDefault());
let handleSelectionMock = jest.fn();
let gameImageMock = {
    src: '',
    name: 'image1',
    characters: ['walrus', 'lion', 'bear']
};

describe('select options component', () => {
    test('rendering of component', async () => {
        render(<SelectOptions x={x} y={y} z={z} handleFormSubmit={handleFormSubmitMock} handleSelection={handleSelectionMock} gameImage={gameImageMock} />);

        // get all buttons
        const buttons = await screen.findAllByRole('button');

        expect(buttons).toHaveLength(3);
        expect(buttons[1].textContent).toBe('lion');

    });

    test('clicking on button calls functions correctly', async () => {
        const user = userEvent.setup();
        render(<SelectOptions x={x} y={y} z={z} handleFormSubmit={handleFormSubmitMock} handleSelection={handleSelectionMock} gameImage={gameImageMock} />);

        const buttons = await screen.findAllByRole('button');

        await user.click(buttons[1]);

        expect(handleFormSubmitMock).toHaveBeenCalledTimes(1);
        expect(handleSelectionMock).toHaveBeenCalledTimes(1);
    });
})

