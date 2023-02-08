import { FC, memo, useEffect, useState } from 'react';
import { sendRequest } from '@requests/request';
import { IFeedbackMessage } from '@custom-types/data/IFeedbackMessage';
// import styles from './feedbackList.module.css'

const FeedbackList: FC<{}> = ({}) => {
  const [feedbacks, setFeedbacks] = useState<IFeedbackMessage[]>([]);

  useEffect(() => {
    let cleanUp = false;
    sendRequest<{}, IFeedbackMessage[]>('feedback', 'GET').then(
      (res) => {
        if (!res.error && !cleanUp) {
          setFeedbacks(res.response);
        }
      }
    );
    return () => {
      cleanUp = true;
    };
  }, []);

  return (
    <div>
      <div>{JSON.stringify(feedbacks[0])}</div>
      <div>{feedbacks.length}</div>
    </div>
  );
};

export default memo(FeedbackList);
