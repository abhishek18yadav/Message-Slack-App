
import crudRepository from './crudRepository';
import Channel from '../schema/channel.js'

const channelRepository = {
    ...crudRepository(Channel)
};
export default channelRepository;