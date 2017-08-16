import AppBar from 'material-ui/AppBar'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import spacing from 'material-ui/styles/spacing';
import {darkWhite, lightWhite, grey900, pinkA200} from 'material-ui/styles/colors';
import {MEDIUM, LARGE} from 'material-ui/utils/withWidth';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/LinearProgress';
import { withRouter } from 'react-router-dom';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {muiTheme: {}};
  }

  componentWillMount() {
    this.setState({
      muiTheme: getMuiTheme(),
    });
  }

  getStyles() {
    const styles = {
      v1: {
        height: 40,
        backgroundColor: '#2196f3',
        display: 'flex',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
      },
      v1Spacer: {
        height: 40,
      },
      appBar: {
        position: 'fixed',
        zIndex: this.state.muiTheme.zIndex.appBar + 1,
        top: 0
      },
      progress: {
      },
      root: {
        paddingTop: spacing.desktopKeylineIncrement,
        minHeight: 400
      },
      content: {
        margin: spacing.desktopGutter,
      },
      contentWhenMedium: {
        margin: `${spacing.desktopGutter * 2}px ${spacing.desktopGutter * 3}px`,
      },
      footer: {
        backgroundColor: grey900,
        textAlign: 'center',
      },
      a: {
        color: darkWhite,
      },
      p: {
        margin: '0 auto',
        padding: 0,
        color: lightWhite,
        maxWidth: 356,
      },
      browserstack: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: '25px 15px 0',
        padding: 0,
        color: lightWhite,
        lineHeight: '25px',
        fontSize: 12,
      },
      browserstackLogo: {
        margin: '0 3px',
      },
      iconButton: {
        color: darkWhite,
      },
    };

    if (this.props.width === MEDIUM || this.props.width === LARGE) {
      styles.content = Object.assign(styles.content, styles.contentWhenMedium);
    }

    return styles;
  }

  render() {
    const { prepareStyles } = this.state.muiTheme;
    const { children } = this.props;
    const styles = this.getStyles();
    return (
      <div>
        <AppBar
          title='Grid Editor'
          style={styles.appBar}
        />
        {
          this.props.loading &&
          <LinearProgress
            style={styles.progress}
            color={pinkA200}
          />
        }
        <div style={prepareStyles(styles.root)}>
          <div style={prepareStyles(styles.content)}>
            {React.Children.map(
              children,
              child => React.cloneElement(child, {
               loading: this.props.loading
              })
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.main.loading
  }
}

export default withRouter(connect(mapStateToProps)(Main));

