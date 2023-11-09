import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameImage from '../gameImage';
import userEvent from '@testing-library/user-event';

const gameImage = {
    src: '/my-image.jpg'
};

const setCoordsMock = jest.fn();

describe('game image', () => {
    test('correct image source', () => {
        render(<GameImage gameImage={gameImage}/>);

        expect(screen.getByRole('img')).toHaveAttribute('src', '/_next/image?url=%2Fmy-image.jpg&w=1920&q=75');
    });

    test('calls setCoords function on click', async () => {
        const user = userEvent.setup();

        render(<GameImage gameImage={gameImage} setCoords={setCoordsMock}/>);

        await user.click(screen.getByTestId('picture'));

        expect(setCoordsMock).toHaveBeenCalled();
    });
});