/* @flow */

import Elapsed from 'elapsed';

/**
 * Returns the time in words from the given timestamp to now
 */
export default function(timestamp: number): string {
  return (new Elapsed(new Date(timestamp*1000), new Date())).optimal+" ago";
}
