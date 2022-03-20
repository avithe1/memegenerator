import { render, screen } from '@testing-library/react';
import {MenuOptions} from '../types/common.types'
import Header from './Header';

describe("Header", () => {
    test('renders the app name', () => {
        render(<Header appmode={MenuOptions.BROWSE} menuSelect={ () => {} }  />);
        const appnameElement = screen.getByText(/Meme Generator/i);
        expect(appnameElement).toBeInTheDocument();
    });

    test('renders browse and create buttons', () => {
        render(<Header appmode={MenuOptions.BROWSE} menuSelect={ () => {} }  />);
        const createBtn = screen.getByText(/create new/i);
        const browseBtn = screen.getByText(/browse/i);
        expect(createBtn).toBeInTheDocument();
        expect(browseBtn).toBeInTheDocument();
    });
});