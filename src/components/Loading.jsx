import React from 'react';
import { Loader2 } from 'lucide-react';

function Loading() {
  return (
    <div className='spinner-wrapper'>
      <Loader2 className='spinner' size={18} />
      <span>Memproses...</span>
    </div>
  );
}

export default Loading;