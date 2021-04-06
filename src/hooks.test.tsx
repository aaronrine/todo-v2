import {useLocalStorage} from './hooks'
import {render, screen} from '@testing-library/react'

function TestComponent({test}:{test?: string}) {
    const [item, ] = useLocalStorage('test', test)
    return <div>{item}</div>
}

describe('useLocalStorage', () => {
    beforeEach(() =>{
        jest.clearAllMocks()
        jest.resetAllMocks()
    });
    it('Set and get items from local storage', () => {
        const {rerender} = render(<TestComponent test={'test'}/>)
        rerender(<TestComponent />)
        const testedValue = screen.getByText('test')
        expect(testedValue).toHaveTextContent('test')
    });
})