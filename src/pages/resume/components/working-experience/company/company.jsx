import { PropTypes } from 'prop-types';
import styles from './company.module.scss';

export const Company = ({ companyName, from, to, children}) => {

  return (
    <section className={ styles.experience }>
      <h3 className={ styles.companyName }>{companyName} ({from} - {to})</h3>
      {children}
    </section>
  )
}

Company.propTypes = {
  companyName: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
}