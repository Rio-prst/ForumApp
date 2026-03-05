import React from 'react';
import TalkItem from './TalkItem';
import { useSelector } from 'react-redux';

function TalksList({ talks }) {
  const { isFetching } = useSelector((state) => state.loading);

  if (isFetching) {
    return (
      <div className='talks-list'>
        {[1, 2, 3].map((i) => <div key={i} className='skeleton talk-item-skeleton' />)}
      </div>
    );
  }

  return (
    <div className='talks-list'>
      {talks.map((talk) => (
        <TalkItem key={talk.id} {...talk} />
      ))}
    </div>
  );
}

export default TalksList;