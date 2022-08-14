import { useMediaQuery } from 'react-responsive';
const IsDesktop = () => useMediaQuery({ query: '(min-width: 750px)' })
export default IsDesktop; // return true if screen width is greater than 750px;