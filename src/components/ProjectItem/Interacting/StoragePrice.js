/**
 *
 * ProjectItemInteractingStoragePrice
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { parseInt, concat } from 'lodash';
import { Map, List } from 'immutable';
import styled from 'styled-components';
import { Input, Button, Popup } from 'semantic-ui-react';

import { FormattedMessage } from 'react-intl';
import messages from '../messages';

const PERCENTS = [1, 3, 5, 9, 15, 25, 50, 75];

/* eslint-disable react/prefer-stateless-function, no-bitwise */
class ProjectItemInteractingStoragePrice extends React.PureComponent {
  constructor(props) {
    super(props);

    this.getMoneyType = this.getMoneyType.bind(this);
    this.getMoneyValue = this.getMoneyValue.bind(this);
    this.getStoragePrice = this.getStoragePrice.bind(this);
    this.getCurrentPercent = this.getCurrentPercent.bind(this);
    this.renderPopup = this.renderPopup.bind(this);
    this.calcValueByPercent = this.calcValueByPercent.bind(this);

    this.changeValue = evt => {
      const { onChangeValue, item } = this.props;
      onChangeValue(item, parseInt(evt.target.value.replace(/[^0-9]/g, '')));
    };

    this.changeValueAtPercent = evt => {
      const { percent } = evt.target.dataset;
      const nextValue = this.calcValueByPercent(percent);
      return this.changeValue({ target: { value: `${nextValue}` } });
    };
  }

  calcValueByPercent(percent) {
    const type = this.getMoneyType();

    if (!type) {
      return 0;
    }

    // increase the value if the difference value is specified
    const increaseValue = type.get('valuation') || 1;
    const value = this.getMoneyValue(type) * increaseValue;

    return Math.ceil((value * percent) / 100);
  }

  getCurrentPercent() {
    const moneyType = this.getMoneyType();
    const moneyValue = this.getMoneyValue(moneyType);
    const storagePrice = this.getStoragePrice();

    if (moneyValue <= 0 || storagePrice <= 0) {
      return 0;
    }

    const increaseValue = moneyType.get('valuation') || 1;
    const storagePriceNext = storagePrice / increaseValue;

    return (storagePriceNext / moneyValue) * 100;
  }

  getStoragePrice() {
    const { item, itemNextValues } = this.props;

    const nextValue = itemNextValues.getIn([
      'nextValue',
      'server',
      'nStoragePrice',
    ]);

    const currValue = item.getIn(
      [['server', 'nStoragePrice'], ['client', 'nStoragePrice']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'nStoragePrice'],
      0,
    );

    return parseInt(nextValue !== undefined ? nextValue : currValue) || 0;
  }

  getMoneyValue(type) {
    if (!type) {
      return 0;
    }

    const { item, itemNextValues } = this.props;

    const nextValue = itemNextValues.getIn([
      'nextValue',
      'server',
      type.get('fieldName'),
    ]);

    const currValue = item.getIn(
      [
        ['server', type.get('fieldName')],
        ['client', type.get('fieldName')],
      ].find(fieldSets => item.getIn(fieldSets) !== undefined) || [
        'server',
        type.get('fieldName'),
      ],
      0,
    );

    const value =
      parseInt(nextValue !== undefined ? nextValue : currValue) || 0;

    return value;
  }

  getMoneyType() {
    const { item, itemNextValues, types } = this.props;

    // money type
    const nextValue = itemNextValues.getIn(['nextValue', 'server', 'nMoney']);

    const currValue = item.getIn(
      [['server', 'nMoney'], ['client', 'nMoney']].find(
        fieldSets => item.getIn(fieldSets) !== undefined,
      ) || ['server', 'nMoney'],
      0,
    );

    const value = nextValue !== undefined ? nextValue : currValue;
    return types.find(val => val.get('value') === value);
  }

  renderPercentNumber(percent) {
    const match = percent.toString().match(/^\d+\.(0+)\d+/);
    const countZeroDigits = !match ? 0 : match[1].length;
    const isInteger = (percent ^ 0) === percent;

    if (isInteger) {
      return percent;
    }

    return percent.toString().substring(0, countZeroDigits + 4);
  }

  renderPopup() {
    const type = this.getMoneyType();

    if (!type) {
      return (
        <FormattedMessage {...messages.NotAvailableStoragePriceByPercents} />
      );
    }

    const value = this.getMoneyValue(type);

    if (value <= 0) {
      return (
        <FormattedMessage {...messages.NotAvailableStoragePriceByPercents} />
      );
    }

    const currPercent = this.getCurrentPercent();
    const currPercentIsPreset = PERCENTS.includes(currPercent);
    const showCurrPercent = !currPercentIsPreset && currPercent > 0;

    const percents = (!showCurrPercent
      ? PERCENTS
      : concat([], PERCENTS, [currPercent]).sort((a, b) => a - b)
    ).filter(percent => this.calcValueByPercent(percent) > 1);

    if (
      percents.length <= 0 ||
      (percents.length === 1 && !PERCENTS.includes(percents[0]))
    ) {
      return (
        <FormattedMessage {...messages.NotAvailableStoragePriceByPercents} />
      );
    }

    return (
      <React.Fragment>
        <PercentPreMessage>
          <FormattedMessage {...messages.CalcStoragePriceMessage} />:
        </PercentPreMessage>

        {percents.map(percent => (
          <Button
            key={percent}
            onClick={this.changeValueAtPercent}
            data-percent={percent}
            title={percent}
            size="mini"
            color={percent === currPercent ? 'green' : undefined}
          >
            {this.renderPercentNumber(percent)}%
          </Button>
        ))}
      </React.Fragment>
    );
  }

  render() {
    const { size, className } = this.props;
    const value = this.getStoragePrice().toLocaleString();

    return (
      <Popup
        on="click"
        trigger={
          <Input
            fluid
            size={size}
            className={className}
            value={value}
            onChange={this.changeValue}
            label={`${this.renderPercentNumber(this.getCurrentPercent())}%`}
          />
        }
        flowing
        hoverable
      >
        {this.renderPopup()}
      </Popup>
    );
  }
}

ProjectItemInteractingStoragePrice.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  onChangeValue: PropTypes.func.isRequired,
  types: PropTypes.instanceOf(List).isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive']),
  className: PropTypes.string,
};

ProjectItemInteractingStoragePrice.defaultProps = {
  size: 'mini',
  className: '',
};

export default ProjectItemInteractingStoragePrice;

const PercentPreMessage = styled.pre`
  margin-bottom: 10px;
  margin-top: 0;
  font-weight: bold;
  padding: 0;
  background: transparent;
`;
