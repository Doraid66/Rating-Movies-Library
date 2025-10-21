import React from 'react';
import styled from 'styled-components';

const Pattern = ({children}) => {
  return (
    <StyledWrapper>
      <div className="container">{children}</div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .container {
    width: 100%;
    height: 100%;
    --s: 200px;
    --c1: #1d1d1d;
    --c2: #4e4f51;
    --c3: #3c3c3c;

    background:
      repeating-conic-gradient(
          from 30deg,
          #0000 90deg 120deg,
          var(--c3) 0deg 180deg
        )
        calc(0.5 * var(--s)) calc(0.5 * var(--s) * 0.577),
      repeating-conic-gradient(
        from 30deg,
        var(--c1) 0deg 60deg,
        var(--c2) 0deg 120deg,
        var(--c3) 0deg 180deg
      );
    background-size: var(--s) calc(var(--s) * 0.577);
  }`;

export default Pattern;
