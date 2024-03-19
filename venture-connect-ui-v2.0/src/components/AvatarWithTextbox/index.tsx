import React from 'react';
import {
  ArticleIcon,
  Groups2Icon,
  EventIcon,
  SaveIcon
} from '../../utils/icons';
import PostAction from '../PostAction';
import styles from './new.module.scss';

export function AvatarWithTextbox(props) {
  const navbar = [
    { Icon: ArticleIcon, text: 'Article', color: 'green' },
    { Icon: Groups2Icon, text: 'Collaborate', color: 'red' },
    { Icon: EventIcon, text: 'Event', color: 'yellow' },
    { Icon: SaveIcon, text: 'Write a Pitch', color: 'blue' }
  ];
  const border = props.type === "commentDisplay" ? "noBorder" : "border";
  const level = props.level || 0;
  const marginLeft = `${(level) * 74}px`;
  console.log(props.type);
  return (
    <div className={`${styles.top} ${border}`} style={{ marginLeft }}>
      <div className={styles.searchDiv}>
        <img
          src= {props.image}
          alt=""
          className={styles.image}
        />
        {props.type == "commentForm" &&<textarea
          className={styles.postInput}
          value = {props.message}
          onChange={e => props.setMessage(e.target.value)}
          placeholder={props.text}
          onClick = {props.func}
          style={{ 
            height: `${props.height}px`,
            borderRadius: `${props.visible ? "30px" : "10px"}`,
          }} 
          />
        }
        {
          props.type == "commentDisplay" && <textarea
          className={styles.postDisplay}
          value = {props.message}
          style={{ 
            height: `${props.height}px`}}
          disabled
        />
        }
      </div>
      {props.visible && (
        <div className={styles.buttons}>
          {navbar.map((nav_icon, i) => (
            <PostAction
              key={i}
              Icon={nav_icon.Icon}
              title={nav_icon.text}
              color={nav_icon.color}
              onClick={() => {}}
            />
          ))}
        </div>
      )}
    <div className="vl"></div>
    </div>
    
  );
}

export default AvatarWithTextbox;
