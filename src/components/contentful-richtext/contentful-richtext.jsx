import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { PropTypes } from 'prop-types';

import styles from './contentful-richtext.module.scss';


export const ContentfulRichtext = ({richtext}) => {

    const Bold = ({ children }) => <strong>{children}</strong>;

    const Text = ({ children }) => <p className={styles.paragraph}>{children}</p>;

    const Ol = ({ children }) => <ol className={styles.orderedList}>{children}</ol>;

    const Li = ({ children }) => <li className={styles.list}>{children}</li>;

    const options = {
        renderMark: {
            [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
        },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
            [BLOCKS.OL_LIST]: (node, children) => <Ol>{children}</Ol>,
            [BLOCKS.LIST_ITEM]: (node, children) => <Li>{children}</Li>,
        },
        //renderText: (text) => text.replace('!', '?'),
    };

    return (
      <>
        {documentToReactComponents(richtext, options)}
      </>
    )
  }

  ContentfulRichtext.propTypes = {
    richtext: PropTypes.object.isRequired,
    children: PropTypes.object
  }
  