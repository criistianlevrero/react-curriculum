import { PropTypes } from 'prop-types';
import svgLibrary from '@svg-library'

export const Icon = ({ name, width = 'auto', height = 'auto' }) => {
    return (
        <svg style={{width, height}}>
            <use href={`${svgLibrary}#${name}`} />
        </svg>
    )
}

Icon.propTypes = {
    name: PropTypes.string.isRequired,
    width: PropTypes.string,
    height: PropTypes.string,
  }