import svgLibrary from '@svg-library'

export const Icon = ({ name, width = 'auto', height = 'auto' }) => {
    return (
        <svg style={{width, height}}>
            <use href={`${svgLibrary}#${name}`} />
        </svg>
    )
}