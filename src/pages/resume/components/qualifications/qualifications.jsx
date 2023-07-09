import { PropTypes } from 'prop-types';
import styles from './qualifications.module.scss';
import { SingleQualification } from './single-qualification/single-qualification';

export const Qualifications = ({ dataModel }) => {

  return (
    <section>
        <h2>Qualifications</h2>
        <dl className={styles.qualifications}>
        {dataModel.map((qualification, index) => (
            <SingleQualification
            expPoints={qualification.rating}
            name={qualification.name}
            description={['maquetado', 'accesibilidad', 'posicionamiento']}
            key={index}
            />
        ))}
        </dl>
    </section>
  )
}
