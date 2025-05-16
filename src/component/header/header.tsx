import Content from '@common/content/content';
import Logo from '@common/logo/logo';
import Navigation from '@common/navigation/navigation';
import AuthButtons from '@component/auth-buttons/auth-buttons';

import { menuItems } from './header.constant';
import classes from './header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <Content className={classes.header_content}>
        <Logo className={classes.logo} />
        <Navigation menuItems={menuItems} className={classes.navigation} />
        <AuthButtons className={classes.auth_buttons} />
      </Content>
    </header>
  );
};

export default Header;
