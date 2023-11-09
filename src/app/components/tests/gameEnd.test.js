import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GameEnd from '../gameEnd';

// setup 
const handleGameEndMock = jest.fn();
const gameInstanceMock = {
    id: '5',
    time: '111111'
};

describe('correct rendering', () => {
    test('time gets displayed correctly', async () => {
         render(<GameEnd handleGameEnd={handleGameEndMock} gameInstance={gameInstanceMock}/>);

         const spanArray = await screen.findAllByTestId('time');

         expect(spanArray).toHaveLength(3);
         expect(spanArray[0].textContent).toBe('01:');
         expect(spanArray[1].textContent).toBe('51:');
         expect(spanArray[2].textContent).toBe('64');
    }); 
});
