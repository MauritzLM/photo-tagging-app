import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DisplayLeaderboard from '../leaderboard';

const leaderboard = [
    {name: 'Admim', time: 5500},
    {name: 'Pro_player', time: 10300},
    {name: 'Newbie', time: 200304},
];

describe('leaderboard display', () => {

    test('rendering with empty leaderboard', async () => {
        render(<DisplayLeaderboard leaderboard={[]}/>);

        const array = await screen.findAllByTestId('row');

        expect(array).toHaveLength(1);
    });

    test('renders leaderboard', async () => {
       render(<DisplayLeaderboard leaderboard={leaderboard}/>);

       const array = await screen.findAllByTestId('row');

       expect(array).toHaveLength(4);
    });
});