import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import styles from './contentful-richtext.module.scss';


export const ContentfulRichtext = ({richtext}) => {

    const Bold = ({ children }) => <strong>{children}</strong>;

    const Text = ({ children }) => <p className={styles.paragraph}>{children}</p>;

    const options = {
        renderMark: {
            [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
        },
        //renderText: (text) => text.replace('!', '?'),
    };

    return (
      <>
        {documentToReactComponents(richtext, options)}
      </>
    )
  }
  