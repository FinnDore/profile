import { render } from '@testing-library/react';

import Index from '../pages/_app';

describe('Index', () => {
    it('should render successfully', () => {
        const { baseElement } = render(<Index />);
        expect(baseElement).toBeTruthy();
    });
});
