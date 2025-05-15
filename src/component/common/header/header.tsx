import Content from '../content/content';
import Logo from '../logo/logo';
import Navigation from '../navigation/navigation';
import AuthButtons from '../auth-buttons/auth-buttons';

import classes from './header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <Content className={classes.header_content}>
        <Logo className={classes.logo} />
        <Navigation className={classes.navigation} />
        <AuthButtons className={classes.auth_buttons} />
      </Content>
    </header>
  );
};

export default Header;
