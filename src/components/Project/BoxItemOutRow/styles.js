import { Segment } from 'semantic-ui-react';
import styled from 'styled-components';

export default styled(Segment)`
  &.ui.segment {
    padding: 10px;
    height: 100%;
    border-radius: 0;
    border-bottom-width: 0px;

    &:hover {
      background: #f1f1f1;
    }
  }
`;
