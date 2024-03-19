import React from 'react';

import './PostAction.module.scss'

interface PostActionProps {
  Icon: any;
  title: string;
  color: string;
  onClick: () => void;
}

function PostAction(props: PostActionProps): React.ReactElement {
  const { Icon, title, color, onClick } = props;
  const handleClick = () => {
    onClick();
  }
  return (
    <div className='actions' onClick={handleClick}>
      <Icon style={{ color: `${color}` }} />
      <h5>{title}</h5>
    </div>
  );
}

export default PostAction;
