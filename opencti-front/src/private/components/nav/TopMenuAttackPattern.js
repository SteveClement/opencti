import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'ramda';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ArrowForwardIos } from '@material-ui/icons';
import { LockPattern } from 'mdi-material-ui';
import inject18n from '../../../components/i18n';

const styles = theme => ({
  buttonHome: {
    marginRight: theme.spacing.unit * 2,
    padding: '2px 5px 2px 5px',
    minHeight: 20,
    textTransform: 'none',
    color: '#666666',
    backgroundColor: '#ffffff',
  },
  button: {
    marginRight: theme.spacing.unit * 2,
    padding: '2px 5px 2px 5px',
    minHeight: 20,
    textTransform: 'none',
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
  arrow: {
    verticalAlign: 'middle',
    marginRight: 10,
  },
});

class TopMenuAttackPattern extends Component {
  render() {
    const {
      t, location, match: { params: { attackPatternId } }, classes,
    } = this.props;
    return (
      <div>
        <Button component={Link} to='/dashboard/catalogs/attack_patterns' variant='contained' size="small"
                color='inherit' classes={{ root: classes.buttonHome }}>
          <LockPattern className={classes.icon} fontSize='small'/>
          {t('Attack patterns')}
        </Button>
        <ArrowForwardIos color='inherit' classes={{ root: classes.arrow }}/>
        <Button component={Link} to={`/dashboard/catalogs/attack_patterns/${attackPatternId}`} variant={location.pathname === `/dashboard/catalogs/attack_patterns/${attackPatternId}` ? 'contained' : 'text'} size="small"
                color={location.pathname === `/dashboard/catalogs/attack_patterns/${attackPatternId}` ? 'primary' : 'inherit'} classes={{ root: classes.button }}>
          {t('Overview')}
        </Button>
        <Button component={Link} to={`/dashboard/catalogs/attack_patterns/${attackPatternId}/reports`} variant={location.pathname === `/dashboard/catalogs/attack_patterns/${attackPatternId}/reports` ? 'contained' : 'text'} size="small"
                color={location.pathname === `/dashboard/catalogs/attack_patterns/${attackPatternId}/reports` ? 'primary' : 'inherit'} classes={{ root: classes.button }}>
          {t('Reports')}
        </Button>
        <Button component={Link} to={`/dashboard/catalogs/attack_patterns/${attackPatternId}/knowledge`} variant={location.pathname.includes(`/dashboard/catalogs/attack_patterns/${attackPatternId}/knowledge`) ? 'contained' : 'text'} size="small"
                color={location.pathname.includes(`/dashboard/catalogs/attack_patterns/${attackPatternId}/knowledge`) ? 'primary' : 'inherit'} classes={{ root: classes.button }}>
          {t('Knowledge')}
        </Button>
      </div>
    );
  }
}

TopMenuAttackPattern.propTypes = {
  classes: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  t: PropTypes.func,
  history: PropTypes.object,
};

export default compose(
  inject18n,
  withRouter,
  withStyles(styles),
)(TopMenuAttackPattern);
