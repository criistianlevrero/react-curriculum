import styles from './card.module.scss';


export const Card = ({children}, borders = false) => {

  return (
    <div className={styles[borders ? 'cardWithBorder' : 'card']}>
      {children}
    </div>
  )
}
