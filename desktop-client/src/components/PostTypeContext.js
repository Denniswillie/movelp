import React from 'react';

const DIARY = 'diary';
const RECOMMENDATION = 'recommendation';
const GENERAL = 'general';
const ASK_SUGGESTION = 'asksuggestion';

export default React.createContext({
  DIARY: 'diary',
  RECOMMENDATION: 'recommendation',
  GENERAL: 'general',
  ASK_SUGGESTION: 'asksuggestion'
});
