import { mode } from './../tools';

const baseStyle = (props: Record<string, any>) => {
  return {
    color: mode('muted.800', 'white')(props),
    fontFamily: 'body',
    fontWeight: 400,
  };
};
const defaultProps = {
  fontWeight: 300,
  letterSpacing: 1,
};

export default { baseStyle, defaultProps };
