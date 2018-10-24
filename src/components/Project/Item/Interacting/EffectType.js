/**
 *
 * ProjectItemInteractingEffectType
 *
 */

import { FormattedMessage } from 'react-intl';
import { Input, Dropdown } from 'semantic-ui-react';
import { Map, List } from 'immutable';
import { parseInt, isNumber } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getEffectTypeValue,
  getEffectType,
} from '~/containers/App/getters/projectItem';

import messages from '../messages';

/* eslint-disable react/prefer-stateless-function */
class ProjectItemInteractingEffectType extends React.PureComponent {
  constructor(props) {
    super(props);

    this.changeValue = (evt, owns) => {
      const { onChangeValue, item, n } = this.props;
      onChangeValue(item, { value: parseInt(owns.value) || 0, n });
    };
  }

  render() {
    const {
      item,
      itemNextValues,
      size,
      className,
      fluid,
      n,
      types,
    } = this.props;

    const value = getEffectTypeValue(
      itemNextValues.get('nextValue'),
      { entry: item },
      { n },
    );

    const type = getEffectType(
      itemNextValues.get('nextValue'),
      { entry: item, effectTypes: types },
      { n },
    );

    const isUnknown = !type;
    const isDisabled = value === 0;
    const isDisabledFree = !types.some(
      effectType => effectType.get('value') === 0,
    );
    const isViewUnknownItem = isUnknown && !isDisabled;

    const dropdownText = (() => {
      if (isDisabled && isDisabledFree) {
        return (
          <span>
            0:&nbsp;
            <FormattedMessage {...messages.Disabled} />
          </span>
        );
      }
      if (isUnknown) {
        return (
          <span>
            {isNumber(value) && `${value}: `}
            <FormattedMessage {...messages.UnknownEffectType} />
          </span>
        );
      }

      return `${type.get('value')}: ${type.get('title')}`;
    })();

    return (
      <Input
        size={size}
        fluid={fluid}
        type="number"
        value={value}
        onChange={this.changeValue}
        className={className}
        label={
          <Dropdown
            text={dropdownText}
            inline
            labeled
            scrolling
            item
            value={value}
          >
            <Dropdown.Menu>
              {isViewUnknownItem && (
                <Dropdown.Item
                  selected
                  text={
                    <span>
                      {isNumber(value) && `${value}: `}
                      <FormattedMessage {...messages.UnknownEffectType} />
                    </span>
                  }
                />
              )}

              {isDisabledFree && (
                <Dropdown.Item
                  onClick={this.changeValue}
                  selected={isDisabled}
                  value={0}
                  text={
                    <span>
                      0:&nbsp;
                      <FormattedMessage {...messages.Disabled} />
                    </span>
                  }
                />
              )}

              {types.map(val => (
                <Dropdown.Item
                  onClick={this.changeValue}
                  selected={val.get('value') === value}
                  key={val.get('value')}
                  value={val.get('value')}
                  text={
                    <span>
                      {val.get('value')}: {val.get('title')}
                    </span>
                  }
                />
              ))}
            </Dropdown.Menu>
          </Dropdown>
        }
      />
    );
  }
}

ProjectItemInteractingEffectType.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
  fluid: PropTypes.bool,
  n: PropTypes.oneOf([1, 2, 3, 4]).isRequired,
  types: PropTypes.instanceOf(List).isRequired,
};

ProjectItemInteractingEffectType.defaultProps = {
  size: 'mini',
  className: '',
  fluid: true,
};

export default ProjectItemInteractingEffectType;
