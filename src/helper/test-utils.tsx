import {render as rtlRender} from '@testing-library/react-native';
import { PropsWithChildren } from 'react'

//  Put all wrapper here
const Wrapper = ({children}:PropsWithChildren) => {
  return (<>
  {children}
  </>
  )
}

const render = (ui:any, options={}) =>
rtlRender(ui, {wrapper: Wrapper, ...options})

// re-export everything
export * from '@testing-library/react-native'

// override render method
export {render}


// export const useNavigationMock = useNavigation as jest.MockedFunction<
//   typeof useNavigation
// >;