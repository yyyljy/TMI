import { Global } from "@emotion/react";

const Fonts = () => (
  <Global
    styles={`
      @font-face{
        font-family:'bitbit';
        src:url('//cdn.df.nexon.com/img/common/font/DNFBitBit-Regular.woff'),url('//cdn.df.nexon.com/img/common/font/DNFBitBit-Regular.woff2') ;
      }
      `}
  />
);

export default Fonts;
