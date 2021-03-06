/**
 *
 * ProjectItem
 *
 */

import { FormattedMessage } from 'react-intl';
import { Map, List } from 'immutable';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getIsRemoved,
  getType,
  getIsRemovedFully,
} from '~/containers/App/getters/projectItem';

import messages from './messages';
import renderResolvers from './renderResolvers';

function ProjectItem({
  item,
  style,
  itemNextValues,
  itemActions,
  moneyTypes,
  itemGradeTypes,
  weaponTypes,
  expertTypes,
  effectTypes,
  localSettings,
  nextValues,
  boxItemOutActions,
  entriesFinderItemsActions,
  entriesFinderItems,
  skillForceActions,
}) {
  const Render =
    renderResolvers[
      getType(itemNextValues.get('nextValue'), {
        entry: item,
      })
    ];

  const isRemoved = getIsRemoved(itemNextValues.get('nextValue'), {
    entry: item,
  });

  const isRemovedFully = getIsRemovedFully(itemNextValues.get('nextValue'), {
    entry: item,
  });

  if (isRemovedFully) {
    return (
      <div style={style}>
        <Segment color="blue" inverted>
          This item has been deleted.
        </Segment>
      </div>
    );
  }

  return (
    <div style={style}>
      {isRemoved && (
        <Segment color="yellow" inverted>
          This item is marked as deleted, you can change it or use it as a basis
          for other items, but the item itself will not be exported.
        </Segment>
      )}

      {!Render && <FormattedMessage {...messages.RenderNotDefined} />}

      {Render && (
        <Render
          item={item}
          itemNextValues={itemNextValues}
          itemActions={itemActions}
          moneyTypes={moneyTypes}
          expertTypes={expertTypes}
          effectTypes={effectTypes}
          itemGradeTypes={itemGradeTypes}
          weaponTypes={weaponTypes}
          localSettings={localSettings}
          nextValues={nextValues}
          boxItemOutActions={boxItemOutActions}
          entriesFinderItemsActions={entriesFinderItemsActions}
          entriesFinderItems={entriesFinderItems}
          skillForceActions={skillForceActions}
        />
      )}
    </div>
  );
}

ProjectItem.propTypes = {
  item: PropTypes.instanceOf(Map).isRequired,
  itemNextValues: PropTypes.instanceOf(Map).isRequired,
  nextValues: PropTypes.instanceOf(Map).isRequired,
  localSettings: PropTypes.instanceOf(Map).isRequired,
  moneyTypes: PropTypes.instanceOf(List).isRequired,
  expertTypes: PropTypes.instanceOf(List).isRequired,
  effectTypes: PropTypes.instanceOf(List).isRequired,
  itemGradeTypes: PropTypes.instanceOf(List).isRequired,
  weaponTypes: PropTypes.instanceOf(List).isRequired,
  itemActions: PropTypes.object.isRequired,
  boxItemOutActions: PropTypes.object.isRequired,
  skillForceActions: PropTypes.object.isRequired,
  entriesFinderItemsActions: PropTypes.object.isRequired,
  entriesFinderItems: PropTypes.instanceOf(Map).isRequired,
  style: PropTypes.object,
};

ProjectItem.defaultProps = {
  style: undefined,
};

export default ProjectItem;
