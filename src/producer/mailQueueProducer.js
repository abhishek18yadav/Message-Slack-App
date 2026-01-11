
import '../processors/mailprocessor.js'

import mailQueue from '../queues/mailQueue.js'
export const addEmailtoMailQueue = async (emailData) => {
    try {
        await mailQueue.add(emailData);
    } catch (error) {
        console.log('Add email to mail queue error', error);
    }
}