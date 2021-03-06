import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import { compose, filter, pipe } from 'ramda';
import inject18n from './i18n';
import { stringToColour } from '../utils/Colors';

const SubscriptionAvatarsStyles = () => ({
  avatars: {
    float: 'right',
    display: 'flex',
  },
  avatarsGraph: {
    float: 'right',
    display: 'flex',
    marginTop: -40,
  },
  avatar: {
    width: 28,
    height: 28,
    marginLeft: 10,
    textTransform: 'uppercase',
  },
});

const SubscriptionAvatarsFocusStyles = () => ({
  container: {
    color: '#4CAF50',
  },
});

class SubscriptionAvatarsComponent extends Component {
  render() {
    const { classes, users, variant } = this.props;
    return (
      <div
        className={
          variant === 'inGraph' ? classes.avatarsGraph : classes.avatars
        }
      >
        {users.map((user, i) => (
          <Tooltip title={user.name} key={i}>
            <Avatar
              classes={{ root: classes.avatar }}
              style={{ backgroundColor: stringToColour(user.name) }}
            >
              {user.name.charAt(0)}
            </Avatar>
          </Tooltip>
        ))}
      </div>
    );
  }
}

SubscriptionAvatarsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.array,
  variant: PropTypes.string,
};

export const SubscriptionAvatars = withStyles(SubscriptionAvatarsStyles)(
  SubscriptionAvatarsComponent,
);

class SubscriptionFocusComponent extends Component {
  render() {
    const {
      t, me, users, fieldName,
    } = this.props;
    const focusedUsers = pipe(
      filter(n => n.name !== me.email),
      filter(n => n.focusOn === fieldName),
    )(users);
    if (focusedUsers.length === 0) {
      return <span />;
    }

    return (
      <span>
        {focusedUsers.map((user, i) => (
          <span key={i}>
            <span style={{ color: stringToColour(user.name) }}>
              {user.name}
            </span>
            <span>{i + 1 < focusedUsers.length ? ', ' : ' '}</span>
          </span>
        ))}
        {focusedUsers.length > 1 ? t('are updating...') : t('is updating...')}
      </span>
    );
  }
}

SubscriptionFocusComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  me: PropTypes.object,
  users: PropTypes.array,
  fieldName: PropTypes.string,
  t: PropTypes.func,
};

export const SubscriptionFocus = compose(
  inject18n,
  withStyles(SubscriptionAvatarsFocusStyles),
)(SubscriptionFocusComponent);
